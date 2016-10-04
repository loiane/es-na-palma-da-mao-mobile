import { IScope } from 'angular';
import { DriverLicense, DriverLicenseStorage, DetranApiService } from '../shared/index';
import imgDriverLicense from './img/cnh-frente.png!image';
import registerLicenseTemplate from '../shared/add-license/add-license.html';
import { AddLicenseController } from '../shared/add-license/add-license.controller';

/**
 * @class DriverLicenseController
 */
export class DriverLicenseController {

    public static $inject: string[] = [ '$scope', '$state', '$ionicHistory', '$ionicNativeTransitions', 'detranApiService', 'detranStorage', '$mdDialog' ];

    public imgLicense: string;

    /**
     * Creates an instance of DriverLicenseController.
     * 
     * @param {IScope} $scope
     * @param {angular.ui.IStateService} $state
     * @param {any} $ionicHistory
     * @param {any} $ionicNativeTransitions
     * @param {DetranApiService} detranApiService
     * @param {DriverLicenseStorage} driverLicenseStorage
     * @param {angular.material.IDialogService} $mdDialog
     */
    constructor( private $scope: IScope,
        private $state: angular.ui.IStateService,
        private $ionicHistory,
        public $ionicNativeTransitions,
        private detranApiService: DetranApiService,
        private driverLicenseStorage: DriverLicenseStorage,
        private $mdDialog: angular.material.IDialogService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }


    /**
     * 
     */
    public activate(): void {
        this.imgLicense = imgDriverLicense.src;
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
            locals: {
                registerNumber: Number( this.driverLicenseStorage.driverLicense.registerNumber ),
                ballot: Number( this.driverLicenseStorage.driverLicense.ballot )
            }
        })
            .then(( license: DriverLicense ) => {
                this.detranApiService.saveLicense( license )
                    .then(() => {
                        this.driverLicenseStorage.driverLicense = license;
                        this.navigateTo( 'app.driverLicenseStatus' );
                        return license;
                    });
            });
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
    public navigateTo( stateName: string ) {
        this.$ionicHistory.nextViewOptions( {
            disableBack: true,
            historyRoot: true
        });

        if ( this.$ionicNativeTransitions ) {
            this.$ionicNativeTransitions.stateGo( stateName, {}, { type: 'slide', direction: 'up' });
        } else {
            this.$state.go( stateName );
        }
    }
}
