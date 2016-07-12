/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */
import moment from 'moment';
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

    let defaultExpirationDate = new Date( new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDay(), 0, 0, 0, 0 );

    let driverDataOk = {
        acquiringLicense: 'false',
        blockMotive: '',
        expirationDate: defaultExpirationDate,
        hasAdministrativeIssues: 'false',
        hasTickets: 'true',
        status: '0'
    };

    let driverDataBlocked = {
        acquiringLicense: 'false',
        blockMotive: '',
        expirationDate: defaultExpirationDate,
        hasAdministrativeIssues: 'false',
        hasTickets: 'true',
        status: '1'
    };

    let driverDataExpired = {
        acquiringLicense: 'false',
        blockMotive: '',
        expirationDate: moment().subtract( 1, 'months' ).subtract( 1, 'days' ),
        hasAdministrativeIssues: 'false',
        hasTickets: 'true',
        status: '0'
    };

    let driverDataExpiring = {
        acquiringLicense: 'false',
        blockMotive: '',
        expirationDate: moment().subtract( 1, 'months' ),
        hasAdministrativeIssues: 'false',
        hasTickets: 'true',
        status: '0'
    };

    let tickets = [ {
        classification: 'MÉDIA',
        date: moment().subtract( 1, 'months' ),
        description: 'ESTACIONAR O VEÍCULO EM LOCAIS E HORÁRIOS PROIBIDOS ESPECIFICAMENTE PELA SINALIZAÇÃO (PLACA - PROIBIDO ESTACIONAR).',
        district: 'VITORIA',
        place: 'R. DR. MOACYR GONCALVES',
        plate: 'MQH9400',
        points: '4',
        warning: 'false'
    },
        {
            classification: 'MÉDIA',
            date: moment().subtract( 1, 'months' ),
            description: 'ESTACIONAR O VEÍCULO EM LOCAIS E HORÁRIOS PROIBIDOS ESPECIFICAMENTE PELA SINALIZAÇÃO (PLACA - PROIBIDO ESTACIONAR).',
            district: 'VITORIA',
            place: 'R. DR. MOACYR GONCALVES',
            plate: 'MQH9400',
            points: '7',
            warning: 'false'
        },
        {
            classification: 'MÉDIA',
            date: moment().subtract( 1, 'months' ),
            description: 'ESTACIONAR O VEÍCULO EM LOCAIS E HORÁRIOS PROIBIDOS ESPECIFICAMENTE PELA SINALIZAÇÃO (PLACA - PROIBIDO ESTACIONAR).',
            district: 'VITORIA',
            place: 'R. DR. MOACYR GONCALVES',
            plate: 'MQH9400',
            points: '2',
            warning: 'false'
        },
        {
            classification: 'MÉDIA',
            date: moment().subtract( 2, 'years' ),
            description: 'ESTACIONAR O VEÍCULO EM LOCAIS E HORÁRIOS PROIBIDOS ESPECIFICAMENTE PELA SINALIZAÇÃO (PLACA - PROIBIDO ESTACIONAR).',
            district: 'VITORIA',
            place: 'R. DR. MOACYR GONCALVES',
            plate: 'MQH9400',
            points: '5',
            warning: 'false'
        } ];

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
        let onIonicBeforeEnterEvent;

        beforeEach( () => {
            $scope = {
                $on: ( event, callback ) => {
                    if ( event === '$ionicView.beforeEnter' ) {
                        onIonicBeforeEnterEvent = callback;
                    }
                }
            };

            detranApiService = {
                getDriverData: sandbox.stub().returnsPromise(),
                getTickets: sandbox.stub().returnsPromise(),
                getAdministrativeCharges: sandbox.stub().returnsPromise(),
                getDriverLicenseProcess: sandbox.stub().returnsPromise()
            };

            controller = new DriverLicenseStatusController( $scope, detranApiService );
        } );

        describe( 'on instanciation', () => {
            it( 'should activate on $ionicView.beforeEnter event', () => {
                sandbox.stub( controller, 'activate' );// replace original activate

                // simulates ionic before event trigger
                onIonicBeforeEnterEvent();

                expect( controller.activate.called ).to.be.true;
            } );

            it( 'should call reset', () => {
                expect( controller.reset ).to.be.called;
            } );
        } );

        describe( 'reset()', () => {
            beforeEach( () => {
                controller.reset();
            } );

            it( 'should have selectedIndex == -1', () => {
                expect( controller.selectedIndex ).to.be.equal( -1 );
            } );

            it( 'should have an undefined driverData', () => {
                expect( controller.driverData ).to.be.undefined;
            } );

            it( 'should have an empty array of tickets', () => {
                expect( controller.tickets ).to.be.empty;
            } );

            it( 'should have false driverDataPopulated', () => {
                expect( controller.driverDataPopulated ).to.be.false;
            } );

            it( 'should have false ticketsPopulated', () => {
                expect( controller.ticketsPopulated ).to.be.false;
            } );
        } );

        describe( 'activate()', () => {
            beforeEach( () => {
                detranApiService.getDriverData.resolves();
                detranApiService.getTickets.resolves();
                controller.activate();
            } );

            it( 'should call getDriverData()', () => {
                expect( controller.getDriverData ).to.be.called;
            } );

            it( 'should have driverDataPopulated true', () => {
                expect( controller.driverDataPopulated ).to.be.true;
            } );

            it( 'should call getTickets()', () => {
                expect( controller.getTickets ).to.be.called;
                expect( controller.ticketsPopulated ).to.be.true;
            } );

            it( 'should have driverDataPopulated true', () => {
                expect( controller.ticketsPopulated ).to.be.true;
            } );
        } );

        describe( 'Get Methods', () => {
            beforeEach( () => {
                detranApiService.getDriverData.resolves( driverDataOk );
                detranApiService.getTickets.resolves( tickets );
            } );

            describe( 'hasData()', () => {
                it( 'should return true if has driverData', () => {
                    controller.getDriverData();
                    expect( controller.hasData ).to.be.true;
                } );

                it( 'should return false if has no driverData', () => {
                    detranApiService.getDriverData.rejects();
                    controller.getDriverData();
                    expect( controller.hasData ).to.be.false;
                } );
            } );

            describe( 'licenseOk()', () => {
                it( 'should return true if has driverData and status == 0', () => {
                    controller.getDriverData();
                    expect( controller.licenseOk ).to.be.true;
                } );

                it( 'should return false if has driverData and status == 1', () => {
                    detranApiService.getDriverData.resolves( driverDataBlocked );
                    controller.getDriverData();
                    expect( controller.licenseOk ).to.be.false;
                } );

                it( 'should return false if has no driverData', () => {
                    detranApiService.getDriverData.rejects();
                    controller.getDriverData();
                    expect( controller.licenseOk ).to.be.false;
                } );
            } );

            describe( 'licenseBlocked()', () => {
                it( 'should return true if has driverData and status == 1', () => {
                    detranApiService.getDriverData.resolves( driverDataBlocked );
                    controller.getDriverData();
                    expect( controller.licenseBlocked ).to.be.true;
                } );

                it( 'should return false if has driverData and status == 0', () => {
                    controller.getDriverData();
                    expect( controller.licenseBlocked ).to.be.false;
                } );

                it( 'should return false if has no driverData', () => {
                    detranApiService.getDriverData.rejects();
                    controller.getDriverData();
                    expect( controller.licenseBlocked ).to.be.false;
                } );
            } );

            describe( 'licenseExpired()', () => {
                it( 'should return true if has driverData and it\'s expired (1 month after expiration date)', () => {
                    detranApiService.getDriverData.resolves( driverDataExpired );
                    controller.getDriverData();
                    expect( controller.licenseExpired ).to.be.true;
                } );

                it( 'should return false if has driverData and it\'s not expired', () => {
                    detranApiService.getDriverData.resolves( driverDataOk );
                    controller.getDriverData();
                    expect( controller.licenseExpired ).to.be.false;
                } );

                it( 'should return false if has no driverData', () => {
                    detranApiService.getDriverData.rejects();
                    controller.getDriverData();
                    expect( controller.licenseExpired ).to.be.false;
                } );
            } );

            describe( 'licenseRenew()', () => {
                it( 'should return true if has driverData and it\'s past expiration date no more than 1 month', () => {
                    detranApiService.getDriverData.resolves( driverDataExpiring );
                    controller.getDriverData();
                    expect( controller.licenseRenew ).to.be.true;
                } );

                it( 'should return false if has driverData and it\'s not past expiration date', () => {
                    detranApiService.getDriverData.resolves( driverDataOk );
                    controller.getDriverData();
                    expect( controller.licenseRenew ).to.be.false;
                } );

                it( 'should return true if has driverData and it\'s past expiration date more than 1 month', () => {
                    detranApiService.getDriverData.resolves( driverDataExpired );
                    controller.getDriverData();
                    expect( controller.licenseRenew ).to.be.false;
                } );

                it( 'should return false if has no driverData', () => {
                    detranApiService.getDriverData.rejects();
                    controller.getDriverData();
                    expect( controller.licenseRenew ).to.be.false;
                } );
            } );

            describe( 'expirationDate()', () => {
                it( 'should return expiration date if has driver data', () => {
                    controller.getDriverData();
                    expect( controller.expirationDate ).to.be.deep.equal( moment( defaultExpirationDate ) );
                } );

                it( 'should return undefined if has no driverData', () => {
                    detranApiService.getDriverData.rejects();
                    controller.getDriverData();
                    expect( controller.expirationDate ).to.be.undefined;
                } );
            } );

            describe( 'hasTickets()', () => {
                it( 'should return true if has tickets', () => {
                    controller.getTickets();
                    expect( controller.hasTickets ).to.be.true;
                } );

                it( 'should return false if has no tickets', () => {
                    detranApiService.getTickets.resolves( [] );
                    controller.getTickets();
                    expect( controller.hasTickets ).to.be.false;
                } );

                it( 'should return false if error', () => {
                    detranApiService.getTickets.rejects();
                    controller.getTickets();
                    expect( controller.hasTickets ).to.be.false;
                } );
            } );

            describe( 'last12MonthsPoints()', () => {
                it( 'should return sum of points in last year tickets', () => {
                    controller.getTickets();
                    expect( controller.last12MonthsPoints ).to.be.equal( 13 );
                } );

                it( 'should return 0 if has no tickets', () => {
                    detranApiService.getTickets.resolves( [] );
                    controller.getTickets();
                    expect( controller.last12MonthsPoints ).to.be.equal( 0 );
                } );

                it( 'should return 0 if error', () => {
                    detranApiService.getTickets.rejects();
                    controller.getTickets();
                    expect( controller.last12MonthsPoints ).to.be.equal( 0 );
                } );
            } );

            describe( 'classificationClass( value )', () => {
                it( 'should return correct class name by value', () => {
                    expect( controller.classificationClass( 'leve' ) ).to.be.equal( 'bg-green' );
                    expect( controller.classificationClass( 'média' ) ).to.be.equal( 'bg-yellow' );
                    expect( controller.classificationClass( 'grave' ) ).to.be.equal( 'bg-red' );
                    expect( controller.classificationClass( 'gravíssima' ) ).to.be.equal( 'bg-black' );
                } );

                it( 'should return undefined if unable to find value', () => {
                    expect( controller.classificationClass( 'asdf' ) ).to.be.undefined;
                } );
            } );

            describe( 'showDetails( $index )', () => {
                it( 'should set selectedIndex property with $index value', () => {
                    controller.showDetails( 1 );
                    expect( controller.selectedIndex ).to.be.equal( 1 );
                } );

                it( 'should set selectedIndex to -1 if it has the same value as $index', () => {
                    controller.showDetails( 1 );
                    controller.showDetails( 1 );
                    expect( controller.selectedIndex ).to.be.equal( -1 );
                } );
            } );

            describe( 'getDriverData()', () => {
                beforeEach( () => {
                    detranApiService.getDriverData.resolves( driverDataOk );
                    controller.getDriverData();
                } );

                it( 'should call detran api method', () => {
                    expect( detranApiService.getDriverData ).to.be.called;
                } );

                it( 'should populate driverData property', () => {
                    expect( controller.driverData ).to.not.be.undefined;
                } );

                it( 'should not populate driverData property on error', () => {
                    controller.driverData = undefined;
                    detranApiService.getDriverData.rejects();
                    controller.getDriverData();
                    expect( controller.driverData ).to.be.undefined;
                } );
            } );

            describe( 'getTickets()', () => {
                beforeEach( () => {
                    detranApiService.getTickets.resolves( tickets );
                    controller.getTickets();
                } );

                it( 'should call detran api method', () => {
                    expect( detranApiService.getTickets ).to.be.called;
                } );

                it( 'should populate tickets property', () => {
                    expect( controller.tickets ).to.not.be.equal( [] );
                } );

                it( 'should not populate tickets property on error', () => {
                    controller.tickets = [];
                    detranApiService.getTickets.rejects();
                    controller.getTickets();
                    expect( controller.tickets ).to.be.deep.equal( [] );
                } );
            } );
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
