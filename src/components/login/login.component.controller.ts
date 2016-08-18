import { IWindowService, IPromise } from 'angular';

import { ISettings } from '../shared/settings/index';
import { DialogService } from '../shared/dialog/dialog.service';
import { ToastService } from '../shared/toast/index';
import {
    AcessoCidadaoService,
    DigitsService,
    FacebookService,
    GoogleService,
    Identity,
    AcessoCidadaoIdentity,
    SocialNetworkIdentity,
    PhoneIdentity,
    AcessoCidadaoClaims,
    LowLevelProtocolClaims,
    FacebookResponse,
    FacebookAuthResponse,
    DigitsAccessToken,
    DigitsAuthResponse,
    GoogleAuthResponse
} from '../shared/authentication/index';

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
        'acessoCidadaoService',
        'digitsService',
        'facebookService',
        'googleService',
        'dialog',
        'toast',
        'settings',
        '$window',
        '$ionicHistory',
        '$ionicLoading'
    ];

    private user: { username: string, password: string } = { username: '', password: '' };
    private errorMsgs = {
        accountNotLinked: 'Usuário não encontrado.'
    };


    /**
     * @constructor
     *
     * @param {angular.ui.IStateService} $state
     * @param {AcessoCidadaoService} acessoCidadaoService
     * @param {DigitsService} digitsService
     * @param {FacebookService} facebookService
     * @param {GoogleService} googleService
     * @param {DialogService} dialog
     * @param {ToastService} toast
     * @param {} settings
     * @param {IWindowService} $window
     * @param {IonicHistoryService} $ionicHistory
     * @param {IonicLoadingService} $ionicLoading
     */
    constructor( private $state: angular.ui.IStateService,
                 private acessoCidadaoService: AcessoCidadaoService,
                 private digitsService: DigitsService,
                 private facebookService: FacebookService,
                 private googleService: GoogleService,
                 private dialog: DialogService,
                 private toast: ToastService,
                 private settings: ISettings,
                 private $window: IWindowService,
                 private $ionicHistory: ionic.navigation.IonicHistoryService,
                 private $ionicLoading: ionic.loading.IonicLoadingService ) {
        this.activate();
    }


    /**
     * Ativa o controller
     */
    public activate(): void {
        this.acessoCidadaoService.initialize( this.settings.identityServer.url );
    }


    /**
     * Executa login na aplicação de acordo com as configurações do settings, usuário e senha.
     */
    public login(): void {

        if ( !this.user.username || !this.user.password ) {
            this.toast.info( { title: 'Login e senha são obrigatórios' } ); return;
        }

        let identity: AcessoCidadaoIdentity = {
            client_id: this.settings.identityServer.clients.espm.id,
            client_secret: this.settings.identityServer.clients.espm.secret,
            grant_type: 'password',
            scope: 'openid offline_access',
            username: this.user.username,
            password: this.user.password
        };

        this.signInAcessoCidadao( identity );
    }

    /**
     * Realiza o login usando o facebook
     * https://github.com/jeduan/cordova-plugin-facebook4
     */
    public facebookLogin(): void {
        this.facebookService.login( [ 'email', 'public_profile' ], ( authResponse: FacebookAuthResponse ) => {

            let identity: SocialNetworkIdentity = {
                client_id: this.settings.identityServer.clients.espmExternalLoginAndroid.id,
                client_secret: this.settings.identityServer.clients.espmExternalLoginAndroid.secret,
                grant_type: 'customloginexterno',
                scope: 'openid offline_access',
                provider: 'Facebook',
                accesstoken: authResponse.accessToken
            };

            this.signInAcessoCidadao( identity );

        }, () => this.toast.error( { title: '[Facebook] Falha no login' } ) );
    }

     /**
      * Realiza o login usando conta do google
      */
     public googleLogin(): void {
        let options = {
            'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            'webClientId': this.settings.googleWebClientId, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        };

        this.googleService.login( options, ( authResponse: GoogleAuthResponse )  => {

            let identity: SocialNetworkIdentity = {
                client_id: this.settings.identityServer.clients.espmExternalLoginAndroid.id,
                client_secret: this.settings.identityServer.clients.espmExternalLoginAndroid.secret,
                grant_type: 'customloginexterno',
                scope: 'openid offline_access',
                provider:  'Google',
                accesstoken: authResponse.oauthToken
            };

            this.signInAcessoCidadao( identity );

        }, () => this.toast.error( { title: '[Google] Falha no login' } ) );
    }

     /**
      * Realiza login digits
      */
     public digitsLogin(): void {
        this.digitsService.login( {}, ( authResponse: DigitsAuthResponse ) => {

            let identity: PhoneIdentity = {
                client_id: this.settings.identityServer.clients.espmExternalLoginAndroid.id,
                client_secret: this.settings.identityServer.clients.espmExternalLoginAndroid.secret,
                grant_type: 'customloginexterno',
                scope: 'openid offline_access',
                provider: 'Celular',
                accesstoken: 'token',
                apiUrl: authResponse['X-Auth-Service-Provider'],
                authHeader: authResponse['X-Verify-Credentials-Authorization'],
            };

            this.signInAcessoCidadao( identity );

        }, () =>  this.toast.error( { title: '[SMS] Falha no login' } ) );
    }


    /**
     * Efetua login no acesso cidadão usando um identity.
     * 
     * @param {Identity} identity
     */
    public signInAcessoCidadao( identity: Identity ): void {
        this.$ionicLoading.show();
        this.acessoCidadaoService
            .signIn( identity )
            .then( () => this.onAcessoCidadaoLoginSuccess() )
            .catch( error => this.onAcessoCidadaoLoginError( error ) )
            .finally( () => this.$ionicLoading.hide() );
    }


    /**
     * Callback de sucesso no login no acesso cidadão.
     */
    public onAcessoCidadaoLoginSuccess(): void {
        this.user = undefined;
        this.goToDashboard();
    }

    /**
     * Callback de erro no login no acesso cidadão.
     * 
     * @param {{ data: { error: string } }} error
     */
    public onAcessoCidadaoLoginError( error: { data: { error: string } } ): void {
        if ( this.isAccountNotLinked( error.data ) ) {
            this.showDialogAccountNotLinked();
        } else {
            this.toast.error( { title: 'Falha no Login' } );
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
        } ).then( () => {
            this.$window.open( 'https://acessocidadao.es.gov.br/Conta/VerificarCPF', '_system' );
        } );
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
        } );

        this.$state.go( 'app.dashboard.newsHighlights' );
    }

    /**
     * Abre a janela(no browser) de recuperar senha do acesso cidadão.
     */
    public openUrlForgotPassword(): void {
        this.$window.open( 'https://acessocidadao.es.gov.br/Conta/SolicitarReinicioSenha', '_system' );
    }
}
