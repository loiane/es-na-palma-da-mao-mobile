import 'core-js/modules/es6.string.includes';
import { BusLinesController } from './bus-lines.component.controller';
import BusLinesComponent from './bus-lines.component';
import BusLinesTemplate from './bus-lines.component.html';
import { BusLine, CeturbApiService, CeturbStorage } from '../shared/index';
import { environment, $stateMock } from '../../shared/tests/index';

let expect = chai.expect;

describe( 'Ceturb/bus-lines', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: BusLinesController;
        let ceturbApiService: CeturbApiService;
        let ceturbStorage: CeturbStorage;

        beforeEach(() => {
            environment.refresh();
            ceturbApiService = <CeturbApiService>{
                getLines: () => { }
            };
            ceturbStorage = <CeturbStorage><any>{
                isFavoriteLine() { },
                addToFavoriteLines() { },
                removeFromFavoriteLines() { }
            };
            controller = new BusLinesController( environment.$scope, $stateMock, ceturbApiService, ceturbStorage );
        });

        describe( 'on instantiation', () => {

            it( 'should have a undefined bus lines list', () => {
                expect( controller.lines ).to.be.equal( undefined );
            });

            it( 'should have a undefined filtered lines list', () => {
                expect( controller.filteredLines ).to.be.undefined;
            });

            it( 'should have a undefined inputted filter', () => {
                expect( controller.filter ).to.be.undefined;
            });

            it( 'should activate on $ionicView.beforeEnter event', () => {
                let activate = sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                environment.onIonicBeforeEnterEvent();

                expect( activate.called ).to.be.true;
            });
        });

        describe( 'activate()', () => {
            it( 'should fetch all bus lines', () => {
                let getLines = sandbox.stub( controller, 'getLines' );

                controller.activate();

                expect( getLines.calledOnce ).to.be.true;
            });

            it( 'should reset inputted filter', () => {
                sandbox.stub( controller, 'getLines' );
                controller.filter = '500';

                controller.activate();

                expect( controller.filter ).to.be.equal( '' );
            });
        });

        describe( 'getLines()', () => {

            let lines = <BusLine[]>[
                { number: '500', name: 'Linha 500' },
                { number: '501', name: 'Linha 501' }
            ];

            beforeEach(() => {
                sandbox.stub( ceturbApiService, 'getLines' ).returnsPromise().resolves( lines );
                sandbox.stub( ceturbStorage, 'isFavoriteLine' ).returns( true );
            });

            it( 'should fill bus lines', () => {
                controller.getLines();

                expect( controller.lines ).to.deep.equal( lines );
            });

            it( 'should fill filtered lines with all lines', () => {
                controller.getLines();

                expect( controller.lines ).to.deep.equal( controller.filteredLines );
            });
        });

        describe( 'goToLine( id )', () => {
            it( 'should redirect user to line screen', () => {
                let go = sandbox.stub( $stateMock, 'go' );
                let id = 'newState';

                controller.goToLine( id );

                expect( go.calledWith( 'app.busInfo/:id', { id: id }) ).to.be.true;
            });
        });


        describe( 'filterLines( filter )', () => {

            let lines: BusLine[];

            beforeEach(() => {
                lines = <BusLine[]>[
                    { number: '500', name: 'Itacibá' },
                    { number: '501', name: 'Canto' },
                    { number: '502', name: 'Serra' }
                ];

                controller.filteredLines = [];
                controller.lines = lines;
            });

            it( 'should filter by line number', () => {

                controller.filterLines( '502' );

                expect( controller.filteredLines ).to.have.lengthOf( 1 );
                expect( controller.filteredLines ).to.contain( lines[ 2 ] );
            });

            it( 'should filter by full line name', () => {

                controller.filterLines( 'Itacibá' );

                expect( controller.filteredLines ).to.have.lengthOf( 1 );
                expect( controller.filteredLines ).to.contain( lines[ 0 ] );
            });

            it( 'should filter by partial line name', () => {

                controller.filterLines( 'Itac' );

                expect( controller.filteredLines ).to.have.lengthOf( 1 );
                expect( controller.filteredLines ).to.contain( lines[ 0 ] );
            });

            it( 'should ignore line name case', () => {

                controller.filterLines( 'ITAC' );

                expect( controller.filteredLines ).to.have.lengthOf( 1 );
                expect( controller.filteredLines ).to.contain( lines[ 0 ] );
            });

            it( 'should ignore line name accents', () => {

                controller.filterLines( 'itaciba' );

                expect( controller.filteredLines ).to.have.lengthOf( 1 );
                expect( controller.filteredLines ).to.contain( lines[ 0 ] );
            });

            it( 'should not filter whitespace', () => {

                controller.filterLines( ' ' );

                expect( controller.filteredLines ).to.have.lengthOf( controller.lines.length );
            });
        });
    });

    describe( 'Component', () => {
        // test the component/directive itself
        let component = BusLinesComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( BusLinesController );
        });

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( BusLinesTemplate );
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
