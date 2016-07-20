import { Component, OnInit } from '@angular/core';
import { TabsComponent } from '../tabs/tabs';

@Component( {
    moduleId: __moduleName,
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css' ]
})
export class DashBoardComponent implements OnInit {
    
    public tabHighlights = TabsComponent;
    public tabCalendar = TabsComponent;

    /**
     * Creates an instance of DashBoardComponent.
     * 
     */
    constructor() { }

    /**
     * Inicializa o component
     * 
     * @returns {*}
     */
    ngOnInit(): any {

    }
}
