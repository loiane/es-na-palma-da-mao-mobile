/*
eslint
no-undef: 0,
dot-notation: 0,
angular/di: 0,
no-unused-expressions: 0
*/

import { NewsDetailController } from './news-detail.component.controller';
import { NewsApiService, News } from '../shared/index';
import NewsDetailComponent from './news-detail.component';
import NewsDetailTemplate from './news-detail.component.html';

let expect = chai.expect;

/**
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( 'News/news-detail', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: NewsDetailController;
        let newsApiService: NewsApiService;
        let onIonicBeforeEnterEvent;
        let news: News = <News>{ title: 'Notícia A', id: '1234456' };
        let $state: angular.ui.IStateService;

        beforeEach(() => {
            let $scope = <any>{
                $on: ( event, callback ) => {
                    if ( event === '$ionicView.beforeEnter' ) {
                        onIonicBeforeEnterEvent = callback;
                    }
                }
            };
            newsApiService = <NewsApiService><any>{
                getNewsById: () => { }
            };
            sandbox.stub( newsApiService, 'getNewsById' ).returnsPromise().resolves( news );
            $state = <angular.ui.IStateService><any>{ [ 'id' ]: '1234456' };

            controller = new NewsDetailController( $scope, newsApiService, $state );
        });

        describe( 'on instantiation', () => {

            it( 'should have a empty news', () => {
                expect( controller.news ).to.be.empty;
            });

            it( 'should activate on $ionicView.beforeEnter event', () => {
                let activate = sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                onIonicBeforeEnterEvent();

                expect( activate.called ).to.be.true;
            });
        });

        describe( 'activate()', () => {
            it( 'should call getNewsById', () => {
                let getNewsById = sandbox.stub( controller, 'getNewsById' );

                controller.activate();

                expect( getNewsById.calledWith( $state[ 'id' ] ) ).to.be.true;
            });
        });

        describe( 'getNewsById( id )', () => {
            it( 'should fill news', () => {
                controller.getNewsById( 'any string' );

                expect( controller.news ).to.deep.equal( news );
            });
        });
    });

    describe( 'Component', () => {
        // test the component/directive itself
        let component = NewsDetailComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( NewsDetailController );
        });

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( NewsDetailTemplate );
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
