import { IWindowService, IPromise } from 'angular';

import { DialogService } from '../shared/dialog/dialog.service';
import { ToastService } from '../shared/toast/index';
import { AuthenticationService, Identity } from '../shared/authentication/index';
import { PushConfig } from '../shared/push/index';

/**
 * 
 * 
 * @class LoginController
 */
export class LoginController {
    /**
     * 
     * 
     * @static
     * @type {string[]}
     */
    public static $inject: string[] = [
        '$state',
        'authenticationService',
        'dialog',
        'toast',
        '$window',
        '$ionicHistory',
        'pushConfig'
    ];

    public processingLogin: boolean = false;
    public user: { username: string, password: string } = { username: '', password: '' };
    public errorMsgs = {
        accountNotLinked: 'User not found.' // Verification message with AcessoCidadao
    };

    /**
     * Creates an instance of LoginController.
     * 
     * @param {angular.ui.IStateService} $state
     * @param {AuthenticationService} authenticationService
     * @param {DialogService} dialog
     * @param {ToastService} toast
     * @param {ISettings} settings
     * @param {IWindowService} $window
     * @param {ionic.navigation.IonicHistoryService} $ionicHistory
     * @param {PushConfig} pushConfig
     */
    constructor( private $state: angular.ui.IStateService,
        private authenticationService: AuthenticationService,
        private dialog: DialogService,
        private toast: ToastService,
        private $window: IWindowService,
        private $ionicHistory: ionic.navigation.IonicHistoryService,
        private pushConfig: PushConfig ) {
    }

    /**
     * Executa login na aplicação de acordo com as configurações do settings, usuário e senha.
     */
    public login(): void {

        this.processingLogin = true;

        if ( !this.user.username || !this.user.password ) {
            this.toast.info( { title: 'Login e senha são obrigatórios' }); return;
        }

        this.authenticationService.login( this.user.username, this.user.password )
            .then(() => this.onAcessoCidadaoLoginSuccess() )
            .catch( error => this.onAcessoCidadaoLoginError( error ) )
            .finally(() => this.processingLogin = false );
    }

    /**
     * Realiza o login usando o facebook
     * https://github.com/jeduan/cordova-plugin-facebook4
     */
    public facebookLogin(): IPromise<void> {
        return this.authenticationService.facebookLogin()
            .then(( identity ) => this.signInAcessoCidadao( identity ) )
            .catch(() => this.toast.error( { title: '[Facebook] Falha no login' }) );
    }

    /**
     * Realiza o login usando conta do google
     */
    public googleLogin(): IPromise<void> {
        return this.authenticationService.googleLogin()
            .then( identity => this.signInAcessoCidadao( identity ) )
            .catch(() => this.toast.error( { title: '[Google] Falha no login' }) );
    }

    /**
     * Realiza login digits
     */
    public digitsLogin(): IPromise<void> {
        return this.authenticationService.digitsLogin()
            .then(( identity ) => this.signInAcessoCidadao( identity ) )
            .catch(() => this.toast.error( { title: '[SMS] Falha no login' }) );
    }


    /**
     * Efetua login no acesso cidadão usando um identity.
     * 
     * @param {Identity} identity
     */
    public signInAcessoCidadao( identity: Identity ): IPromise<void> {
        return this.authenticationService.signInAcessoCidadao( identity )
            .then(() => this.onAcessoCidadaoLoginSuccess() )
            .catch( error => this.onAcessoCidadaoLoginError( error ) );
    }

    /**
     * Callback de sucesso no login no acesso cidadão.
     */
    public onAcessoCidadaoLoginSuccess(): void {
        this.pushConfig.init();
        this.user = { username: '', password: '' };
        this.goToDashboard();
    }

    /**
     * Callback de erro no login no acesso cidadão.
     * 
     * @param {{ data: { error: string } }} error
     */
    public onAcessoCidadaoLoginError( error: { data: { error: string } }): void {
        if ( this.isAccountNotLinked( error.data ) ) {
            this.showDialogAccountNotLinked();
        } else {
            this.toast.error( { title: 'Falha no Login' });
        }
    }

    /**
    *
    */
    public showDialogAccountNotLinked(): void {
        this.dialog.confirm( {
            title: 'Conta não vinculada',
            content: 'Acesse utilizando o usuário e senha ou clique para criar uma nova conta',
            ok: 'Criar conta'
        }).then(() => {
            this.$window.open( 'https://acessocidadao.es.gov.br/Conta/VerificarCPF', '_system' );
        });
    }

    /**
     * 
     * 
     * @param {any} data
     * @returns {boolean}
     */
    public isAccountNotLinked( data ): boolean {
        return data.error === this.errorMsgs.accountNotLinked;
    }

    /**
     * Redireciona usuário para o dashboard
     */
    public goToDashboard(): void {
        this.$ionicHistory.nextViewOptions( {
            disableAnimate: true,
            historyRoot: true
        });

        this.$state.go( 'app.dashboard.newsHighlights' );
    }

    /**
     * Abre a janela(no browser) de recuperar senha do acesso cidadão.
     */
    public openUrlForgotPassword(): void {
        this.$window.open( 'https://acessocidadao.es.gov.br/Conta/SolicitarReinicioSenha', '_system' );
    }
}
