import moment from 'moment';
import { NewsListController } from './news-list.component.controller';
import { NewsApiService, News, Filter } from '../shared/index';
import NewsListComponent from './news-list.component';
import NewsListTemplate from './news-list.component.html';
import sourcesFilterTemplate from './sources-filter/sources-filter.html';
import datesFilterTemplate from './dates-filter/dates-filter.html';
import { SourcesFilterController } from './sources-filter/sources-filter.controller';
import { DatesFilterController } from './dates-filter/dates-filter.controller';

let expect = chai.expect;

describe( 'News/news-list', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: NewsListController;
        let newsApiService: NewsApiService;
        let $mdDialog;
        let onIonicBeforeEnterEvent;
        let availableOrigins = [ 'SESA', 'SEJUS', 'SEGER' ];
        let $state: angular.ui.IStateService;
        let $scope: any;

        beforeEach(() => {
            $scope = <any>{
                $on: ( event, callback ) => {
                    if ( event === '$ionicView.beforeEnter' ) {
                        onIonicBeforeEnterEvent = callback;
                    }
                },
                $broadcast: () => {}
            };
            $mdDialog = { show() { } };
            $state = <angular.ui.IStateService><any>{ go: () => { } };
            newsApiService = <NewsApiService><any>{
                getNews: () => { },
                getAvailableOrigins: () => { }
            };
            controller = new NewsListController( $scope, $state, $mdDialog, newsApiService );
        });

        describe( 'on instantiation', () => {

            it( 'should have a empty news list', () => {
                expect( controller.news ).to.be.not.undefined;
                expect( controller.news ).to.be.empty;
            });

            it( 'should have a empty list of news sources', () => {
                expect( controller.availableOrigins ).to.be.not.undefined;
                expect( controller.availableOrigins ).to.be.empty;
            });

            it( 'should not be activated', () => {
                expect( controller.activated ).to.be.false;
            });

            it( 'should not be populated', () => {
                expect( controller.activated ).to.be.false;
            });

            it( 'should has more news to show', () => {
                expect( controller.hasMoreNews ).to.be.true;
            });

            it( 'should show the first page', () => {
                expect( controller.currentPage ).to.be.equal( 0 );
            });

            it( 'should have a default filter', () => {
                expect( controller.filter ).to.be.deep.equal( {
                    origins: [],
                    dateMin: undefined,
                    dateMax: undefined,
                    pageNumber: 1,
                    pageSize: 10
                });
            });

            it( 'should activate on $ionicView.beforeEnter event', () => {
                let activate = sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                onIonicBeforeEnterEvent();

                expect( activate.called ).to.be.true;
            });
        });

        describe( 'activate()', () => {
            beforeEach(() => {
                sandbox.stub( newsApiService, 'getAvailableOrigins' ).returnsPromise().resolves( availableOrigins );
            });

            it( 'should fetch all available sources of news', () => {
                let getAvailableOrigins = sandbox.spy( controller, 'getAvailableOrigins' );

                controller.activate();

                expect( getAvailableOrigins.called ).to.be.true;
            });

            it( 'should mark controller as activated', () => {
                controller.activate();

                expect( controller.activated ).to.be.true;
            });
        });

        describe( 'getAvailableOrigins()', () => {

            beforeEach(() => {
                sandbox.stub( newsApiService, 'getAvailableOrigins' ).returnsPromise().resolves( availableOrigins );
            });

            it( 'should fill list of available sources', () => {
                controller.getAvailableOrigins();

                expect( controller.availableOrigins ).to.deep.equal( availableOrigins );
            });

            it( 'should select all filter sources', () => {
                controller.getAvailableOrigins();

                expect( controller.filter.origins ).to.deep.equal( availableOrigins );
            });
        });


        describe( 'getNews(filter)', () => {

            let freshNews: News[];
            let alreadyLoadedNews: News[];
            let filter: Filter;

            beforeEach(() => {
                filter = {
                    origins: [ 'SESA', 'SECOM' ],
                    dateMin: new Date(),
                    dateMax: new Date(),
                    pageNumber: 5,
                    pageSize: 12
                };
                alreadyLoadedNews = <News[]>[ { title: 'Notícia A' }, { title: 'Notícia B' }];
                freshNews = <News[]>[ { title: 'Notícia C' }, { title: 'Notícia D' }];
                sandbox.stub( newsApiService, 'getNews' ).returnsPromise().resolves( freshNews );
                controller.news = alreadyLoadedNews;
            });

            it( 'should update controller filter with provided filter', () => {
                controller.getNews( filter );

                expect( controller.filter ).to.deep.equal( filter );
            });

            it( 'should append returned news to existing news list', () => {
                controller.getNews( filter );

                expect( controller.news ).to.deep.equal( alreadyLoadedNews.concat( freshNews ) );
            });

            it( 'should unset hasMoreNews if returned a partial page list', () => {
                controller.hasMoreNews = true;
                filter.pageSize = 10; // pageSize < freshNews.length

                controller.getNews( filter );

                expect( controller.hasMoreNews ).to.be.false;
            });

            it( 'should set hasMoreNews if returned a full page list', () => {
                controller.hasMoreNews = false;
                filter.pageSize = 2; // pageSize == freshNews.length

                controller.getNews( filter );

                expect( controller.hasMoreNews ).to.be.true;
            });


            it( 'should copy filter.pageNumber to controller.currentPage', () => {
                controller.currentPage = 5;

                controller.getNews( filter );

                expect( controller.currentPage ).to.equal( filter.pageNumber );
            });

            it( 'should mark controller as populated', () => {
                controller.populated = false;

                controller.getNews( filter );

                expect( controller.populated ).to.be.true;
            });

            it( 'should broadcast scroll.infiniteScrollComplete event', () => {
                let $broadcast = sandbox.spy( $scope, '$broadcast' );

                controller.getNews( filter );

                expect( $broadcast.called ).to.be.true;
            });
        });

        describe( 'Filters:', () => {
            let $mdDialogShow: Sinon.SinonStub;

            beforeEach(() => {
                $mdDialogShow = sandbox.stub( $mdDialog, 'show' );
                $mdDialogShow.returnsPromise();
            });

            describe( 'openOriginsFilter()', () => {

                it( 'should open sources filter', () => {
                    controller.availableOrigins = availableOrigins;
                    controller.filter.origins = availableOrigins;

                    controller.openOriginsFilter();

                    let spyCall = $mdDialogShow.getCall( 0 );
                    expect( spyCall.args[ 0 ].controller ).to.equal( SourcesFilterController );
                    expect( spyCall.args[ 0 ].template ).to.equal( sourcesFilterTemplate );
                    expect( spyCall.args[ 0 ].bindToController ).to.equal( true );
                    expect( spyCall.args[ 0 ].controllerAs ).to.equal( 'vm' );
                    expect( spyCall.args[ 0 ].locals ).to.deep.equal( {
                        availableOrigins: controller.availableOrigins,
                        selectedOrigins: controller.filter.origins
                    });
                });

                describe( 'on sources filter edited:', () => {
                    it( 'should reload controller with the inputted filter', () => {
                        let sourceFilter = {
                            origins: [],
                            dateMin: undefined,
                            dateMax: undefined,
                            pageNumber: 4,
                            pageSize: 15
                        };
                        $mdDialogShow.returnsPromise().resolves( sourceFilter );
                        let reload = sandbox.stub( controller, 'reload' );

                        controller.openOriginsFilter();

                        expect( reload.calledWith( sourceFilter ) ).to.be.true;
                    });
                });
            });


            describe( 'openDateFilter()', () => {
                it( 'should open dates filter', () => {
                    controller.filter.dateMin = moment().subtract( 1, 'day' ).toDate();
                    controller.filter.dateMax = moment().add( 1, 'day' ).toDate();

                    controller.openDateFilter();

                    let spyCall = $mdDialogShow.getCall( 0 );
                    expect( spyCall.args[ 0 ].controller ).to.equal( DatesFilterController );
                    expect( spyCall.args[ 0 ].template ).to.equal( datesFilterTemplate );
                    expect( spyCall.args[ 0 ].bindToController ).to.equal( true );
                    expect( spyCall.args[ 0 ].controllerAs ).to.equal( 'vm' );
                    expect( spyCall.args[ 0 ].locals ).to.deep.equal( {
                        dateMin: controller.filter.dateMin,
                        dateMax: controller.filter.dateMax
                    });
                });

                describe( 'on dates filter edited:', () => {
                    it( 'should reload controller with the inputted filter', () => {
                        let dateFilter = {
                            dateMin: moment().subtract( 10, 'day' ).toDate(),
                            dateMax: moment().add( 10, 'day' ).toDate()
                        };
                        $mdDialogShow.returnsPromise().resolves( dateFilter );
                        let reload = sandbox.stub( controller, 'reload' );

                        controller.openDateFilter();

                        expect( reload.calledWith( dateFilter ) ).to.be.true;
                    });
                });
            });
        });

        describe( 'goToNews( id )', () => {
            it( 'should show selected news', () => {
                let go = sandbox.stub( $state, 'go' );
                let id = '123456';

                controller.goToNews( id );

                expect( go.calledWith( 'app.news/:id', { id: id }) ).to.be.true;
            });
        });

        describe( 'reload(filter)', () => {

            let resetPagination: Sinon.SinonStub;
            let getNews: Sinon.SinonStub;
            let filter = { pageNumber: 3 };

            beforeEach(() => {
                resetPagination = sandbox.stub( controller, 'resetPagination' );
                getNews = sandbox.stub( controller, 'getNews' );

                controller.reload( filter );
            });

            it( 'should reset pagination', () => {
                expect( resetPagination.called ).to.be.true;
            });

            it( 'should set filter.pageNumber to 1 ', () => {
                expect( filter.pageNumber ).to.be.equal( 1 );
            });

            it( 'should get news', () => {
                expect( getNews.calledWith( filter ) ).to.be.true;
            });
        });

        describe( 'resetPagination()', () => {
            it( 'should reset pagination related properties', () => {
                controller.news = <News[]>[ { title: 'Notícia A' }, { title: 'Notícia B' }];
                controller.populated = true;
                controller.hasMoreNews = false;
                controller.currentPage = 1;

                controller.resetPagination();

                expect( controller.news ).to.be.deep.equal( [] );
                expect( controller.populated ).to.be.false;
                expect( controller.hasMoreNews ).to.be.true;
                expect( controller.currentPage ).to.be.equal( 0 );
            });
        });
    });

    describe( 'Component', () => {
        // test the component/directive itself
        let component = NewsListComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( NewsListController );
        });

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( NewsListTemplate );
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
