/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */

import { BusLinesController } from './bus-lines.component.controller';
import BusLinesComponent from './bus-lines.component';
import BusLinesTemplate from './bus-lines.component.html';

let expect = chai.expect;

/**
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( 'Ceturb/bus-lines', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach( () => sandbox = sinon.sandbox.create() );
    afterEach( () => sandbox.restore() );

    describe( 'Component', () => {
        // test the component/directive itself
        let component = BusLinesComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( BusLinesController );
        } );

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( BusLinesTemplate );
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
