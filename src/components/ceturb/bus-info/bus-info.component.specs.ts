import { BusInfoController } from './bus-info.component.controller';
import BusInfoComponent from './bus-info.component';
import BusInfoTemplate from './bus-info.component.html';
import { CeturbApiService } from '../shared/ceturb-api.service';
import { BusRoute, BusSchedule } from '../shared/index';
import { environment, $stateParamsMock, $qMock, $windowMock } from '../../shared/tests/index';

let expect = chai.expect;

describe( 'Ceturb/bus-info', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: BusInfoController;
        let ceturbApiService: CeturbApiService;

        beforeEach(() => {
            environment.refresh();
            ceturbApiService = <CeturbApiService>{
                getRoute: () => { },
                getSchedule: () => { }
            };
            controller = new BusInfoController( environment.$scope, $stateParamsMock, $qMock, $windowMock, ceturbApiService );
        });

        describe( 'on instantiation', () => {

            it( 'should have a undefined route', () => {
                expect( controller.route ).to.be.equal( undefined );
            });

            it( 'should have a undefined schedule', () => {
                expect( controller.schedule ).to.be.undefined;
            });

            it( 'should have a undefined current time', () => {
                expect( controller.currentTime ).to.be.undefined;
            });

            it( 'should activate on $ionicView.beforeEnter event', () => {
                let activate = sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                environment.onIonicBeforeEnterEvent();

                expect( activate.called ).to.be.true;
            });
        });

        describe( 'activate()', () => {

            let getSchedule: Sinon.SinonStub;
            let getRoute: Sinon.SinonStub;

            beforeEach(() => {
                getSchedule = sandbox.stub( controller, 'getSchedule' );
                getRoute = sandbox.stub( controller, 'getRoute' );
                $stateParamsMock[ 'id' ] = 123;
            });

            afterEach(() => {
                delete $stateParamsMock[ 'id' ];
            });

            it( 'should fetch line schedule', () => {
                controller.activate();

                expect( getSchedule.calledWithExactly( $stateParamsMock[ 'id' ] ) ).to.be.true;
            });

            it( 'should fetch line route', () => {
                controller.activate();

                expect( getRoute.calledWithExactly( $stateParamsMock[ 'id' ] ) ).to.be.true;
            });

            it( 'should fill current time', () => {
                controller.activate();

                expect( controller.currentTime ).to.be.equal( new Date().toTimeString().slice( 0, 5 ) );
            });
        });

        describe( 'getRoute(id)', () => {

            let getRoutePromise: Sinon.SinonPromise;
            let route: BusRoute;

            beforeEach(() => {
                route = <BusRoute><any>{ line: '600' };
                controller.route = undefined;
                getRoutePromise = sandbox.stub( ceturbApiService, 'getRoute' ).returnsPromise();
            });

            it( 'should fill bus route', () => {
                getRoutePromise.resolves( route );

                controller.getRoute( '123' );

                expect( controller.route ).to.deep.equal( route );
            });

            it( 'should clear route on error', () => {
                getRoutePromise.rejects();
                controller.route = route;

                controller.getRoute( '123' );

                expect( controller.route ).to.be.undefined;
            });
        });

        describe( 'getSchedule(id)', () => {

            let getSchedulePromise: Sinon.SinonPromise;
            let schedule: BusSchedule;

            beforeEach(() => {
                schedule = <BusSchedule><any>{ line: '500' };
                controller.schedule = undefined;
                getSchedulePromise = sandbox.stub( ceturbApiService, 'getSchedule' ).returnsPromise();
            });

            it( 'should fill bus schedule', () => {
                getSchedulePromise.resolves( schedule );

                controller.getSchedule( '123' );

                expect( controller.schedule ).to.deep.equal( schedule );
            });

            it( 'should clear schedule on error', () => {
                getSchedulePromise.rejects();
                controller.schedule = schedule;

                controller.getSchedule( '123' );

                expect( controller.schedule ).to.be.undefined;
            });
        });

        describe( 'openMapLink()', () => {
            it( 'should open map on gmaps', () => {
                let $windowOpen = sandbox.stub( $windowMock, 'open' );
                let location = 'Guarapari';

                controller.openMapLink( location );

                expect( $windowOpen.calledWithExactly( `http://www.google.com.br/maps/place/${location}, ES`, '_system', 'location=yes' ) ).to.be.true;
            });
        });
    });

    describe( 'Component', () => {
        // test the component/directive itself
        let component = BusInfoComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( BusInfoController );
        });

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( BusInfoTemplate );
        });

        it( 'should use controllerAs', () => {
            expect( component ).to.have.property( 'controllerAs' );
        });

        it( 'should use controllerAs "vm"', () => {
            expect( component.controllerAs ).to.equal( 'vm' );
        });

        it( 'should use bindToController: true', () => {
            expect( component ).to.have.property( 'bindToController' );
            expect( component.bindToController ).to.equal( true );
        });
    });
});
