/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */
import DriverLicenseComponent from './driver-license.component';
import DriverLicenseTemplate from './driver-license.component.html';
import registerLicenseTemplate from '../shared/add-license/add-license.html';
import { AddLicenseController } from '../shared/add-license/add-license.controller';
import { DriverLicenseController } from './driver-license.component.controller';
import { DriverLicense, DriverLicenseStorage, DetranApiService } from '../shared/index';
import imgDriverLicense from './img/cnh-frente.png!image';

let expect = chai.expect;

/**
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( 'Detran/driver-license', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach( () => sandbox = sinon.sandbox.create() );
    afterEach( () => sandbox.restore() );

    describe( 'Controller', () => {

        let $scope;
        let $state;
        let $ionicHistory;
        let $mdDialog;
        let $ionicNativeTransitions;
        let onIonicBeforeEnterEvent;
        let detranApiService: DetranApiService;
        let controller: DriverLicenseController;
        let driverLicenseStorage: DriverLicenseStorage;

        beforeEach( () => {
            $scope = {
                $on: ( event, callback ) => {
                    if ( event === '$ionicView.beforeEnter' ) {
                        onIonicBeforeEnterEvent = callback;
                    }
                }
            };

            $mdDialog = { show() {} };
            $state = sandbox.stub();
            $ionicHistory = sandbox.stub();
            $ionicNativeTransitions = sandbox.stub();
            driverLicenseStorage = <DriverLicenseStorage>{
                hasDriverLicense: false
            };
            detranApiService = <DetranApiService><any>{
                getDriverData() {},
                getDriverTickets() {},
                saveLicense() {}
            };
            controller = new DriverLicenseController( $scope, $state, $ionicHistory, $ionicNativeTransitions, detranApiService, driverLicenseStorage, $mdDialog );
        } );

        describe( 'on instantiation', () => {
            it( 'should activate on $ionicView.beforeEnter event', () => {
                let activate = sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                onIonicBeforeEnterEvent();

                expect( activate.calledOnce ).to.be.true;
            } );

            it( 'imgLicense should be "undefined"', () => {
                expect( controller.imgLicense ).to.be.undefined;
            } );
        } );

        describe( 'activate()', () => {
            it( 'imgLicense === imgDriverLicense.src', () => {
                 controller.activate();
                 expect( controller.imgLicense ).to.be.equal( imgDriverLicense.src );
            } );

            it( 'should redirect to "app.driverLicenseStatus" if hasDriverLicense === true', () => {
                 let navigateTo = sandbox.stub( controller, 'navigateTo' );
                 driverLicenseStorage.hasDriverLicense = true;

                 controller.activate();

                 expect( navigateTo.calledWith( 'app.driverLicenseStatus' ) ).to.be.true;
            } );

            it( 'should not redirect to "app.driverLicenseStatus" if hasDriverLicense === false', () => {
                 let navigateTo = sandbox.stub( controller, 'navigateTo' );
                 driverLicenseStorage.hasDriverLicense = false;

                 controller.activate();

                 expect( navigateTo.notCalled ).to.be.true;
            } );
        } );

        describe( 'hasDriverLicense', () => {
            it( 'should reflect driverLicenseStorage.hasDriverLicense', () => {
                driverLicenseStorage.hasDriverLicense = false;
                expect( controller.hasDriverLicense ).to.equal( driverLicenseStorage.hasDriverLicense );

                driverLicenseStorage.hasDriverLicense = true;
                expect( controller.hasDriverLicense ).to.equal( driverLicenseStorage.hasDriverLicense );
            } );
        } );

         describe( 'registerLicense()', () => {
            let $mdDialogShow: Sinon.SinonStub;

            beforeEach( () => {
                $mdDialogShow = sandbox.stub( $mdDialog, 'show' );
                $mdDialogShow.returnsPromise();
            } );

            it( 'should open add license modal', () => {
                 driverLicenseStorage.driverLicense = { registerNumber: '234234343', ballot: '45345455' };
                 controller.registerLicense();

                 let spyCall = $mdDialogShow.getCall( 0 );

                 expect( spyCall.args[ 0 ].controller ).to.equal( AddLicenseController );
                 expect( spyCall.args[ 0 ].template ).to.equal( registerLicenseTemplate );
                 expect( spyCall.args[ 0 ].bindToController ).to.equal( true );
                 expect( spyCall.args[ 0 ].controllerAs ).to.equal( 'vm' );
                 expect( spyCall.args[ 0 ].locals ).to.deep.equal( driverLicenseStorage.driverLicense );
            } );

            describe( 'on driver license added', () => {
                let saveLicense: Sinon.SinonStub;
                let addedDriverLicense: DriverLicense;
                let navigateTo: Sinon.SinonStub;

                beforeEach( () => {
                    driverLicenseStorage.driverLicense = <DriverLicense>{};
                    navigateTo = sandbox.stub( controller, 'navigateTo' );
                    saveLicense = sandbox.stub( detranApiService, 'saveLicense' );
                    saveLicense.returnsPromise().resolves();
                    addedDriverLicense = { registerNumber: '00000000', ballot: '9999999' };
                    $mdDialogShow.returnsPromise().resolves( addedDriverLicense );
                } );

                it( 'should save new license on server', () => {
                    controller.registerLicense();
                    expect( saveLicense.calledWith( addedDriverLicense ) ).to.be.true;
                } );

                it( 'should save new license on local storage', () => {
                    controller.registerLicense();
                    expect( driverLicenseStorage.driverLicense ).to.be.deep.equal( addedDriverLicense );
                } );

                it( 'should reload screen', () => {
                    controller.registerLicense();
                    expect( navigateTo.calledWith( 'app.driverLicenseStatus' ) ).to.be.true;
                } );
            } );
        } );
    } );

    describe( 'Component', () => {
        let component = DriverLicenseComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( DriverLicenseController );
        } );

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( DriverLicenseTemplate );
        } );

        it( 'should use controllerAs', () => {
            expect( component ).to.have.property( 'controllerAs' );
        } );

        it( 'should use controllerAs "vm"', () => {
            expect( component.controllerAs ).to.equal( 'vm' );
        } );

        it( 'should use bindToController: true', () => {
            expect( component ).to.have.property( 'bindToController' );
            expect( component.bindToController ).to.equal( true );
        } );
    } );
} );
