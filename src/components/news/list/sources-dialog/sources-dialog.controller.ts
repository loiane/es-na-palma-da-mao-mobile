class SourceController {

    public static $inject: string[] = ['$mdDialog'];

    private selectedOrigins: any[];
    private availableOrigins: any[];

    /**
     * @constructor
     *
     * @param $mdDialog
     */
    constructor( private $mdDialog ) {

    }

    /**
     *
     */
    public cancel() {
        this.$mdDialog.cancel();
    }

    /**
     *
     */
    public ok( selectedOrigins ) {
        this.$mdDialog.hide( {origins: selectedOrigins} );
    }

    /**
     *
     * @returns {boolean}
     */
    public isIndeterminate() {
        return ( this.selectedOrigins.length !== 0 && this.selectedOrigins.length !== this.availableOrigins.length );
    }

    /**
     *
     * @returns {boolean}
     */
    public isChecked() {
        return this.selectedOrigins.length === this.availableOrigins.length;
    }

    /**
     *
     */
    public toggleAll() {
        if ( this.isChecked() ) {
            this.selectedOrigins = [];
        } else if ( this.selectedOrigins.length === 0 || this.selectedOrigins.length > 0 ) {
            this.selectedOrigins = this.availableOrigins.slice( 0 );
        }
    }

    /**
     *
     * @param origin
     */
    public toggle( origin, selectedOrigins ) {
        let idx = selectedOrigins.indexOf( origin );
        if ( idx > -1 ) {
            selectedOrigins.splice( idx, 1 );
        } else {
            selectedOrigins.push( origin );
        }
    }

    /**
     *
     * @param origin
     * @returns {boolean}
     */
    public exists( origin, selectedOrigins ) {
        return selectedOrigins.indexOf( origin ) > -1;
    }
}

export default SourceController;


