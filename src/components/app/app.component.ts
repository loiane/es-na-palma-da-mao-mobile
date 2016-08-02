import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuController, Platform, Loading, NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { DashBoardComponent } from '../dashboard/index';
import { SepConsulta } from '../sep/sep-consulta.component';
import { NewsListComponent } from '../news/index';
import { UIStateService, UIState } from '../shared/index';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component( {
    moduleId: __moduleName,
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    @ViewChild( 'appNav' ) nav;
    private rootPage: any = DashBoardComponent;
    private readonly dashboardComponent = DashBoardComponent;
    private readonly newsListComponent = NewsListComponent;
    private readonly sepComponent = SepConsulta;

    private uiStateChanged: Subscription;
    private loading: Loading;
    private timeout: number;

    /**
     * Creates an instance of AppComponent.
     * 
     * @param {Platform} platform
     * @param {MenuController} menu
     */
    constructor( private menu: MenuController,
        private uiStateService: UIStateService,
        private platform: Platform ) {

        platform.ready().then( () => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    /**
     * Inicializa o component
     * 
     * @returns {*}
     */
    ngOnInit(): any {
        this.menu.enable( true );
        this.uiStateChanged = this.uiStateService
            .state
            .subscribe( ( state: UIState ) => {
                
                // só exibe um loading para múltiplas requisições "empilhadas"
                if ( state.startedBackendRequest && state.onGoingBackendRequests === 1 ) {
                       this.timeout && clearTimeout( this.timeout );
                       this.timeout = window.setTimeout( () => {
                            this.loading = Loading.create();
                            this.nav.present( this.loading );
                       }, 300 );
                }

                if ( state.completedBackendRequest && state.onGoingBackendRequests === 0 ) {
                    clearTimeout( this.timeout );
                    this.loading && this.loading.dismiss();
                }
            });
    }

    /**
     * 
     */
    ngOnDestroy() {
        this.uiStateChanged && this.uiStateChanged.unsubscribe();
        this.loading = null;
    }

    /**
     * 
     * 
     * @param {any} page
     */
    public goTo( page: any ) {
        // Reset the nav controller to have just this page
        // we wouldn't want the back button to show in this scenario
        this.rootPage = page;

        // close the menu when clicking a link from the menu
        this.menu.close();
    }
}
