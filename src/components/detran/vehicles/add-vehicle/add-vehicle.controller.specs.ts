import { AddVehicleController } from './add-vehicle.controller';
import { $mdDialogMock, toastServiceMock } from '../../../shared/tests/index';

let expect = chai.expect;

describe( 'Detran/vehicles/add-vehicle', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: AddVehicleController;
        beforeEach(() => {
            controller = new AddVehicleController( $mdDialogMock, toastServiceMock );
        });

        describe( 'cancel()', () => {
            it( 'should cancel modal', () => {
                let cancel = sandbox.stub( $mdDialogMock, 'cancel' );

                controller.cancel();

                expect( cancel.called ).to.be.true;
            });
        });

        describe( 'ok(plate,renavam)', () => {
            it( 'should show validation message if no plate is provided', () => {
                let info = sandbox.stub( toastServiceMock, 'info' );

                controller.ok( '', '123234345' );
                expect( info.calledWith( { title: 'Placa é obrigatória' }) ).to.be.true;
            });

            it( 'should show validation message if no renavam is provided', () => {
                let info = sandbox.stub( toastServiceMock, 'info' );

                controller.ok( '123234345', '' );

                expect( info.calledWith( { title: 'RENAVAM é obrigatório' }) ).to.be.true;
            });

            it( 'should close modal passing addded vehicle', () => {
                let hide = sandbox.stub( $mdDialogMock, 'hide' );
                let plate = '1111111111';
                let renavam = '222222222';

                controller.ok( plate, renavam );

                expect( hide.calledWith( { plate, renavam }) ).to.be.true;
            });
        });
    });
});
