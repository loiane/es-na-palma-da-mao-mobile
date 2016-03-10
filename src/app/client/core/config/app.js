function appConfig($rootScope, $state) {
    'ngInject';
    $rootScope.$state = $state;
}

export default [
    '$rootScope',
    '$state',
    appConfig
];

