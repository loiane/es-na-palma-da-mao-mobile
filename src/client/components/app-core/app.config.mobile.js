function appConfig( $ionicConfigProvider, $mdThemingProvider, $mdIconProvider, $mdColorPalette ) {

    // Use for change ionic spinner to android pattern.
    $ionicConfigProvider.spinner.icon( 'android' );
    $ionicConfigProvider.views.swipeBackEnabled( false );

    //mdThemingProvider use for change theme color of Ionic Material Design Application.
    /* You can select color from Material Color List configuration :
     * red
     * pink
     * purple
     * purple
     * deep-purple
     * indigo
     * blue
     * light-blue
     * cyan
     * teal
     * green
     * light-green
     * lime
     * yellow
     * amber
     * orange
     * deep-orange
     * brown
     * grey
     * blue-grey
     */
    //Learn more about material color patten: https://www.materialpalette.com/
    //Learn more about material theme: https://material.angularjs.org/latest/#/Theming/01_introduction
    $mdThemingProvider
        .theme( 'default' )
        .primaryPalette( 'pink' )
        .accentPalette( 'red' );
}

export default [
    '$ionicConfigProvider', '$mdThemingProvider', '$mdIconProvider', '$mdColorPalette', appConfig
];
