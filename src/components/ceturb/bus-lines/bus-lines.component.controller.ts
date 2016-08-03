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
        this.filter = '';
        this.lines = undefined;
        this.populated = false;
    }

    public goToBusInfo( id: string): void {
        this.$state.go( 'app.news/:id', { id: id } );
    }

    /**
     * Indica se existe algum processo carregado
     * 
     * @readonly
     * @type {boolean}
     */
    public get hasLines(): boolean {
        return angular.isDefined( this.lines );
    }

    /**
     * Obtém um processo eletrônico pelo número do processo.
     * @param {Number} number: Process number
     * @return {undefined}
     */
    public getLines( filter: string ): void {
         this.ceturbApiService.getLines( filter )
                        .then( lines => {
                            this.lines = lines;
                            return lines;
                        } )
                        .catch( () => {
                            this.lines = undefined;
                        } )
                        .finally( () => {
                            this.populated = true;
                        } );
    }
}
