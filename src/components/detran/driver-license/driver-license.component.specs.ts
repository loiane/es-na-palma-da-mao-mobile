/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */
import DriverLicenseComponent from './driver-license.component';
import DriverLicenseTemplate from './driver-license.component.html';
import { DriverLicenseController } from './driver-license.component.controller';

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
        let controller: DriverLicenseController;
        let $scope;
        let $state;
        let $ionicHistory;
        let $mdDialog;
        let $ionicNativeTransitions;
        let detranApiService;
        let onIonicBeforeEnterEvent;
        let driverLicenseStorage;

        beforeEach( () => {
            $scope = {
                $on: ( event, callback ) => {
                    if ( event === '$ionicView.beforeEnter' ) {
                        onIonicBeforeEnterEvent = callback;
                    }
                }
            };

            $mdDialog = sandbox.stub();
            $state = sandbox.stub();
            $ionicHistory = sandbox.stub();
            $ionicNativeTransitions = sandbox.stub();
            driverLicenseStorage = {
                hasDriverLicense: false
            };
            detranApiService = {
                getDriverData: sandbox.stub().returnsPromise(),
                getDriverTickets: sandbox.stub().returnsPromise()
            };


            controller = new DriverLicenseController( $scope, $state, $ionicHistory, $ionicNativeTransitions, detranApiService, driverLicenseStorage, $mdDialog );
        } );

        describe( 'on instantiation', () => {
            it( 'should activate on $ionicView.beforeEnter event', () => {
                sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                onIonicBeforeEnterEvent();

                expect( controller.activate.calledOnce ).to.be.true;
            } );
        } );

        describe( 'activate()', () => {
            beforeEach( () => {
                controller.activate();
            } );

            // it( 'should call getDriverData()', () => {
            //     expect( controller.getDriverData.calledOnce ).to.be.true;
            // } );
        } );

        describe( 'hasDriverLicense()', () => {
            it( 'should reflect driverLicenseStorage.hasDriverLicense', () => {
                driverLicenseStorage.hasDriverLicense = false;
                expect( controller.hasDriverLicense ).to.equal( driverLicenseStorage.hasDriverLicense );

                driverLicenseStorage.hasDriverLicense = true;
                expect( controller.hasDriverLicense ).to.equal( driverLicenseStorage.hasDriverLicense );
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
