
function appRun( $rootScope, $state, routerHelper ) {
    $rootScope.$state = $state;

    routerHelper.configureRoutingEvents();
}


export default[
    '$rootScope',
    '$state',
    'routerHelper',
    appRun
];

