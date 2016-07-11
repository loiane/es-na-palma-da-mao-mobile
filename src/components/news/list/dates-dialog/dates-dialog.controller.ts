class DatesDialogController {

    static $inject: string[] = [ '$mdDialog' ];

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

export default DatesDialogController;


