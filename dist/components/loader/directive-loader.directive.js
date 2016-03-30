'use strict';

System.register(['angular'], function (_export, _context) {
    var angular;

    function directiveLoader($rootScope, $compile, componentLoader) {
        var directive = {
            restrict: 'A',
            link: function link($scope) {
                var lazyDirectivesNames = ['pdc-header', 'pdc-footer', 'pdc-sidebar'];

                angular.forEach(lazyDirectivesNames, loadDirectiveIfExistsOnPage);

                function loadDirectiveIfExistsOnPage(name) {
                    var elems = angular.element(name);

                    if (elems.size() > 0) {

                        var componentName = name.replace('pdc-', '').replace('page-', '');

                        componentLoader.loadComponent(componentName).then(function () {
                            elems.each(recompile);
                        });
                    }
                }

                function recompile(i, el) {
                    var compiledHtml = $compile(el.outerHTML)($scope);
                    angular.element(el).replaceWith(compiledHtml);
                }
            }
        };

        return directive;
    }
    return {
        setters: [function (_angular) {
            angular = _angular.default;
        }],
        execute: function () {
            _export('default', ['$rootScope', '$compile', 'componentLoader', directiveLoader]);
        }
    };
});