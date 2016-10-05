declare var toolbox: any;

function fastestNotify( request: Request, values, options ) {
    console.log( `Strategy: fastest notify [${request.url}]`, options );

    return new Promise(( resolve, reject ) => {
        let rejected = false;
        let reasons: any[] = [];

        let maybeReject = ( reason ) => {
            reasons.push( reason.toString() );
            if ( rejected ) {
                reject( new Error( 'Both cache and network failed: "' + reasons.join( '", "' ) + '"' ) );
            } else {
                rejected = true;
            }
        };

        let maybeResolve = ( result ) => {
            if ( result instanceof Response ) {
                resolve( result );
            } else {
                maybeReject( 'No result returned' );
            }
        };

        toolbox.networkFirst( request.clone(), values, options )
            .then( response => {
                notifyCacheUpdate( request, response );
                maybeResolve( response );
            }, maybeReject );

        toolbox.cacheOnly( request, values, options )
            .then( maybeResolve, maybeReject );
    });
}


function notifyCacheUpdate( request: Request, response: Response ) {
    let updateCache = request.headers.get( 'notify-cache-update' );

    if ( updateCache ) {
        response.clone().json().then( json => {
            self.clients.matchAll( {})
                .then(( clientList: any ) => {
                    let client = clientList[ 0 ];
                    if ( request.url === 'https://api.es.gov.br/detran/driver' ) {
                        client.postMessage( {
                            cacheName: updateCache,
                            client: client.id,
                            origin: client.url,
                            message: { 'status': 0, 'blockMotive': undefined, 'expirationDate': '2015-10-10T00:00:00.000Z', 'hasTickets': false, 'acquiringLicense': false, 'hasAdministrativeIssues': false }
                        });
                    }

                    if ( request.url === 'https://api.es.gov.br/detran/driver/tickets' ) {
                        client.postMessage( {
                            cacheName: updateCache,
                            client: client.id,
                            origin: client.url,
                            message: [ { 'description': 'NAO FAZER SINAL BRACO/LUMINOSO ANTES DE MUDAR DE DIRECAO', 'classification': 'GRAVE', 'points': 15, 'place': 'AV. DANTE MICHELINI                               ', 'district': 'VITORIA', 'date': '2015-06-15T14:28:00.000Z', 'plate': 'OVL5905', 'warning': false }]
                        });
                    }
                    return clientList;
                });
        });
    }
}

toolbox.fastestNotify = fastestNotify; 