import { FilterController } from './filter.controller';
import { ToastService } from '../../../shared/toast/index';

let expect = chai.expect;

describe( 'Dio/search/filter', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: FilterController;
        let $mdDialog;
        let toastService: ToastService;

        beforeEach(() => {
            $mdDialog = { hide() { }, cancel() { } };
            toastService = <ToastService><any>{
                info: () => { },
                error: () => { }
            };
            controller = new FilterController( $mdDialog, toastService );
        });

        describe( 'cancel()', () => {
            it( 'should cancel modal', () => {
                let cancel = sandbox.stub( $mdDialog, 'cancel' );

                controller.cancel();

                expect( cancel.called ).to.be.true;
            });
        });


        describe( 'ok(query,dateMin,dateMax)', () => {
            it( 'should show validation message if no query is provided', () => {
                let info = sandbox.stub( toastService, 'info' );

                controller.ok( '', '2015-1-1', '2016-1-1' );

                expect( info.calledWith( { title: 'Palavra-chave é obrigatória' }) ).to.be.true;
            });

            it( 'should close modal passing added filter', () => {
                let hide = sandbox.stub( $mdDialog, 'hide' );
                let query = 'prodest';
                let dateMin = '2015-1-1';
                let dateMax = '2016-1-1';
                let pageNumber = 0;

                controller.ok( query, dateMin, dateMax );

                expect( hide.calledWith( { query, dateMin, dateMax, pageNumber } ) ).to.be.true;
            });
        });
    });
});

