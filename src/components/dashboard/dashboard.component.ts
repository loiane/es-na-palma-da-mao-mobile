import { Component, OnInit } from '@angular/core';
import { NewsHighlightsComponent } from '../news/highlights/index';

@Component( {
    moduleId: __moduleName,
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css' ]
})
export class DashBoardComponent implements OnInit {
    
    public tabHighlights = NewsHighlightsComponent;
    public tabCalendar = NewsHighlightsComponent;

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
    public ngOnInit(): any {

    }
}
