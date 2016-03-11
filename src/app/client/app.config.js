
export default [
    '$rootScope',
    '$state',
    appConfig
];


function appConfig($rootScope, $state) {
    'ngInject';
    $rootScope.$state = $state;
}
 
