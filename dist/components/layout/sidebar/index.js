'use strict';

System.register(['angular', './sidebar.directive', './sidebar.css!'], function (_export, _context) {
  var angular, pageSidebarDirective;
  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_sidebarDirective) {
      pageSidebarDirective = _sidebarDirective.default;
    }, function (_sidebarCss) {}],
    execute: function () {
      _export('default', angular.module('layout').directive('pdcSidebar', pageSidebarDirective));
    }
  };
});