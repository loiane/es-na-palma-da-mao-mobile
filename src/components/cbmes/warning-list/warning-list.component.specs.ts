import { WarningListController } from './warning-list.component.controller';
import WarningListComponent from './warning-list.component';
import WarningListTemplate from './warning-list.component.html';
import { CbmesApiService, Warning } from '../shared/index';
import { environment, $windowMock } from '../../shared/tests/index';

let expect = chai.expect;

describe( 'cmbes/warning-list', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: WarningListController;
        let cbmesApiService: CbmesApiService;

        // mocka data
        let warnings: Warning[] =
            [ {
                level: 'alto',
                title: 'Incêndio',
                message: 'Princípio de incendio no centro',
                beginDate: new Date(),
                endDate: new Date(),
                region: {
                    type: 'circle',
                    center: { latitude: -20, longitude: -40 },
                    radius: 2000
                }
            },
            {
                level: 'medio',
                title: 'Incêndio',
                message: 'Princípio de incendio no centro',
                beginDate: new Date(),
                endDate: new Date(),
                region: {
                    type: 'circle',
                    center: { latitude: -20, longitude: -40 },
                    radius: 2000
                }
            },
            {
                level: 'baixo',
                title: 'Incêndio',
                message: 'Princípio de incendio no centro',
                beginDate: new Date(),
                endDate: new Date(),
                region: {
                    type: 'circle',
                    center: { latitude: -20, longitude: -40 },
                    radius: 2000
                }
            }];

        beforeEach(() => {
            environment.refresh();
            cbmesApiService = <CbmesApiService>{ getLastWarnings() { } };
            controller = new WarningListController( environment.$scope, $windowMock, cbmesApiService );
        });

        describe( 'on instantiation', () => {

            it( 'should have a empty warning list', () => {
                expect( controller.warnings ).to.be.undefined;
                expect( controller.warnings ).to.be.empty;
            });

            it( 'should activate on $ionicView.beforeEnter event', () => {
                let activate = sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                environment.onIonicBeforeEnterEvent();

                expect( activate.called ).to.be.true;
            });
        });

        describe( 'activate()', () => {

            let getWarnings: Sinon.SinonSpy;

            beforeEach(() => {
                getWarnings = sandbox.spy( controller, 'getWarnings' );

                sandbox.stub( cbmesApiService, 'getLastWarnings' ).returnsPromise().resolves( warnings );

                controller.activate();
            });

            it( 'should call getLastWarnings()', () => {
                expect( getWarnings.calledOnce ).to.be.true;
            });
        });


        describe( 'getWarnings()', () => {

            let getLastWarnings: Sinon.SinonStub;

            beforeEach(() => {
                getLastWarnings = sandbox.stub( cbmesApiService, 'getLastWarnings' );
                getLastWarnings.returnsPromise().resolves( warnings );

                controller.getWarnings();
            });

            it( 'should fill warnings list', () => {
                expect( controller.warnings ).to.deep.equal( warnings );
            });
        });

        describe( 'openLocation()', () => {

            let lat: number;
            let lng: number;
            let label: string;
            let $windowOpen: Sinon.SinonStub;

            beforeEach(() => {
                lat = 2343434;
                lng = 2342342;
                label = 'Es';
                $windowOpen = sandbox.stub( $windowMock, 'open' );
            });

            it( 'should open google maps on Web', () => {
                environment.$scope.isAndroid = false;

                controller.openLocation( lat, lng, label );

                expect( $windowOpen.calledWith( `maps://?q=${lat},${lng}`, '_system' ) ).to.be.true;
            });

            it( 'should open google maps on Android device', () => {
                environment.$scope.isAndroid = true;

                controller.openLocation( lat, lng, label );

                expect( $windowOpen.calledWith( `geo:0,0?q=${lat},${lng}(${encodeURI( label )})`, '_system' ) ).to.be.true;
            });

            it( 'should ope345n google maps on Android device', () => {
                environment.$scope.isAndroid = true;

                controller.openLocation( lat, lng, label );

                expect( $windowOpen.calledWith( `geo:0,0?q=${lat},${lng}(${encodeURI( label )})`, '_system' ) ).to.be.true;
            });
        });
    });

    describe( 'Component', () => {
        // test the component/directive itself
        let component = WarningListComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( WarningListController );
        });

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( WarningListTemplate );
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
