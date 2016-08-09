import { IScope, IWindowService, ITimeoutService, ILogService } from 'angular';
import { IStateService } from 'angular-ui-router';

import { AcessoCidadaoService, GoogleService, FacebookService, DigitsService, AcessoCidadaoClaims } from '../authentication/index';
import defaultAvatar from './img/user.png!image';

/**
 * Controller raiz da aplicação
 */
export default class MenuController {

    public static $inject: string[] = [
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
        'acessoCidadaoService',
        'facebookService',
        'googleService',
        'digitsService'
    ];

    /**
     * Cria uma instância de MenuController.
     * 
     * @param {IScope} $scope
     * @param {IWindowService} $window
     * @param {ITimeoutService} $timeout
     * @param {angular.material.ISidenavService} $mdSidenav
     * @param {ILogService} $log
     * @param {ionic.navigation.IonicHistoryService} $ionicHistory
     * @param {IStateService} $state
     * @param {any} $ionicNativeTransitions
     * @param {ionic.platform.IonicPlatformService} $ionicPlatform
     * @param {angular.material.IDialogService} $mdDialog
     * @param {angular.material.IBottomSheetService} $mdBottomSheet
     * @param {angular.material.IMenuService} $mdMenu
     * @param {*} $mdSelect
     * @param {AcessoCidadaoService} acessoCidadaoService
     * @param {FacebookService} facebookService
     * @param {GoogleService} googleService
     * @param {DigitsService} digitsService
     */
    constructor( private $scope: IScope,
                 private $window: IWindowService,
                 private $timeout: ITimeoutService,
                 private $mdSidenav: angular.material.ISidenavService,
                 private $log: ILogService,
                 private $ionicHistory: ionic.navigation.IonicHistoryService,
                 private $state: IStateService,
                 private $ionicNativeTransitions,
                 private $ionicPlatform: ionic.platform.IonicPlatformService,
                 private $mdDialog: angular.material.IDialogService,
                 private $mdBottomSheet: angular.material.IBottomSheetService,
                 private $mdMenu: angular.material.IMenuService,
                 private $mdSelect: any,
                 private acessoCidadaoService: AcessoCidadaoService,
                 private facebookService: FacebookService,
                 private googleService: GoogleService,
                 private digitsService: DigitsService ) {
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

        this.$ionicPlatform.registerBackButtonAction( () => {

            const sidenavIsOpen = this.$mdSidenav( 'left' ).isOpen();
            const bottomSheetIsOpen = angular.element( 'md-bottom-sheet' ).length > 0;
            const dialogIsOpen = angular.element( '[id^=dialog]' ).length > 0;
            const menuContentIsOpen = angular.element( 'md-template-content' ).length > 0;
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

                // todo: refatorar $mdDialog para usar o service $dialog
                // se não há nenhum dos "componentes" acima abertos e não existe state anterior,
                // então exibe uma janela de diálogo pedindo a confirmação para fechar a app.
                this.$mdDialog.show( {
                    controller: 'MenuComponent',
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
                    // Se o usuário confirma a janela de diálogo, então fecha a app.
                    ionic.Platform.exitApp();
                }, () => {
                    // Se o usuário clica no botão cancelar
                } );
            } else {
                // se existe uma view anterior, volta para ela
                this.$ionicHistory.goBack();
            }

        }, 100 );
    }

    /**
     * 
     * 
     * @readonly
     * @type {string}
     */
    public get avatarUrl(): string {
        if ( this.authenticated ) {
            return this.googleService.avatarUrl;
        } else {
            return defaultAvatar.src;
        }
    }

    /**
     * 
     * 
     * @readonly
     * @type {AcessoCidadaoClaims}
     */
    public get user(): AcessoCidadaoClaims {
        return this.acessoCidadaoService.userClaims;
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     */
    public get authenticated(): boolean {
        return this.acessoCidadaoService.authenticated;
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
    public navigateTo( stateName: string ): void {
        this.$timeout( () => {
            this.closeSideNav();
            if ( this.$ionicHistory.currentStateName() !== stateName ) {
                this.$ionicHistory.nextViewOptions( {
                    disableAnimate: true,
                    disableBack: true,
                    historyRoot: true
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

    /**
     * Desloga usuário do sistema
     */
    public signOut(): void {
        this.facebookService.logout();
        this.googleService.logout();
        this.digitsService.logout(); // TODO: Verificar se precisa mesmo do logout do Digits

        this.acessoCidadaoService.signOut( () => {
            this.navigateTo( 'home' );
        } );
    }
}


