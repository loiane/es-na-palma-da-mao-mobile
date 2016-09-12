/*
eslint
no-undef: 0,
dot-notation: 0,
angular/di: 0,
no-unused-expressions: 0
*/

import { DashBoardController } from './dashboard.component.controller';
import DashBoardComponent from './dashboard.component';
import DashBoardTemplate from './dashboard.component.html';

let expect = chai.expect;

/**
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( 'Dashboard', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: DashBoardController;
        let onIonicBeforeEnterEvent;
        let $state: angular.ui.IStateService;

        beforeEach(() => {
            let $scope = <any>{
                $on: ( event, callback ) => {
                    if ( event === '$ionicView.beforeEnter' ) {
                        onIonicBeforeEnterEvent = callback;
                    }
                }
            };

            $state = <angular.ui.IStateService><any>{ go: () => { } };

            controller = new DashBoardController( $scope, $state );
        });

        describe( 'on instantiation', () => {
            it( 'should activate on $ionicView.beforeEnter event', () => {
                let activate = sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                onIonicBeforeEnterEvent();

                expect( activate.called ).to.be.true;
            });
        });

        describe( 'activate()', () => {
            it( 'should apply "espm-header-tab" class to all "ion-header-bar" elements', () => {
                let domElement = { addClass: sinon.spy() };
                let querySelectorAll = sandbox.stub( document, 'querySelectorAll' );
                sandbox.stub( angular, 'element' ).returns( domElement );

                controller.activate();

                expect( querySelectorAll.calledWith( 'ion-header-bar' ) ).to.be.true;
                expect( domElement.addClass.calledWith( 'espm-header-tabs' ) ).to.be.true;
            });
        });


        describe( 'navigateTo( newState )', () => {
            it( 'should redirect user to "newState"', () => {
                let go = sandbox.stub( $state, 'go' );
                let newState = 'newState';

                controller.navigateTo( newState );

                expect( go.calledWith( newState ) ).to.be.true;
            });
        });
    });

    describe( 'Component', () => {
        // test the component/directive itself
        let component = DashBoardComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( DashBoardController );
        });

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( DashBoardTemplate );
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
