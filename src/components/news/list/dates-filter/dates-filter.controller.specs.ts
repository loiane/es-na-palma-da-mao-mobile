import { DatesFilterController } from './dates-filter.controller';

let expect = chai.expect;

describe( 'News/news-list/dates-filter', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: DatesFilterController;
        let $mdDialog;

        beforeEach(() => {
            $mdDialog = { hide() { }, cancel() { } };
            controller = new DatesFilterController( $mdDialog );
        });

        describe( 'cancel()', () => {
            it( 'should cancel modal', () => {
                let cancel = sandbox.stub( $mdDialog, 'cancel' );

                controller.cancel();

                expect( cancel.called ).to.be.true;
            });
        });


        describe( 'ok()', () => {
            it( 'should close modal passing filter data', () => {
                let hide = sandbox.stub( $mdDialog, 'hide' );
                let dateMin = new Date( '01-01-2016' );
                let dateMax = new Date( '05-05-2016' );

                controller.ok( dateMin, dateMax );

                expect( hide.calledWith( { dateMin, dateMax } ) ).to.be.true;
            });
        });
    });
});
