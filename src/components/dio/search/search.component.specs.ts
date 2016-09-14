import { SearchController } from './search.component.controller';
import SearchComponent from './search.component';
import SearchTemplate from './search.component.html';
import { Hit, SearchResult, DioApiService, SearchFilter } from '../shared/index';
import filterTemplate from './filter/filter.html';
import { FilterController } from './filter/filter.controller';

let expect = chai.expect;

describe( 'Dio/search', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: SearchController;
        let dioApiService: DioApiService;
        let $mdDialog;
        let onIonicBeforeEnterEvent;
        let $window: any;
        let $scope: any;

        beforeEach(() => {
            $scope = <any>{
                $on: ( event, callback ) => {
                    if ( event === '$ionicView.beforeEnter' ) {
                        onIonicBeforeEnterEvent = callback;
                    }
                },
                $broadcast: () => { }
            };
            $mdDialog = { show() { } };
            $window = <any>{ open() { } };
            dioApiService = <DioApiService>{
                search: () => { }
            };
            controller = new SearchController( $scope, $window, $mdDialog, dioApiService );
        });

        describe( 'on instantiation', () => {

            it( 'should have total hits === 0', () => {
                expect( controller.totalHits ).to.be.equal( 0 );
            });

            it( 'should have an empty list of hits', () => {
                expect( controller.hits ).to.be.deep.equal( [] );
            });

            it( 'should have no more hits to show', () => {
                expect( controller.hasMoreHits ).to.be.false;
            });

            it( 'should have searched flag === false', () => {
                expect( controller.searched ).to.be.false;
            });

            it( 'should have a default filter', () => {
                expect( controller.filter ).to.be.deep.equal( {
                    pageNumber: 0,
                    sort: 'date'
                });
            });

            it( 'should activate on $ionicView.beforeEnter event', () => {
                let activate = sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                onIonicBeforeEnterEvent();

                expect( activate.called ).to.be.true;
            });
        });


        describe( 'search(filter)', () => {

            let freshHits: Hit[];
            let alreadyLoadedHits: Hit[];
            let searchResult: SearchResult;
            let searchApi: Sinon.SinonPromise;

            beforeEach(() => {
                alreadyLoadedHits = <Hit[]>[ { editionUrl: 'urlA' }, { editionUrl: 'urlB' }];
                freshHits = <Hit[]>[ { editionUrl: 'urlC' }, { editionUrl: 'urlD' }];
                searchResult = { hits: freshHits, totalHits: 1000 };
                searchApi = sandbox.stub( dioApiService, 'search' ).returnsPromise();
                searchApi.resolves( searchResult );

                // configure controller
                controller.hits = alreadyLoadedHits;
            });

            it( 'should append returned hits to already loaded ones (if paginating)', () => {
                controller.filter.pageNumber = 2;

                controller.search( controller.filter );

                expect( controller.hits ).to.deep.equal( alreadyLoadedHits.concat( freshHits ) );
            });

            it( 'should replace existing hits with freshing ones (on initial load)', () => {
                controller.filter.pageNumber = 0;

                controller.search( controller.filter );

                expect( controller.hits ).to.deep.equal( freshHits );
            });

            it( 'should fill totalHits', () => {
                controller.search( controller.filter );

                expect( controller.totalHits ).to.be.equal( searchResult.totalHits );
            });

            it( 'should set searched flag to true', () => {
                controller.searched = false;

                controller.search( controller.filter );

                expect( controller.searched ).to.be.true;
            });

            it( 'should have no more hits if no hits returned', () => {

                controller.search( controller.filter );

                expect( controller.hasMoreHits ).to.be.true;

                searchApi.resolves( { hits: [], totalHits: 1000 });

                controller.search( controller.filter );

                expect( controller.hasMoreHits ).to.be.false;
            });

            it( 'should broadcast scroll.infiniteScrollComplete event', () => {
                let $broadcast = sandbox.spy( $scope, '$broadcast' );

                controller.search( controller.filter );

                expect( $broadcast.called ).to.be.true;
            });
        });

        describe( 'openFilter()', () => {

            let $mdDialogShow: Sinon.SinonStub;

            beforeEach(() => {
                $mdDialogShow = sandbox.stub( $mdDialog, 'show' );
                $mdDialogShow.returnsPromise();
            });

            it( 'should open filter', () => {

                controller.filter = {
                    pageNumber: 1,
                    sort: 'date'
                };

                controller.openFilter();

                let spyCall = $mdDialogShow.getCall( 0 );
                expect( spyCall.args[ 0 ].controller ).to.equal( FilterController );
                expect( spyCall.args[ 0 ].template ).to.equal( filterTemplate );
                expect( spyCall.args[ 0 ].bindToController ).to.equal( true );
                expect( spyCall.args[ 0 ].controllerAs ).to.equal( 'vm' );
                expect( spyCall.args[ 0 ].locals ).to.deep.equal( controller.filter );
            });

            describe( 'on filter edited:', () => {

                let userFilter: SearchFilter;
                let search: Sinon.SinonStub;

                beforeEach( () => {
                    userFilter = {
                        pageNumber: 100,
                        sort: 'date'
                    };
                    search = sandbox.stub( controller, 'search' );
                    $mdDialogShow.returnsPromise().resolves( userFilter );

                    controller.openFilter();
                } );

                it( 'should search DIO with the provided filter', () => {
                    expect( search.calledWith( userFilter ) ).to.be.true;
                });

                it( 'should reset pagination to first page', () => {
                    expect( userFilter.pageNumber ).to.be.equal( 0 );
                });
            });


            describe( 'open()', () => {
                it( 'should open edition or page', () => {
                    let $windowOpen = sinon.stub( $window, 'open' );

                    controller.open( 'edition-url' );

                    expect( $windowOpen.calledWith( 'edition-url' ) ).to.be.true;
                });
            });
        });
    });

    describe( 'Component', () => {
        // test the component/directive itself
        let component = SearchComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( SearchController );
        });

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( SearchTemplate );
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
