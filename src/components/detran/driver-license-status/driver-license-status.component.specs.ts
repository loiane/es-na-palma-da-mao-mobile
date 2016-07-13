/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */
import moment from 'moment';
import DriverLicenseStatusController from './driver-license-status.component.controller';
import DriverLicenseStatusComponent from './driver-license-status.component';
import DriverLicenseStatusTemplate from './driver-license-status.component.html';
import {DriverData, Ticket, DriverStatus} from '../shared/models/index';

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

    let defaultExpirationDate = moment().add( 'year', 1 ).toDate();

    let driverDataOk: DriverData = {
        acquiringLicense: false,
        blockMotive: '',
        expirationDate: defaultExpirationDate,
        hasAdministrativeIssues: false,
        hasTickets: true,
        status: DriverStatus.Ok
    };

    let driverDataBlocked: DriverData = {
        acquiringLicense: false,
        blockMotive: '',
        expirationDate: defaultExpirationDate,
        hasAdministrativeIssues: false,
        hasTickets: true,
        status:  DriverStatus.Blocked
    };

    let driverDataExpired: DriverData = {
        acquiringLicense: false,
        blockMotive: '',
        expirationDate: moment().subtract( 1, 'months' ).subtract( 1, 'days' ).toDate(),
        hasAdministrativeIssues: false,
        hasTickets: true,
        status: DriverStatus.Ok
    };

    let driverDataExpiring: DriverData = {
        acquiringLicense: false,
        blockMotive: '',
        expirationDate: moment().subtract( 1, 'months' ).toDate(),
        hasAdministrativeIssues: false,
        hasTickets: true,
        status: DriverStatus.Ok
    };

    let tickets: Ticket[] = [ {
            classification: 'MÉDIA',
            date: moment().subtract( 1, 'months' ).toDate(),
            description: 'ESTACIONAR O VEÍCULO EM LOCAIS E HORÁRIOS PROIBIDOS ESPECIFICAMENTE PELA SINALIZAÇÃO (PLACA - PROIBIDO ESTACIONAR).',
            district: 'VITORIA',
            place: 'R. DR. MOACYR GONCALVES',
            plate: 'MQH9400',
            points: 4,
            warning: false
        },
        {
            classification: 'MÉDIA',
            date: moment().subtract( 1, 'months' ).toDate(),
            description: 'ESTACIONAR O VEÍCULO EM LOCAIS E HORÁRIOS PROIBIDOS ESPECIFICAMENTE PELA SINALIZAÇÃO (PLACA - PROIBIDO ESTACIONAR).',
            district: 'VITORIA',
            place: 'R. DR. MOACYR GONCALVES',
            plate: 'MQH9400',
            points: 7,
            warning: false
        },
        {
            classification: 'MÉDIA',
            date: moment().subtract( 1, 'months' ).toDate(),
            description: 'ESTACIONAR O VEÍCULO EM LOCAIS E HORÁRIOS PROIBIDOS ESPECIFICAMENTE PELA SINALIZAÇÃO (PLACA - PROIBIDO ESTACIONAR).',
            district: 'VITORIA',
            place: 'R. DR. MOACYR GONCALVES',
            plate: 'MQH9400',
            points: 2,
            warning: false
        },
        {
            classification: 'MÉDIA',
            date: moment().subtract( 2, 'years' ).toDate(),
            description: 'ESTACIONAR O VEÍCULO EM LOCAIS E HORÁRIOS PROIBIDOS ESPECIFICAMENTE PELA SINALIZAÇÃO (PLACA - PROIBIDO ESTACIONAR).',
            district: 'VITORIA',
            place: 'R. DR. MOACYR GONCALVES',
            plate: 'MQH9400',
            points: 5,
            warning: false
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
                sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                onIonicBeforeEnterEvent();

                expect( controller.activate.calledOnce ).to.be.true;
            } );

            it( 'should set selectedIndex to "-1"', () => {
                expect( controller.selectedIndex ).to.be.equal( -1 );
            } );

            it( 'should set driverData to "undefined"', () => {
                expect( controller.driverData ).to.be.undefined;
            } );

            it( 'should clear array of tickets', () => {
                expect( controller.tickets ).to.be.empty;
            } );
        } );

        describe( 'activate()', () => {
            beforeEach( () => {
                sandbox.stub( controller, 'getDriverData' );
                sandbox.stub( controller, 'getTickets' );
                controller.activate();
            } );

            it( 'should call getDriverData()', () => {
                expect( controller.getDriverData.calledOnce ).to.be.true;
            } );

            it( 'should call getTickets()', () => {
                expect( controller.getTickets.calledOnce ).to.be.true;
            } );
        } );

        describe( 'Get Methods', () => {
            beforeEach( () => {
                detranApiService.getDriverData.resolves( driverDataOk );
                detranApiService.getTickets.resolves( tickets );
            } );

            describe( 'driverDataPopulated()', () => {
                it( 'should return true if has driverData', () => {
                    controller.getDriverData().then( () => {
                        expect( controller.driverDataPopulated ).to.be.true;
                    } );
                } );

                it( 'should return false if has no driverData', () => {
                    detranApiService.getDriverData.resolves( undefined );
                    controller.getDriverData().then( () => {
                        expect( controller.driverDataPopulated ).to.be.false;
                    } );
                } );
            } );

            describe( 'licenseOk()', () => {
                it( 'should return true if has driverData and status === 0', () => {
                    controller.getDriverData().then( ( d ) => {
                        expect( controller.licenseOk ).to.be.true;
                     } );
                } );

                it( 'should return false if has driverData and status === 1', () => {
                    detranApiService.getDriverData.resolves( driverDataBlocked );
                    controller.getDriverData().then( () => {
                        expect( controller.licenseOk ).to.be.false;
                    } );
                } );

                it( 'should return false if has no driverData', () => {
                    detranApiService.getDriverData.rejects();
                    controller.getDriverData().then( () => {
                        expect( controller.licenseOk ).to.be.false;
                    } );
                } );
            } );

            describe( 'licenseBlocked()', () => {
                it( 'should return true if has driverData and status == 1', () => {
                    detranApiService.getDriverData.resolves( driverDataBlocked );
                    controller.getDriverData().then( () => {
                        expect( controller.licenseBlocked ).to.be.true;
                    } );
                } );

                it( 'should return false if has driverData and status == 0', () => {
                    controller.getDriverData().then( () => {
                         expect( controller.licenseBlocked ).to.be.false;
                    } );
                } );

                it( 'should return false if has no driverData', () => {
                    detranApiService.getDriverData.rejects();
                    controller.getDriverData().then( () => {
                        expect( controller.licenseBlocked ).to.be.false;
                    } );
                } );
            } );

            describe( 'licenseExpired()', () => {
                it( 'should return true if has driverData and it\'s expired (1 month after expiration date)', () => {
                    detranApiService.getDriverData.resolves( driverDataExpired );
                    controller.getDriverData().then( () => {
                        expect( controller.licenseExpired ).to.be.true;
                    } );
                } );

                it( 'should return false if has driverData and it\'s not expired', () => {
                    detranApiService.getDriverData.resolves( driverDataOk );
                    controller.getDriverData().then( () => {
                        expect( controller.licenseExpired ).to.be.false;
                    } );
                } );

                it( 'should return false if has no driverData', () => {
                    detranApiService.getDriverData.rejects();
                    controller.getDriverData().then( () => {
                        expect( controller.licenseExpired ).to.be.false;
                    } );
                } );
            } );

            describe( 'licenseRenew()', () => {
                it( 'should return true if has driverData and it\'s past expiration date no more than 1 month', () => {
                    detranApiService.getDriverData.resolves( driverDataExpiring );
                    controller.getDriverData().then( () => {
                        expect( controller.licenseRenew ).to.be.true;
                    } );
                } );

                it( 'should return false if has driverData and it\'s not past expiration date', () => {
                    detranApiService.getDriverData.resolves( driverDataOk );
                    controller.getDriverData().then( () => {
                        expect( controller.licenseRenew ).to.be.false;
                    } );
                } );

                it( 'should return true if has driverData and it\'s past expiration date more than 1 month', () => {
                    detranApiService.getDriverData.resolves( driverDataExpired );
                    controller.getDriverData().then( () => {
                        expect( controller.licenseRenew ).to.be.false;
                    } );
                } );

                it( 'should return false if has no driverData', () => {
                    detranApiService.getDriverData.rejects();
                    controller.getDriverData().then( () => {
                        expect( controller.licenseRenew ).to.be.false;
                    } );
                } );
            } );

            describe( 'expirationDate()', () => {
                it( 'should return expiration date if has driver data', () => {
                    controller.getDriverData().then( () => {
                        expect( controller.expirationDate ).to.be.deep.equal( defaultExpirationDate );
                    } );
                } );

                it( 'should return undefined if has no driverData', () => {
                    detranApiService.getDriverData.rejects();
                    controller.getDriverData().then( () => {
                        expect( controller.expirationDate ).to.be.undefined;
                    } );
                } );
            } );

            describe( 'hasTickets()', () => {
                it( 'should return true if has tickets', () => {
                    controller.getTickets().then( () => {
                        expect( controller.hasTickets ).to.be.true;
                    } );
                } );

                it( 'should return false if has no tickets', () => {
                    detranApiService.getTickets.resolves( [] );
                    controller.getTickets().then( () => {
                        expect( controller.hasTickets ).to.be.false;
                    } );
                } );

                it( 'should return false if error', () => {
                    detranApiService.getTickets.rejects();
                    controller.getTickets().then( () => {
                        expect( controller.hasTickets ).to.be.false;
                    } );
                } );
            } );

            describe( 'last12MonthsPoints()', () => {
                it( 'should return sum of points in last year tickets', () => {
                    controller.getTickets().then( () => {
                        expect( controller.last12MonthsPoints ).to.be.equal( 13 );
                    } );
                } );

                it( 'should return 0 if has no tickets', () => {
                    detranApiService.getTickets.resolves( [] );
                    controller.getTickets().then( () => {
                        expect( controller.last12MonthsPoints ).to.be.equal( 0 );
                    } );
                } );

                it( 'should return 0 if error', () => {
                    detranApiService.getTickets.rejects();
                    controller.getTickets().then( () => {
                        expect( controller.last12MonthsPoints ).to.be.equal( 0 );
                    } );
                } );
            } );

            describe( 'getClassificationColor( classification )', () => {
                it( 'should return correct color name by classification', () => {
                    expect( controller.getClassificationColor( 'leve' ) ).to.be.equal( 'green' );
                    expect( controller.getClassificationColor( 'média' ) ).to.be.equal( 'yellow' );
                    expect( controller.getClassificationColor( 'grave' ) ).to.be.equal( 'red' );
                    expect( controller.getClassificationColor( 'gravíssima' ) ).to.be.equal( 'black' );
                } );

                it( 'should return undefined if unable to find classification', () => {
                    expect( controller.getClassificationColor( 'asdf' ) ).to.be.undefined;
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

                it( 'should call "detranApiService.getDriverData()"', () => {
                    expect( detranApiService.getDriverData.calledOnce ).to.be.true;
                } );

                it( 'should populate driverData property', () => {
                    expect( controller.driverData ).to.not.be.undefined;
                } );

                it( 'should not populate driverData property on error', () => {
                    controller.driverData = undefined;
                    detranApiService.getDriverData.rejects();
                    controller.getDriverData().then( () => {
                        expect( controller.driverData ).to.be.undefined;
                    } );
                } );
            } );

            describe( 'getTickets()', () => {
                beforeEach( () => {
                    detranApiService.getTickets.resolves( tickets );
                    controller.getTickets();
                } );

                it( 'should call "detranApiService.getTickets()"', () => {
                    expect( detranApiService.getTickets.calledOnce ).to.be.true;
                } );

                it( 'should populate tickets property', () => {
                    expect( controller.tickets ).to.not.be.equal( [] );
                } );

                it( 'should not populate tickets property on error', () => {
                    controller.tickets = [];
                    detranApiService.getTickets.rejects();
                    controller.getTickets().then( () => {
                        expect( controller.tickets ).to.be.deep.equal( [] );
                    } );
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
