import { IScope, IPromise, IState } from 'angular';

import { CeturbApiService } from '../shared/ceturb-api.service';
import { BusLine } from '../shared/models/index';

export class BusLinesController {

    public static $inject: string[] = [
        '$scope',
        '$state',
        'ceturbApiService'
    ];

    private filter: string;
    private filteredLines: BusLine[];
    private lines: BusLine[];
    private populated: boolean;

    /**
     * Creates an instance of SepConsultaController.
     * @constructor
     * @param {IScope} $scope
     * @param {SepApiService} sepApiService
     */
    constructor( private $scope: IScope,
        private $state: IState,
        private ceturbApiService: CeturbApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    public activate(): void {
        this.populated = false;
        this.filter = '';
        this.lines = this.filteredLines = [];
        this.getLines();
    }

    public goToLine( id: string ): void {
        this.$state.go( 'app.busInfo/:id', { id: id });
    }

    /**
     * Indica se existe algum processo carregado
     * 
     * @readonly
     * @type {boolean}
     */
    public get hasLines(): boolean {
        return !!this.filteredLines.length;
    }

    /**
     * 
     */
    public getLines(): void {
        this.ceturbApiService.getLines()
            .then( lines => {
                this.lines = <BusLine[]>lines.map( x => {
                    return {
                        number: x.number,
                        name: x.name.trim(),
                        nameLower: x.name.toLowerCase()
                    };
                });
                this.filteredLines = this.lines;
                this.populated = true;
                return this.lines;
            })
            .catch(() => {
                this.lines = [];
            });
    }


    /**
     * Propriedade utilizada no debounce da função de filtro. Salva o setTime caso precise ser cancelado.
     * 
     * @private
     */
    private lastFilter = undefined;

    /**
     * Função de filtro implementada com debounce de 500ms
     * 
     * @param {string} filter
     */
    public filterLines( filter: string ): void {
        if ( this.lastFilter ) {
            clearTimeout( this.lastFilter );
        }

        this.lastFilter = setTimeout( () => {
            let lowerFilter = filter.toLowerCase();
            this.filteredLines = this.lines.filter( x => ( x.nameLower.indexOf( lowerFilter ) >= 0 ) || ( x.number.indexOf( lowerFilter ) >= 0 ) );
            this.lastFilter = undefined;
            this.$scope.$apply();
        }, 500 );
    }
}
