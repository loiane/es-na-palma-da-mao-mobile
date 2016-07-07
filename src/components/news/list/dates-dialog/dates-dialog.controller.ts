class DatesDialogController {

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

DatesDialogController.$inject = ['$mdDialog'];

export default DatesDialogController;


