 /*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */

import { HomeController } from './home.component.controller';
import HomeComponent from './home.component';
import HomeTemplate from './home.component.html';

let expect = chai.expect;

/**
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( 'Home', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach( () => sandbox = sinon.sandbox.create() );
    afterEach( () => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: HomeController;
        let $state: angular.ui.IStateService;
        let $window: Sinon.SinonStub;

        beforeEach(() => {
            $state = <angular.ui.IStateService><any>{ go: () => { } };
            $window = <any>{ open: () => { } };

            controller = new HomeController( $state, <any>$window );
        });


        describe( 'navigateToLogin()', () => {
            it( 'should redirect user to login screen', () => {
                let go = sandbox.stub( $state, 'go' );

                controller.navigateToLogin();

                expect( go.calledWith( 'login' ) ).to.be.true;
            });
        });


        describe( 'createAccount()', () => {
            it( 'should open aceso cidadão', () => {
                let $windowOpen = sandbox.stub( $window, 'open' ); // replace original activate

                controller.createAccount();

                expect( $windowOpen.calledWith( 'https://acessocidadao.es.gov.br/Conta/VerificarCPF', '_system' ) ).to.be.true;
            });
        });
    });

    describe( 'Component', () => {
        // test the component/directive itself
        let component = HomeComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( HomeController );
        } );

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( HomeTemplate );
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
