import { IScope } from 'angular';

import { BusLine, CeturbApiService, CeturbStorage } from '../shared/index';

export class BusLinesController {

    public static $inject: string[] = [
        '$scope',
        '$state',
        'ceturbApiService',
        'ceturbStorage'
    ];

    public filter: string;
    public filteredLines: BusLine[];
    public lines: BusLine[];

    /**
     * Creates an instance of BusLinesController.
     * 
     * @param {IScope} $scope
     * @param {angular.ui.IStateService} $state
     * @param {CeturbApiService} ceturbApiService
     * @param {CeturbStorage} ceturbStorage
     */
    constructor( private $scope: IScope,
        private $state: angular.ui.IStateService,
        private ceturbApiService: CeturbApiService,
        private ceturbStorage: CeturbStorage ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * 
     * 
     * 
     * @memberOf BusLinesController
     */
    public activate(): void {
        this.filter = '';
        this.getLines();
    }

    /**
     * 
     * 
     * 
     * @memberOf BusLinesController
     */
    public getLines(): void {
        this.ceturbApiService.getLines()
            .then( lines => {
                this.filteredLines = this.lines = lines.map( line => {
                    line.isFavorite = this.ceturbStorage.isFavoriteLine( line.number );
                    return line;
                });
                return this.lines;
            });
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
     * @param {string} filter
     */
    public filterLines( filter: string ): void {
        let upperFilter = this.stripAccents( filter.trim().toUpperCase() );
        this.filteredLines = this.lines.filter( line => {
            let name = this.stripAccents( line.name.toUpperCase() );
            return name.includes( upperFilter ) || line.number.includes( upperFilter );
        });
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
    private stripAccents( s ) {
        if ( !s ) { return ''; }
        let ret = '';
        for ( let i = 0; i < s.length; i++ ) {
            ret += this.accentMap[ s.charAt( i ) ] || s.charAt( i );
        }
        return ret;
    };
}
