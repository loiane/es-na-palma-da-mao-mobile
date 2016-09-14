import { AddVehicleController } from './add-vehicle.controller';
import { ToastService } from '../../../shared/toast/index';

let expect = chai.expect;

describe( 'Detran/vehicles/add-vehicle', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: AddVehicleController;
        let $mdDialog;
        let toastService: ToastService;

        beforeEach(() => {
            $mdDialog = { hide() { }, cancel() { } };
            toastService = <ToastService><any>{
                info: () => { },
                error: () => { }
            };
            controller = new AddVehicleController( $mdDialog, toastService );
        });

        describe( 'cancel()', () => {
            it( 'should cancel modal', () => {
                let cancel = sandbox.stub( $mdDialog, 'cancel' );

                controller.cancel();

                expect( cancel.called ).to.be.true;
            });
        });


        describe( 'ok(plate,renavam)', () => {
            it( 'should show validation message if no plate is provided', () => {
                let info = sandbox.stub( toastService, 'info' );

                controller.ok( '', '123234345' );
                expect( info.calledWith( { title: 'Placa é obrigatória' }) ).to.be.true;
            });

            it( 'should show validation message if no renavam is provided', () => {
                let info = sandbox.stub( toastService, 'info' );

                controller.ok( '123234345', '' );

                expect( info.calledWith( { title: 'RENAVAM é obrigatório' }) ).to.be.true;
            });

            it( 'should close modal passing addded vehicle', () => {
                let hide = sandbox.stub( $mdDialog, 'hide' );
                let plate = '1111111111';
                let renavam = '222222222';

                controller.ok( plate, renavam );

                expect( hide.calledWith( { plate, renavam } ) ).to.be.true;
            });
        });
    });
});
