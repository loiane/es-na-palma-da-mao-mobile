'use strict';

System.register(['angular', './header.directive', './header.css!'], function (_export, _context) {
  var angular, pageHeaderDirective;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_headerDirective) {
      pageHeaderDirective = _headerDirective.default;
    }, function (_headerCss) {}],
    execute: function () {
      _export('default', angular.module('layout').directive('pdcPageHeader', pageHeaderDirective));
    }
  };
});