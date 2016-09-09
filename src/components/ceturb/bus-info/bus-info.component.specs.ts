/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */

import { BusInfoController } from './bus-info.component.controller';
import BusInfoComponent from './bus-info.component';
import BusInfoTemplate from './bus-info.component.html';

let expect = chai.expect;

/**
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( 'Ceturb/bus-info', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach( () => sandbox = sinon.sandbox.create() );
    afterEach( () => sandbox.restore() );

    describe( 'Component', () => {
        // test the component/directive itself
        let component = BusInfoComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( BusInfoController );
        } );

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( BusInfoTemplate );
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
