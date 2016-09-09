 /*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */

import { SearchController } from './search.component.controller';
import SearchComponent from './search.component';
import SearchTemplate from './search.component.html';

let expect = chai.expect;

/**
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( 'Dio/search', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach( () => sandbox = sinon.sandbox.create() );
    afterEach( () => sandbox.restore() );

    describe( 'Component', () => {
        // test the component/directive itself
        let component = SearchComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( SearchController );
        } );

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( SearchTemplate );
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
