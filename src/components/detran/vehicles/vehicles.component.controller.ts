import { IScope } from 'angular';
import { Vehicle, VehicleStorage, DetranApiService, VehicleInfo } from '../shared/index';
import { DialogService, ToastService } from '../../shared/index';

import addVehicleTemplate from './add-vehicle/add-vehicle.html';
import { AddVehicleController } from './add-vehicle/add-vehicle.controller';

/**
 * 
 * 
 * @export
 * @class VehiclesController
 */
export class VehiclesController {

    public static $inject: string[] = [ '$scope', '$mdDialog', '$state', 'detranApiService', 'toast', 'dialog', 'detranStorage' ];

    public editing: boolean = false;

    /**
     * Creates an instance of VehiclesController.
     * 
     * @param {IScope} $scope
     * @param {angular.material.IDialogService} $mdDialog
     * @param {angular.ui.IStateService} $state
     * @param {DetranApiService} detranApiService
     * @param {ToastService} toast
     * @param {DialogService} dialog
     * @param {VehicleStorage} vehicleStorage
     * 
     * @memberOf VehiclesController
     */
    constructor( private $scope: IScope,
        private $mdDialog: angular.material.IDialogService,
        private $state: angular.ui.IStateService,
        private detranApiService: DetranApiService,
        private toast: ToastService,
        private dialog: DialogService,
        private vehicleStorage: VehicleStorage ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     * 
     */
    public activate(): void { }


    /**
     * 
     * 
     * @readonly
     * @type {Vehicle[]}
     * @memberOf VehiclesController
     */
    public get vehicles(): Vehicle[] {
        return this.vehicleStorage.vehicles;
    }

    /**
     * 
     * 
     * @param {Vehicle} vehicle
     */
    public openRemoveVehicleModal( vehicle: Vehicle ) {
        this.dialog.confirm( { title: `Deseja remover o veículo com placa: ${vehicle.plate}?` })
            .then(() => this.removeVehicle( vehicle ) );
    }

    /**
     * 
     * 
     * @param {Vehicle} vehicle
     * 
     * @memberOf VehiclesController
     */
    public removeVehicle( vehicle: Vehicle ) {
        if ( !this.editing ) {
            return;
        }

        let vehicles = this.vehicleStorage.removeVehicle( vehicle );

        // sai do modo de edição se não resta nenhum veículo
        if ( !vehicles.length ) {
            this.editing = false;
        }
    }

    /**
     * 
     */
    public openAddVehicleModal(): void {
        this.$mdDialog.show( {
            controller: AddVehicleController,
            template: addVehicleTemplate,
            bindToController: true,
            controllerAs: 'vm'
        })
            .then(( vehicle: Vehicle ) => this.addVehicle( vehicle ) );
    }


    /**
     * 
     * 
     * @param {Vehicle} vehicle
     * @returns
     * 
     * @memberOf VehiclesController
     */
    public addVehicle( vehicle: Vehicle ) {
        if ( this.vehicleStorage.existsVehicle( vehicle ) ) {
            this.toast.error( { title: 'Placa ou RENAVAM já cadastrado(s)' }); return;
        }

        this.detranApiService
            .getVehicleInfo( vehicle )
            .then(( info: VehicleInfo ) => {
                vehicle.info = info;
                this.vehicleStorage.addVehicle( vehicle );
                return vehicle;
            })
            .catch(( error ) => {
                // Caso o veículo não exista 404
                if ( error.status === 404 ) {
                    this.toast.error( { title: 'Veículo não encontrado na base do DETRAN.' }); return;
                } else {
                    this.toast.error( { title: 'Erro ao salvar veículo. Tente novamente' }); return;
                }
            });
    }

    /**
     * 
     */
    public viewTickets( vehicle: Vehicle ) {
        this.$state.go( 'app.vehicleTickets/:plate/:renavam', vehicle );
    }
}
