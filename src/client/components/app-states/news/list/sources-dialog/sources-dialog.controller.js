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
     * @returns {boolean}
     */
    isIndeterminate() {
        return (this.selectedOrigins.length !== 0 && this.selectedOrigins.length !== this.availableOrigins.length);
    }

    /**
     *
     * @returns {boolean}
     */
    isChecked() {
        return this.selectedOrigins.length === this.availableOrigins.length;
    }

    /**
     *
     */
    toggleAll() {
        if ( this.isChecked() ) {
            this.selectedOrigins = [];
        } else if ( this.selectedOrigins.length === 0 || this.selectedOrigins.length > 0 ) {
            this.selectedOrigins = this.availableOrigins.slice( 0 );
        }
    };

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


