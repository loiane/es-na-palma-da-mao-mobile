import { BusLine } from './models/index';
import { AuthenticationService } from '../../shared/authentication/index';

/**
 * 
 * 
 * @export
 * @class CeturbStorage
 */
export class CeturbStorage {

    public static $inject: string[] = [ '$localStorage', 'authenticationService' ];

    /**
     * Creates an instance of CeturbStorage.
     * 
     * @param {*} $localStorage
     * @param {AuthenticationService} authenticationService
     */
    constructor( private $localStorage: any,
        private authenticationService: AuthenticationService ) {
    }

    /**
     * 
     */
    private get favoriteLinesKey() {
        return `user-${this.authenticationService.user.cpf}-lines`;  // sub é o id do usuário logado
    }


    /**
     * 
     * 
     * @readonly
     * @type {BusLine[]}
     */
    private get favoriteLines(): BusLine[] {
        this.$localStorage[ this.favoriteLinesKey ] = this.$localStorage[ this.favoriteLinesKey ] || [];
        return this.$localStorage[ this.favoriteLinesKey ] as BusLine[];
    }

    /**
     * 
     */
    private set favoriteLines( lines: BusLine[] ) {
        this.$localStorage[ this.favoriteLinesKey ] = lines;
    }


    /**
     * 
     * 
     * @param {BusLine} line
     * @returns {boolean}
     */
    public isFavoriteLine( line: BusLine ): boolean {
        return this.favoriteLines
            .map( v => v.number )
            .indexOf( line.number ) !== -1;
    }

    /**
     * 
     * 
     * @param {BusLine} line
     * @returns {BusLine[]}
     */
    public addToFavoriteLines( line: BusLine ): void {
        this.favoriteLines.push( line );
    }

    /**
     * 
     * 
     * @param {BusLine} line
     * @returns {BusLine[]}
     */
    public removeFromFavoriteLines( line: BusLine ): void {
        this.favoriteLines = this.favoriteLines.filter( l => l.number !== line.number );
    }
}
