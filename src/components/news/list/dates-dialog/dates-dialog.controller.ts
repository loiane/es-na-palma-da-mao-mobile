class DatesDialogController {

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
    ok( dateMin, dateMax ) {
        this.$mdDialog.hide( {
            dateMin,
            dateMax
        } );
    }
}

export default ['$mdDialog', DatesDialogController];


