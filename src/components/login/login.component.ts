import { Component, ViewEncapsulation } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dialogs, Toast } from 'ionic-native';
import { AppComponent } from '../app/app.component';
import { LoginService } from '../shared/authentication/index';
import { AcessoCidadaoService, DigitsService, FacebookService, GoogleService } from '../shared/index';

/**
 * 
 * 
 * @class LoginController
 */
@Component( {
    moduleId: __moduleName,
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ],
    providers: [ AcessoCidadaoService, DigitsService, FacebookService, GoogleService, LoginService ],
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent {

    private appComponent = AppComponent;
    private user: { username: string, password: string } = { username: '', password: '' };
    private errorMsgs = {
        accountNotLinked: 'Usuário não encontrado.'
    };
    
    /**
     * Creates an instance of LoginComponent.
     * 
     * @param {LoginService} loginService
     * @param {NavController} nav
     */
    constructor( private loginService: LoginService,
                 private nav: NavController ) {
    }

    /**
     * 
     * 
     * @private
     * @param {any} identity
     */
    private loginAcessoCidadao( identity ) {
        this.loginService.signInAcessoCidadao( identity )
            .then(() => this.onAcessoCidadaoLoginSuccess() )
            .catch( error => this.onAcessoCidadaoLoginError( error ) );
    }

    /**
     * Executa login na aplicação de acordo com usuário e senha.
     */
    public login(): void {

        if ( !this.user.username || !this.user.password ) {
            this.showToast( 'Login e senha são obrigatórios' ); 
            return;
        }

        this.loginService.login( this.user.username, this.user.password )
            .then(() => this.onAcessoCidadaoLoginSuccess() )
            .catch( error => this.onAcessoCidadaoLoginError( error ) );
    }

    /**
     * Realiza o login usando o facebook
     * https://github.com/jeduan/cordova-plugin-facebook4
     */
    public facebookLogin(): void {
        this.loginService.facebookLogin( 
            ( identity ) => this.loginAcessoCidadao( identity ), 
            () => this.showToast( '[Facebook] Falha no login' ) 
        );
    }

    /**
     * Realiza o login usando conta do google
     */
    public googleLogin(): void {
        this.loginService.googleLogin(
            ( identity ) => this.loginAcessoCidadao( identity ), 
            () => this.showToast( '[Google] Falha no login' ) );
    }

    /**
     * Realiza login digits
     */
    public digitsLogin(): void {
        this.loginService.digitsLogin(
            ( identity ) => this.loginAcessoCidadao( identity ), 
            () => this.showToast( '[SMS] Falha no login' ) );
    }

    /**
     * Callback de sucesso no login no acesso cidadão.
     */
    public onAcessoCidadaoLoginSuccess(): void {
        this.user = { username: '', password: '' };
        this.goToDashboard();
    }

    /**
     * Callback de erro no login no acesso cidadão.
     * 
     * @param {{ data: { error: string } }} error
     */
    public onAcessoCidadaoLoginError( error: any ): void {
        if ( this.isAccountNotLinked( error.data ) ) {
            this.showDialogAccountNotLinked();
        } else {
            this.showToast( 'Falha no login' );
        }
    }

    /**
     * 
     * 
     * @private
     * @param {any} message
     */
    private showToast( message ) {
        let toast = Toast.show( message, '3000', 'bottom' );
    }

    /**
    *
    */
    private showDialogAccountNotLinked(): void { // TODO
        Dialogs.confirm( {
            title: 'Conta não vinculada',
            message: 'Acesse utilizando o usuário e senha ou clique para criar uma nova conta',
            buttonLabels: [ 'Criar conta', 'Cancelar' ]
        }).then( buttonIndex => {
            if ( buttonIndex === 0 ) {
                window.open( 'https://acessocidadao.es.gov.br/Conta/VerificarCPF', '_system' );
            }
        });
    }

    /**
     * 
     * 
     * @param {any} data
     * @returns {boolean}
     */
    public isAccountNotLinked( data ): boolean {
        if ( data ) {
            return data.error === this.errorMsgs.accountNotLinked;
        }

        return false;
    }

    /**
     * Redireciona usuário para o dashboard
     */
    public goToDashboard(): void {
        this.nav.setRoot( this.appComponent );
    }

    /**
     * Abre a janela(no browser) de recuperar senha do acesso cidadão.
     */
    public openUrlForgotPassword(): void {
        window.open( 'https://acessocidadao.es.gov.br/Conta/SolicitarReinicioSenha', '_system' );
    }
}
