import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { DashBoardComponent } from '../dashboard/dashboard.component';
import { TabsComponent } from '../tabs/tabs';
import { SepConsulta } from '../sep/sep-consulta.component';


@Component( {
    moduleId: __moduleName,
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    
    /**
     * A página sendo exibida
     * 
     * @private
     * @type {*}
     */
    private rootPage: any = DashBoardComponent;

    /**
     * 
     * 
     * @private
     */
    private tabsComponent = TabsComponent;

    /**
     * 
     * 
     * @private
     */
    private dashboardComponent = DashBoardComponent;

    /**
     * 
     * 
     * @private
     */
    private sepComponent = SepConsulta;
    
    /**
     * Creates an instance of AppComponent.
     * 
     * @param {Platform} platform
     * @param {MenuController} menu
     */
    constructor( private menu: MenuController,
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
