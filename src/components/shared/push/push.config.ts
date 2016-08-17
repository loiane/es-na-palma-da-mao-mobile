function pushConfig( pushService ) {

    if ( window.PushNotification ) {
            let push = PushNotification.init(
                {
                    android: {
                        senderID: '1014254010175',
                        forceShow: true
                    },
                    ios: {
                        senderID: '1014254010175',
                        alert: 'true',
                        badge: 'true',
                        sound: 'true'
                    },
                    windows: {}
                });

            PushNotification.hasPermission( function ( data ) {
                if ( data.isEnabled ) {
                    console.log( 'isEnabled' );
                }
            });

            push.on( 'registration', function ( data ) {
                // data.registrationId
                console.log( data );
            });

            push.on( 'notification', function ( data ) {
                console.log( data );

                pushService.notify( data.additionalData );
            });

            push.on( 'error', function ( e ) {
                // e.message
                console.log( e );
                // alert( e );
            });
        }
};

pushConfig.$inject = [ 'pushService' ];

export default pushConfig;
