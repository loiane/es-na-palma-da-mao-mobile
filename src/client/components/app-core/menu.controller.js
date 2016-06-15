import avatar from './img/img.jpg!image';

/**
 * Controller raiz da aplicação
 */
class MenuController {

    /**
     * Menu controller
     *
     * @constructor
     *
     * @param {Object} $scope - xxx
     * @param {Function} $timeout - xxx
     * @param {Object} $mdSidenav - xxx
     * @param {Object} $log - xxx
     * @param {Object} $ionicHistory - xxx
     * @param {Object} $state - xxx
     * @param {Object} $ionicPlatform - xxx
     * @param {Object} $mdDialog - xxx
     * @param {Object} $mdBottomSheet - xxx
     * @param {Object} $mdMenu - xxx
     * @param {Object} $mdSelect - xxx
     *
     * @returns {void}
     */
    constructor( $rootScope, $scope, $window, $timeout, $mdSidenav, $log, $ionicHistory, $state, $ionicNativeTransitions, $ionicPlatform,
                 $mdDialog, $mdBottomSheet, $mdMenu, $mdSelect, OAuth2, OAuthFacebook, OAuthGoogle, OAuthDigits ) {

        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$window = $window;
        this.$timeout = $timeout;
        this.$mdSidenav = $mdSidenav;
        this.$log = $log;
        this.$ionicHistory = $ionicHistory;
        this.$state = $state;
        this.$ionicNativeTransitions = $ionicNativeTransitions;
        this.$ionicPlatform = $ionicPlatform;
        this.$mdDialog = $mdDialog;
        this.$mdBottomSheet = $mdBottomSheet;
        this.$mdMenu = $mdMenu;
        this.$mdSelect = $mdSelect;
        this.avatarUrl = avatar.src;
        this.OAuth2 = OAuth2;
        this.OAuthFacebook = OAuthFacebook;
        this.OAuthGoogle = OAuthGoogle;
        this.OAuthDigits = OAuthDigits;

        this.activate();
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
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

            const sidenavIsOpen = this.$mdSidenav( 'left' ).isOpen();
            const bottomSheetIsOpen = angular.element( 'md-bottom-sheet' ).length > 0;
            const dialogIsOpen = angular.element( '[id^=dialog]' ).length > 0;
            const menuContentIsOpen = angular.element( 'md-menu-content' ).length > 0;
            const selectMenuIsOpen = angular.element( 'md-select-menu' ).length > 0;
            const previousStateIsEmpty = this.$ionicHistory.backView() === null;

            if ( sidenavIsOpen ) {
                this.$mdSidenav( 'left' ).close();
            } else if ( bottomSheetIsOpen ) {
                this.$mdBottomSheet.cancel();
            } else if ( dialogIsOpen ) {
                this.$mdDialog.cancel();
            } else if ( menuContentIsOpen ) {
                this.$mdMenu.hide();
            } else if ( selectMenuIsOpen ) {
                this.$mdSelect.hide();
            } else if ( previousStateIsEmpty && !dialogIsOpen ) {

                //todo: refatorar $mdDialog para usar o service $dialog
                // se não há nenhum dos "componentes" acima abertos e não existe state anterior,
                // então exibe uma janela de diálogo pedindo a confirmação para fechar a app.
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
                    //Se o usuário confirma a janela de diálogo, então fecha a app.
                    ionic.Platform.exitApp();
                }, () => {
                    // Se o usuário clica no botão cancelar
                } );
            } else {
                // se existe uma view anterior, volta para ela
                this.$ionicHistory.goBack();
            }

        }, 100 );

        //Executa a primeira vez
        this.updateUser();

        //Watch User Info - para futuras alterações
        this.$scope.$watch( () => { return this.OAuth2.userInfo; },
            ( oldValue, newValue ) => {
                if ( newValue !== oldValue ) {
                    this.updateUser();
                }
            } );
    }

    updateUser() {
        this.user = this.OAuth2.userInfo;
        this.authenticated = this.user ? true : false;
    }

    /**
     *  Fecha a barra de navegação lateral
     *  It will use with event on-swipe-left="closeSideNav()" on-drag-left="closeSideNav()"
     *  When user swipe or drag md-sidenav to left side
     *
     *  @returns {void}
     */
    closeSideNav() {
        this.$mdSidenav( 'left' ).close();
    }

    /**
     * Alterna exibição do sidebar
     *
     * @returns {void}
     */
    toggleLeft() {
        this.$mdSidenav( 'left' ).toggle();
    }

    /**
     * Navega para o state especificado
     *
     * @param {string} stateName - o nome do state destino
     *
     * @returns {void}
     */
    navigateTo( stateName ) {
        this.$timeout( () => {
            this.$mdSidenav( 'left' ).close();
            if ( this.$ionicHistory.currentStateName() !== stateName ) {
                this.$ionicHistory.nextViewOptions( {
                    disableAnimate: true,
                    disableBack: true
                } );
                if ( this.$ionicNativeTransitions ) {
                    this.$ionicNativeTransitions.stateGo( stateName, {}, {
                        'type': 'fade'
                    } );
                } else {
                    this.$state.go( stateName );
                }
            }
        }, ( this.$scope.isAndroid === false ? 300 : 0 ) );
    }

    signOut() {
        this.OAuthFacebook.logout( () => { }, () => { } );
        this.OAuthGoogle.logout( () => { } );
        this.OAuthDigits.logout();

        this.OAuth2.signOut( () => {
            this.navigateTo( 'app.login' );
        } );
    }
}

export default [
    '$rootScope',
    '$scope',
    '$window',
    '$timeout',
    '$mdSidenav',
    '$log',
    '$ionicHistory',
    '$state',
    '$ionicNativeTransitions',
    '$ionicPlatform',
    '$mdDialog',
    '$mdBottomSheet',
    '$mdMenu',
    '$mdSelect',
    'OAuth2',
    'OAuthFacebook',
    'OAuthGoogle',
    'OAuthDigits',
    MenuController
];
