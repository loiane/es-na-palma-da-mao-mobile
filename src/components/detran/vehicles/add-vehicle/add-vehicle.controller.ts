import { ToastService } from '../../../shared/toast/index';
import { VehicleStorage, DetranApiService, VehicleInfo, Vehicle } from '../../shared/index';

export class AddVehicleController {

    public static $inject: string[] = [ '$mdDialog', 'detranStorage', 'detranApiService', 'toast' ];

    /**
     * Creates an instance of AddVehicleController.
     * 
     * @param {angular.material.IDialogService} $mdDialog
     * @param {VehicleStorage} vehicleStorage
     * @param {ToastService} toast
     */
    constructor( private $mdDialog: angular.material.IDialogService,
        private vehicleStorage: VehicleStorage,
        private detranApiService: DetranApiService,
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
            this.toast.info( { title: 'Placa é obrigatória' } ); return;
        }

        if ( !renavam ) {
            this.toast.info( { title: 'RENAVAM é obrigatório' } ); return;
        }

        let vehicle: Vehicle = {
            plate: plate.toUpperCase(),
            renavam: renavam.toUpperCase()
        };

        if ( this.vehicleStorage.existsVehicle( vehicle ) ) {
            this.toast.error( { title: `Placa ou RENAVAM já cadastrado(s)` } ); return;
        }

        this.detranApiService
            .getVehicle( vehicle )
            .then(( data: VehicleInfo ) => {
                vehicle.info = data;
                this.$mdDialog.hide( vehicle );
                return vehicle;
            })
            .catch(( error ) => {
                // Caso o veículo não exista 404
                if ( error.status === 404 ) {
                    this.toast.error( { title: 'Veículo não encontrado' }); return;
                } else {
                    this.toast.error( { title: 'Erro ao salvar veículo' }); return;
                }
            });
    }
}
