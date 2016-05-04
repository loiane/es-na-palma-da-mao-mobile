/**
 *
 * @param {Object} $rootScope - $rootScope service
 * @param {Object} $state - $state service
 * @param {Object} routerHelper - routerHelper service
 *
 * @returns {void}
 */
function appRun( $rootScope, $state, routerHelper ) {
    $rootScope.$state = $state;

    routerHelper.configureRoutingEvents();
}

export default[
    '$rootScope', '$state', 'routerHelper', appRun
];

