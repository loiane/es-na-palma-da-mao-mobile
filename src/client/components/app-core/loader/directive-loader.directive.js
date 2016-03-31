import angular from 'angular';

export default[ '$rootScope', '$compile', 'componentLoader', directiveLoader ];

/**
    * Gerencia o carregamento dinâmico de diretivas. Diretivas "lazy" só serão carregadas
    * na página quando existirem no html. "directiveLoader" verifica a existência diretivas
    * configuradas com comportamento de lazy load e insere as mesmas nas páginas quando necessário.
    *
    * @param {obj} $rootScope
    * @param {obj} $compile Serviço do angular para compilar html
    * @returns {obj} componentLoader O serviço que carrega componentes e insere e injeta no angular
    */
function directiveLoader( $rootScope, $compile, componentLoader ) {
    let directive = {
        restrict: 'A',
        link: function( $scope ) {

            //todo: ler do JSON
            var lazyDirectivesNames = [ 'pdc-header',
                                        'pdc-footer',
                                        'pdc-sidebar' ];

            // para cadas diretiva "lazy", carrega a diretiva caso ela esteja sendo usad na página
            angular.forEach( lazyDirectivesNames, loadDirectiveIfExistsOnPage );


            /**
            * Carrega diretiva caso exista marcação na página
            */
            function loadDirectiveIfExistsOnPage( name ) {
                var elems = angular.element( name );

                if ( elems.size() > 0 ) {

                    let componentName = name.replace( 'pdc-', '' ).replace( 'page-', '' );

                    componentLoader.loadComponent( `app-layout/${componentName}` ).then( () => {
                        elems.each( recompile );
                    } );
                }
            }

            /**
             * Recompila a diretiva
             */
            function recompile( i, el ) {
                var compiledHtml = $compile( el.outerHTML )( $scope );
                angular.element( el ).replaceWith( compiledHtml );
            }
        }
    };

    return directive;
}
