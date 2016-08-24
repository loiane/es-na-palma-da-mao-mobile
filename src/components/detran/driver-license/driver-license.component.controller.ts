import moment from 'moment';
import { IScope, IPromise } from 'angular';
import { DriverLicense, DriverLicenseStorage, DetranApiService } from '../shared/index';
import imgLicense  from '../../shared/img/CNH_Frente.png!image';
import registerLicenseTemplate from './add-license/add-license.html';
import { AddLicenseController } from './add-license/add-license.controller';

/**
 * @class DriverLicenseController
 */
export class DriverLicenseController {

    public static $inject: string[] = [ '$scope', '$state', '$ionicLoading', 'detranApiService', 'detranStorage', '$mdDialog' ];

    private imgLicense: string;

    /**
     * Creates an instance of DriverLicenseController.
     * 
     * @param {IScope} $scope
     * @param {angular.ui.IStateService} $state
     * @param {ionic.loading.IonicLoadingService} $ionicLoading
     * @param {DetranApiService} detranApiService
     * @param {DriverLicenseStorage} driverLicenseStorage
     * @param {angular.material.IDialogService} $mdDialog
     */
    constructor( private $scope: IScope,
                 private $state: angular.ui.IStateService,
                 private $ionicLoading: ionic.loading.IonicLoadingService,
                 private detranApiService: DetranApiService,
                 private driverLicenseStorage: DriverLicenseStorage,
                 private $mdDialog: angular.material.IDialogService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }


    /**
     * 
     */
    public activate(): void {
        this.imgLicense = imgLicense.src;
        if ( this.hasDriverLicense ) {
            this.navigateTo( 'app.driverLicenseStatus' );
        }
    }

    /**
     * 
     */
    public registerLicense(): void {
        this.$mdDialog.show( {
            controller: AddLicenseController,
            template: registerLicenseTemplate,
            bindToController: true,
            controllerAs: 'vm',
            locals: this.driverLicenseStorage.driverLicense || {}
        } )
        .then( ( license: DriverLicense ) => {
            this.$ionicLoading.show();
            this.detranApiService.saveLicense( license )
                .then( ( data ) => {
                    this.driverLicenseStorage.driverLicense = license;
                    this.navigateTo('app.driverLicenseStatus');
                })
                .finally( () => this.$ionicLoading.hide() );
        } );
    }

    /**
     * 
     * @readonly
     * @type {boolean}
     */
    public get hasDriverLicense(): boolean {
        return this.driverLicenseStorage.hasDriverLicense;
    }

    /**
     * 
    */
    public navigateTo( state: string ) {
        this.$state.go( state );
    }
}
