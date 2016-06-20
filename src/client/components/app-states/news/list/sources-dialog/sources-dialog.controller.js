class SourceController {

    /**
     * @constructor
     *
     * @param $mdDialog
     */
    constructor( $mdDialog ) {
        this.$mdDialog = $mdDialog;
    }

    /**
     *
     */
    cancel() {
        this.$mdDialog.cancel();
    }

    /**
     *
     */
    ok( selectedOrigins ) {
        this.$mdDialog.hide( selectedOrigins );
    }

    /**
     *
     * @param origin
     */
    toggle( origin, selectedOrigins ) {
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
    exists( origin, selectedOrigins ) {
        return selectedOrigins.indexOf( origin ) > -1;
    }
}

export default [ '$mdDialog', SourceController ];


