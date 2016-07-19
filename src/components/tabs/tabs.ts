import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({ 
    moduleId: __moduleName,
    templateUrl: './tabs.html'
})
export class TabsComponent {
    constructor( private navController: NavController ) {

    }
}
