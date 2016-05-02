/**
 * Configura aspectos da app como: temas, etc
 *
 * @param {Object} $ionicConfigProvider - service
 *
 * @returns {void}
 */
function appIonicConfig( $ionicConfigProvider ) {

    // Use for change ionic spinner to android pattern.
    $ionicConfigProvider.spinner.icon( 'android' );
    $ionicConfigProvider.views.swipeBackEnabled( false );
}

export default [
    '$ionicConfigProvider', appIonicConfig
];
