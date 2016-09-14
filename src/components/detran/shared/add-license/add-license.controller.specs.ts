import { AddLicenseController } from './add-license.controller';
import { ToastService } from '../../../shared/toast/index';

let expect = chai.expect;

describe( 'Detran/shared/add-license', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: AddLicenseController;
        let $mdDialog;
        let toastService: ToastService;

        beforeEach(() => {
            $mdDialog = { hide() { }, cancel() { } };
            toastService = <ToastService><any>{ info: () => { } };
            controller = new AddLicenseController( $mdDialog, toastService );
        });

        describe( 'cancel()', () => {
            it( 'should cancel modal', () => {
                let cancel = sandbox.stub( $mdDialog, 'cancel' );

                controller.cancel();

                expect( cancel.called ).to.be.true;
            });
        });


        describe( 'ok(plate,renavam)', () => {
            it( 'should show validation message if no register number is provided', () => {
                let info = sandbox.stub( toastService, 'info' );

                controller.ok( '', '123234345' );
                expect( info.calledWithExactly( { title: 'Nº do registro é obrigatório' }) ).to.be.true;
            });

            it( 'should show validation message if no ballot is provided', () => {
                let info = sandbox.stub( toastService, 'info' );

                controller.ok( '123234345', '' );

                expect( info.calledWithExactly( { title: 'Nº da cédula é obrigatório' }) ).to.be.true;
            });

            it( 'should close modal passing added license', () => {
                let hide = sandbox.stub( $mdDialog, 'hide' );
                let registerNumber = '1111111111';
                let ballot = '222222222';

                controller.ok( registerNumber, ballot );

                expect( hide.calledWith( { registerNumber, ballot }) ).to.be.true;
            });
        });
    });
});
