import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginComponent } from '../login/login.component';

@Component({
    moduleId: __moduleName,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    /**
     * 
     * 
     * @private
     */
    private loginComponent = LoginComponent;

    /**
     * Creates an instance of HomeComponent.
     * 
     * @param {NavController} nav
     */
    constructor( private nav: NavController ) {
    }

    /**
     *
     */
    public navigateToLogin(): void {
        this.nav.push( this.loginComponent );
    }

    /**
     * Redireciona para 1ª tela do processo de criação de conta utilizando o navegador
     */
    public createAccount(): void {
        window.open( 'https://acessocidadao.es.gov.br/Conta/VerificarCPF', '_system' );
    }

}
