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
    public get favoriteLinesKey() {
        return `user-${this.authenticationService.user.cpf}-lines`;  // sub é o id do usuário logado
    }


    /**
     * 
     * 
     * @readonly
     * @type {BusLine[]}
     */
    private get favoriteLines(): string[] {
        this.$localStorage[ this.favoriteLinesKey ] = this.$localStorage[ this.favoriteLinesKey ] || [];
        return this.$localStorage[ this.favoriteLinesKey ] as string[];
    }

    /**
     * 
     */
    private set favoriteLines( lines: string[] ) {
        this.$localStorage[ this.favoriteLinesKey ] = lines;
    }

    /**
     * 
     * 
     * @param {BusLine} line
     * @returns {boolean}
     */
    public isFavoriteLine( lineNumber: string ): boolean {
        return this.favoriteLines.indexOf(lineNumber) !== -1;
    }

    /**
     * 
     * 
     * @param {BusLine} line
     * @returns {BusLine[]}
     */
    public addToFavoriteLines( lineNumber: string ): string[] {
        this.favoriteLines.push( lineNumber );
        return this.favoriteLines;
    }

    /**
     * 
     * 
     * @param {BusLine} line
     * @returns {BusLine[]}
     */
    public removeFromFavoriteLines( lineNumber: string ): string[] {
        this.favoriteLines = this.favoriteLines.filter( l => l !== lineNumber );
        return this.favoriteLines;
    }
}
