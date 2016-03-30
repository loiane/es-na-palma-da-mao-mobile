'use strict';

System.register(['angular', './footer.directive', './footer.css!'], function (_export, _context) {
  var angular, pageFooterDirective;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_footerDirective) {
      pageFooterDirective = _footerDirective.default;
    }, function (_footerCss) {}],
    execute: function () {
      _export('default', angular.module('layout').directive('pdcFooter', pageFooterDirective));
    }
  };
});