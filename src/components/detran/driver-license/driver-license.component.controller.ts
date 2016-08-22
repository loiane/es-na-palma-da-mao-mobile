import moment from 'moment';
import { IScope, IPromise } from 'angular';
import { DriverLicense, DriverLicenseStorage, DetranApiService } from '../shared/index';
import imgCNH  from '../../shared/img/RG_Verso.png!image';


/**
 * @class DriverLicenseController
 */
export class DriverLicenseController {

    public static $inject: string[] = [ '$scope', '$state', 'detranApiService', 'detranStorage' ];
    private imgCNH: string;

    /**
     * Creates an instance of DriverLicenseController.
     * 
     * @param {IScope} $scope
     * @param {angular.ui.IStateService} $state
     * @param {DetranApiService} detranApiService
     * @param {DriverLicenseStorage} driverLicenseStorage
     */
    constructor( private $scope: IScope,
                 private $state: angular.ui.IStateService,
                 private detranApiService: DetranApiService,
                 private driverLicenseStorage: DriverLicenseStorage ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }


    /**
     * 
     */
    public activate(): void {
        this.imgCNH = imgCNH.src;
        if ( this.hasDriverLicense ) {
            this.navigateTo( 'app.driverLicenseStatus' );
        }
    }

    /**
     * 
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
