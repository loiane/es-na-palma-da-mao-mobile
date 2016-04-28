import avatar from './img/img.jpg!image';

/**
 * Controller raiz da aplicação
 */
class MenuController {

    /**
     *
     * @param $scope
     * @param $timeout
     * @param $mdUtil
     * @param $mdSidenav
     * @param $log
     * @param $ionicHistory
     * @param $state
     * @param $ionicPlatform
     * @param $mdDialog
     * @param $mdBottomSheet
     * @param $mdMenu
     * @param $mdSelect
     */
    constructor( $scope, $timeout, $mdSidenav, $log, $ionicHistory, $state, $ionicPlatform, $mdDialog, $mdBottomSheet, $mdMenu, $mdSelect ) {

        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$mdSidenav = $mdSidenav;
        this.$log = $log;
        this.$ionicHistory = $ionicHistory;
        this.$state = $state;
        this.$ionicPlatform = $ionicPlatform;
        this.$mdDialog = $mdDialog;
        this.$mdBottomSheet = $mdBottomSheet;
        this.$mdMenu = $mdMenu;
        this.$mdSelect = $mdSelect;
        this.avatarUrl = avatar.src;
        this.usuario = 'Daniel Hoisel';
        this.perfil = 'Administrador';

        this.activate();
    }

    /**
     *
     */
    activate() {
        //  $ionicPlatform.registerBackButtonAction(callback, priority, [actionId])
        //
        //  Register a hardware back button action. Only one action will execute
        //  when the back button is clicked, so this method decides which of
        //  the registered back button actions has the highest priority.
        //
        //  For example, if an actionsheet is showing, the back button should
        //  close the actionsheet, but it should not also go back a page view
        //  or close a modal which may be open.
        //
        //  The priorities for the existing back button hooks are as follows:
        //  Return to previous view = 100
        //  Close side menu         = 150
        //  Dismiss modal           = 200
        //  Close action sheet      = 300
        //  Dismiss popup           = 400
        //  Dismiss loading overlay = 500
        //
        //  Your back button action will override each of the above actions
        //  whose priority is less than the priority you provide. For example,
        //  an action assigned a priority of 101 will override the ‘return to
        //  previous view’ action, but not any of the other actions.
        //
        //  Learn more at : http://ionicframework.com/docs/api/service/$ionicPlatform/#registerBackButtonAction

        this.$ionicPlatform.registerBackButtonAction( () => {

            if ( this.$mdSidenav( 'left' ).isOpen() ) {
                //If side navigation is open it will close and then return
                this.$mdSidenav( 'left' ).close();
            } else if ( angular.element( 'md-bottom-sheet' ).length > 0 ) {
                //If bottom sheet is open it will close and then return
                this.$mdBottomSheet.cancel();
            } else if ( angular.element( '[id^=dialog]' ).length > 0 ) {
                //If popup dialog is open it will close and then return
                this.$mdDialog.cancel();
            } else if ( angular.element( 'md-menu-content' ).length > 0 ) {
                //If md-menu is open it will close and then return
                this.$mdMenu.hide();
            } else if ( angular.element( 'md-select-menu' ).length > 0 ) {
                //If md-select is open it will close and then return
                this.$mdSelect.hide();
            }

            else {

                // If control :
                // side navigation,
                // bottom sheet,
                // popup dialog,
                // md-menu,
                // md-select
                // is not opening, It will show $mdDialog to ask for
                // Confirmation to close the application or go to the view of lasted state.

                // Check for the current state that not have previous state.
                // It will show $mdDialog to ask for Confirmation to close the application.

                if ( this.$ionicHistory.backView() == null ) {

                    //Check is popup dialog is not open.
                    if ( angular.element( '[id^=dialog]' ).length == 0 ) {

                        // mdDialog for show $mdDialog to ask for
                        // Confirmation to close the application.

                        this.$mdDialog.show( {
                            controller: 'DialogController',
                            templateUrl: 'confirm-dialog.html',
                            targetEvent: null,
                            locals: {
                                displayOption: {
                                    title: 'Confirmação',
                                    content: 'Deseja sair da aplicação?',
                                    ok: 'Confirmar',
                                    cancel: 'Cancelar'
                                }
                            }
                        } ).then( () => {
                            //If user tap Confirm at the popup dialog.
                            //Application will close.
                            ionic.Platform.exitApp();
                        }, () => {
                            // For cancel button actions.
                        } ); //End mdDialog
                    }
                } else {
                    //Go to the view of lasted state.
                    this.$ionicHistory.goBack();
                }
            }
        }, 100 );
    }

    /**
     *  CloseSideNav is for close side navigation
     *  It will use with event on-swipe-left="closeSideNav()" on-drag-left="closeSideNav()"
     *  When user swipe or drag md-sidenav to left side
     */
    closeSideNav() {
        this.$mdSidenav( 'left' ).close();
    }

    /**
     *
     */
    toggleLeft() {
        this.$mdSidenav( 'left' ).toggle();
    }

    /**
     *
     * @param stateName
     */
    navigateTo( stateName ) {
        this.$timeout( () => {
            this.$mdSidenav( 'left' ).close();
            if ( this.$ionicHistory.currentStateName() != stateName ) {
                this.$ionicHistory.nextViewOptions( {
                    disableAnimate: true,
                    disableBack: true
                } );
                this.$state.go( stateName );
            }
        }, ( this.$scope.isAndroid == false ? 300 : 0 ) );
    }
}

export default [
    '$scope',
    '$timeout',
    '$mdSidenav',
    '$log',
    '$ionicHistory',
    '$state',
    '$ionicPlatform',
    '$mdDialog',
    '$mdBottomSheet',
    '$mdMenu',
    '$mdSelect',
    MenuController
];
