import { IScope, ITimeoutService, IRootScopeService } from 'angular';

import { AuthenticationStorageService, AcessoCidadaoClaims, AuthenticationService } from '../../shared/authentication/index';
import defaultAvatar from './img/user.png!image';
import { ToastService } from '../../shared/index';
import { Route } from '../../shared/routes/index';
import { DriverLicenseStorage } from '../../detran/shared/index';

/**
 * Controller raiz da aplicação
 */
export default class MenuController {

    public static $inject: string[] = [
        '$rootScope',
        '$scope',
        '$timeout',
        '$mdSidenav',
        '$ionicHistory',
        '$state',
        '$ionicNativeTransitions',
        '$ionicPlatform',
        '$mdDialog',
        '$mdBottomSheet',
        '$mdMenu',
        '$mdSelect',
        'authenticationService',
        'authenticationStorageService',
        'toast',
        'detranStorage'
    ];

    /**
     * Creates an instance of MenuController.
     * 
     * @param {IRootScopeService} $rootScope
     * @param {IScope} $scope
     * @param {ITimeoutService} $timeout
     * @param {angular.material.ISidenavService} $mdSidenav
     * @param {ionic.navigation.IonicHistoryService} $ionicHistory
     * @param {angular.ui.IStateService} $state
     * @param {any} $ionicNativeTransitions
     * @param {ionic.platform.IonicPlatformService} $ionicPlatform
     * @param {angular.material.IDialogService} $mdDialog
     * @param {angular.material.IBottomSheetService} $mdBottomSheet
     * @param {angular.material.IMenuService} $mdMenu
     * @param {*} $mdSelect
     * @param {GoogleService} googleService
     * @param {AuthenticationService} authenticationService
     * @param {ToastService} toast
     * @param {DriverLicenseStorage} driverLicenseStorage
     */
    constructor( private $rootScope: IRootScopeService,
        private $scope: IScope,
        private $timeout: ITimeoutService,
        private $mdSidenav: angular.material.ISidenavService,
        private $ionicHistory: ionic.navigation.IonicHistoryService,
        private $state: angular.ui.IStateService,
        private $ionicNativeTransitions,
        private $ionicPlatform: ionic.platform.IonicPlatformService,
        private $mdDialog: angular.material.IDialogService,
        private $mdBottomSheet: angular.material.IBottomSheetService,
        private $mdMenu: angular.material.IMenuService,
        private $mdSelect: any,
        private authenticationService: AuthenticationService,
        private authenticationStorageService: AuthenticationStorageService,
        private toast: ToastService,
        private driverLicenseStorage: DriverLicenseStorage ) {
        this.activate();
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    public activate(): void {
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
        //  Close side template         = 150
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

        this.$ionicPlatform.registerBackButtonAction(() => {

            if ( this.$rootScope.backButtonPressedOnceToExit ) {
                this.$rootScope.backButtonPressedOnceToExit = false;
                ionic.Platform.exitApp();
            }

            const sidenavIsOpen = this.$mdSidenav( 'left' ).isOpen();
            const bottomSheetIsOpen = angular.element( document.querySelectorAll( 'md-bottom-sheet' ) ).length > 0;
            const dialogIsOpen = angular.element( document.querySelectorAll( '[id^=dialog]' ) ).length > 0;
            const menuContentIsOpen = angular.element( document.querySelectorAll( 'md-template-content' ) ).length > 0;
            const selectMenuIsOpen = angular.element( document.querySelectorAll( 'div._md-select-menu-container._md-active' ) ).length > 0;
            const previousStateIsEmpty = !this.$ionicHistory.backView();

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
            } else if ( previousStateIsEmpty ) {

                this.$rootScope.backButtonPressedOnceToExit = true;
                this.toast.info( { title: 'Aperte voltar novamente para sair' });

                setTimeout(() => {
                    this.$rootScope.backButtonPressedOnceToExit = false;
                }, 2000 );

            } else {
                // se existe uma view anterior, volta para ela
                if ( this.$ionicNativeTransitions ) {
                    this.$ionicNativeTransitions.goBack();
                } else {
                    this.$ionicHistory.goBack();
                }
            }

        }, 100 );
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     * @memberOf MenuController
     */
    public get hasDriverLicense(): boolean {
        return this.driverLicenseStorage.hasDriverLicense;
    }

    /**
     * 
     * 
     * @readonly
     * @type {string}
     */
    public get avatarUrl(): string {
        return this.authenticationStorageService.googleAvatarUrl || this.authenticationStorageService.facebookAvatarUrl || defaultAvatar.src;
    }

    /**
     * 
     * 
     * @readonly
     * @type {AcessoCidadaoClaims}
     */
    public get user(): AcessoCidadaoClaims {
        return this.authenticationService.user;
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     */
    public get authenticated(): boolean {
        return this.authenticationService.isAuthenticated;
    }

    /**
     *  Fecha a barra de navegação lateral
     *  It will use with event on-swipe-left="closeSideNav()" on-drag-left="closeSideNav()"
     *  When user swipe or drag md-sidenav to left side
     *
     *  @returns {void}
     */
    public closeSideNav(): void {
        this.$mdSidenav( 'left' ).close();
    }

    /**
     * Alterna exibição do sidebar
     *
     * @returns {void}
     */
    public toggleLeft(): void {
        this.$mdSidenav( 'left' ).toggle();
    }

    /**
     * Navega para o state especificado
     *
     * @param {string} stateName - o nome do state destino
     *
     * @returns {void}
     */
    public navigateTo( route: Route ): void {
        let stateName = route.name;
        if ( route.menuName === 'Situação CNH' ) {
            stateName = this.hasDriverLicense ? 'app.driverLicenseStatus' : 'app.driverLicense';
        }
        this.$timeout(() => {
            this.closeSideNav();
            if ( this.$ionicHistory.currentStateName() !== stateName ) {

                // Only change state if has a valid token
                this.$ionicHistory.nextViewOptions( {
                    disableAnimate: true,
                    disableBack: true,
                    historyRoot: true
                });
                if ( this.$ionicNativeTransitions ) {
                    this.$ionicNativeTransitions.stateGo( stateName, {}, {}, {
                        'type': 'fade'
                    });
                } else {
                    this.$state.go( stateName );
                }
            }
        }, ( this.$scope.isAndroid === false ? 300 : 0 ) );
    }

    /**
     * Desloga usuário do sistema
     */
    public signOut(): void {
        this.authenticationService.signOut(() => {
            this.$rootScope.$broadcast( 'logout' );
            this.closeSideNav();
            this.$ionicHistory.nextViewOptions( {
                disableBack: true,
                historyRoot: true
            });
            this.$state.go( 'home' );
        });
    }
}


