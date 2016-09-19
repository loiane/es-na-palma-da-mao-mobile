import { ToastService } from '../../../shared/toast/index';
import { Vehicle } from '../../shared/index';

export class AddVehicleController {

    public static $inject: string[] = [ '$mdDialog', 'toast' ];

    /**
     * Creates an instance of AddVehicleController.
     * 
     * @param {angular.material.IDialogService} $mdDialog
     * @param {ToastService} toast
     * 
     * @memberOf AddVehicleController
     */
    constructor( private $mdDialog: angular.material.IDialogService,
        private toast: ToastService ) {
    }

    /**
     * 
     */
    public cancel() {
        this.$mdDialog.cancel();
    }

    /**
     * 
     * 
     * @param {string} plate
     * @param {string} renavam
     * @returns
     */
    public ok( plate: string, renavam: string ) {

        if ( !plate ) {
            this.toast.info( { title: 'Placa é obrigatória' }); return;
        }

        if ( !renavam ) {
            this.toast.info( { title: 'RENAVAM é obrigatório' }); return;
        }

        let vehicle: Vehicle = {
            plate: this.normalize( plate ),
            renavam: this.normalize( renavam )
        };

        this.$mdDialog.hide( vehicle );
    }

    /**
     * 
     * 
     * @private
     * @param {string} plateOrRenavam
     * @returns
     * 
     * @memberOf AddVehicleController
     */
    private normalize( plateOrRenavam: string ) {
        return plateOrRenavam.toUpperCase().trim().replace( / /g, '' ).replace( '-', '' );
    }
}
