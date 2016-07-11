/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */

import DriverLicenseStatusController from './driver-license-status.component.controller.js';
import DriverLicenseStatusComponent from './driver-license-status.component.js';
import DriverLicenseStatusTemplate from './driver-license-status.component.html!text';

let expect = chai.expect;


/**
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( 'DriverLicenseStatus', () => {

    let sandbox;

    beforeEach( () => {
        sandbox = sinon.sandbox.create();
    } );

    afterEach( () => {
        sandbox.restore();
    } );

    describe( 'Module', () => {
        // test things about the component module
        // checking to see if it registers certain things and what not
        // test for best practices with naming too
        // test for routing

        it( 'Module', () => {
        } );
    } );

    describe( 'Controller', () => {
        let controller;
        let $scope;
        let detranApiService;

        beforeEach( () => {
            $scope = {
                $on: ( event, callback ) => {
                    if ( event === '$ionicView.beforeEnter' ) {
                        onIonicBeforeEnterEvent = callback;
                    }
                }
            };

            detranApiService = {
                getDriverLicenseData: sandbox.stub().returnsPromise(),
                getTickets: sandbox.stub().returnsPromise(),
                getAdministrativeCharges: sandbox.stub().returnsPromise(),
                getDriverLicenseProcess: sandbox.stub().returnsPromise()
            };

            controller = new DriverLicenseStatusController( $scope, detranApiService );
        } );

    } );

    describe( 'Component', () => {
        // test the component/directive itself
        let component = DriverLicenseStatusComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( DriverLicenseStatusController );
        } );

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( DriverLicenseStatusTemplate );
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
