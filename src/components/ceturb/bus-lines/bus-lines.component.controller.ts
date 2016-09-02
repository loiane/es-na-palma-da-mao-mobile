import { IScope, IPromise } from 'angular';

import { BusLine, CeturbApiService } from '../shared/index';

export class BusLinesController {

    public static $inject: string[] = [
        '$scope',
        '$state',
        'ceturbApiService'
    ];

    private filter: string;
    private filteredLines: BusLine[];
    private lines: BusLine[];

    /**
     * Creates an instance of BusLinesController.
     * 
     * @param {IScope} $scope
     * @param {angular.ui.IStateService} $state
     * @param {CeturbApiService} ceturbApiService
     */
    constructor( private $scope: IScope,
        private $state: angular.ui.IStateService,
        private ceturbApiService: CeturbApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    public activate(): void {
        this.filter = '';
        this.getLines();
    }

    /**
     * 
     * 
     * @param {string} id
     */
    public goToLine( id: string ): void {
        this.$state.go( 'app.busInfo/:id', { id: id });
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     */
    public get foundLines(): boolean {
        return this.linesPopuled && !!this.filteredLines.length;
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     */
    public get linesPopuled(): boolean {
        return angular.isDefined( this.lines );
    }

    /**
     * 
     * 
     * @readonly
     * @type {boolean}
     */
    public get hasMoreLines(): boolean {
        return this.lines.length < this.filteredLines.length;
    }

    /**
     * 
     */
    public getLines(): void {
        this.ceturbApiService.getLines()
            .then( lines => {
                this.filteredLines = this.lines = lines.map( line => {
                    line.name = this.accentFold( line.name );
                    return line;
                });
                return this.lines;
            });
    }


    /**
     * 
     * 
     * @param {string} filter
     */
    public filterLines( filter: string ): void {
        let upperFilter = this.accentFold( filter.toUpperCase() );
        this.filteredLines = this.lines.filter( line =>  line.name.includes( upperFilter ) ||  line.number.includes( upperFilter ) );
    }


    /**
     * 
     * 
     * @private
     * @type {*}
     */
    private accentMap: any = {
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
        'Â': 'A', 'Ê': 'E', 'Ô': 'O',
        'Ã': 'A', 'Õ': 'O',
        'Ç': 'C'
    };


    /**
     * 
     * 
     * @private
     * @param {any} s
     * @returns
     */
    private accentFold( s ) {
        if ( !s ) { return ''; }
        let ret = '';
        for ( let i = 0; i < s.length; i++ ) {
            ret += this.accentMap[ s.charAt( i ) ] || s.charAt( i );
        }
        return ret;
    };
}
