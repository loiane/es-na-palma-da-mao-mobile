import { Component, OnInit, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { SepApiService } from './shared/sep-api.service';
import { Process, ProcessUpdate } from './shared/models/index';
import { CapitalizePipe } from '../shared/pipes/index';

@Component({
    moduleId: __moduleName,
    templateUrl: './sep-consulta.component.html',
    styleUrls: ['./sep-consulta.component.css'],
    providers: [SepApiService],
    pipes: [ CapitalizePipe ]
})
export class SepConsulta implements OnInit {
    @ViewChild(Content) content: Content;

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
    constructor(private sepApiService: SepApiService) {

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

    private setMoreUpdatesLabel(): void {
        if (this.showAllUpdates) {
            this.seeMoreUpdates = 'OCULTAR';
        } else {
            this.seeMoreUpdates = 'VER MAIS';
        }
    }

    /**
     * Obtém a primeira atualização do processo
     * 
     * @readonly
     * @type {ProcessUpdate}
     */
    public get firstUpdate(): ProcessUpdate {
        if (this.process && this.process.updates && this.process.updates.length > 0) {
            return this.process.updates[this.process.updates.length - 1];
        }
    }

    /**
     * Obtém a última atualização do processo
     * 
     * @readonly
     * @type {ProcessUpdate}
     */
    public get lastUpdate(): ProcessUpdate {
        if (this.process && this.process.updates && this.process.updates.length > 0) {
            return this.process.updates[0];
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
        this.setMoreUpdatesLabel();

        if (this.showAllUpdates) {
            this.content.scrollTo(0, 500, 300); // TODO: try to search the element to scroll: anchorScroll
        }
    }

    /**
    * Obtém as atualizações que ficarão inicialmente escondidas na tela.
    * 
    * @readonly
    * @type {ProcessUpdate[]}
    */
    public get hiddenUpdates(): ProcessUpdate[] {
        if (this.process && this.process.updates && this.process.updates.length > 0) {
            return this.process.updates.slice(1);
        }
    }

    /**
     * Obtém um processo eletrônico pelo número do processo.
     * @param {*} event: 
     * @return {undefined}
     */
    public getProcess(event: any): void {
        return this.sepApiService.getProcessByNumber(event.target.value)
            .finally(() => {
                this.populated = true;
                this.showAllUpdates = false;
                this.setMoreUpdatesLabel();
            })
            .subscribe(
            process => this.process = process,
            error => this.process = undefined
            );
    }
}
