import { Component, OnInit } from '@angular/core';
import { Content } from 'ionic-angular';
import { SepApiService } from './shared/sep-api.service';
import { Process, ProcessUpdate } from './shared/models/index';

@Component( {
    moduleId: __moduleName,
    templateUrl: './sep-consulta.component.html',
    providers: [ SepApiService ]
})
export class SepConsulta implements OnInit {

    private seeMoreUpdates: string;
    private processNumber: string;
    private process: Process;
    private populated: boolean;
    private showAllUpdates: boolean;


    /**
     * Creates an instance of SepConsultaController.
     * 
     * @param {SepApiService} sepApiService
     */
    constructor( private sepApiService: SepApiService, private content: Content ) {

    }

    /**
     * 
     * 
     * @returns {*}
     */
    public ngOnInit(): any {
        this.seeMoreUpdates = 'VER MAIS';
        this.processNumber = '';
        this.process = undefined;
        this.populated = false;
        this.showAllUpdates = false;
    }

    /**
     * Obtém a primeira atualização do processo
     * 
     * @readonly
     * @type {ProcessUpdate}
     */
    public get firstUpdate(): ProcessUpdate {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates[ this.process.updates.length - 1 ];
        }
    }

    /**
     * Obtém a última atualização do processo
     * 
     * @readonly
     * @type {ProcessUpdate}
     */
    public get lastUpdate(): ProcessUpdate {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates[ 0 ];
        }
    }


    /**
     * Indica se existe algum processo carregado
     * 
     * @readonly
     * @type {boolean}
     */
    public get hasProcess(): boolean {
        return !!this.process;
    }

    /**
     * Alterna a visibilidade das atualizações do processo eletrônico
     */
    public toggleUpdates(): void {
        this.showAllUpdates = !this.showAllUpdates;

        if ( this.showAllUpdates ) {
            this.seeMoreUpdates = 'OCULTAR';
            this.content.scrollTo( 0, 300, 300 ); // TODO: try to search the element to scroll: anchorScroll
        } else {
            this.seeMoreUpdates = 'VER MAIS';
        }
    }

     /**
     * Obtém as atualizações que ficarão inicialmente escondidas na tela.
     * 
     * @readonly
     * @type {ProcessUpdate[]}
     */
    public get hiddenUpdates(): ProcessUpdate[] {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates.slice( 1 );
        }
    }

    /**
     * Obtém um processo eletrônico pelo número do processo.
     * @param {Number} number: Process number
     * @return {undefined}
     */
    public getProcess( procNumber: string ): void {
         this.sepApiService.getProcessByNumber( procNumber )
                        .map( process => {
                            this.process = process;
                            return process;
                        } )
                        .catch( () => this.process = undefined )
                        .finally( () => this.populated = true );
    }
}
