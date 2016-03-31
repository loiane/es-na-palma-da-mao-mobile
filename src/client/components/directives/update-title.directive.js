
/**
* Diretiva que atualiza o título da página de acordo com o state(rota) atual.
* @param {Object} $rootScope - $rootScope do angularjs
* @param {Object} $timeout - $timeout service do angular

* @returns {Object} Diretiva
*/
function UpdateTitle( $rootScope, $timeout ) {
    return {
        scope: {
            titlePrefix: '@'
        },
        link: function( scope, element ) {

            $rootScope.$on( '$stateChangeSuccess', onstateChangeSuccess );

            function onstateChangeSuccess( event, toState, toParams, fromState ) { //eslint-disable-line no-unused-vars
                let prefix = scope.titlePrefix || 'Portal do Cidadão | ES';
                let pageTitle = '';

                if ( toState.data && toState.data.title ) {
                    pageTitle = toState.data.title;
                }

                $timeout( function() {
                    element.text( `${prefix} - ${pageTitle}` );
                }, 0, false );
            }
        }
    };
}

export default[ '$rootScope', '$timeout', UpdateTitle ];
