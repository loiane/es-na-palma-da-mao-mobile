class DatesDialogController {

    public static $inject: string[] = [ '$mdDialog' ];

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
    public ok( dateMin, dateMax ) {
        this.$mdDialog.hide( {
            dateMin,
            dateMax
        } );
    }
}

export default DatesDialogController;


