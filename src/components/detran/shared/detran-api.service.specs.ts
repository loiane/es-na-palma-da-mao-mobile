/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */
import DetranApiService from './detran-api.service';
import settings from '../../shared/settings';

let expect = chai.expect;

describe( 'DetranApiService', () => {

    let sandbox;
    let detranApiService;
    let $http;

    beforeEach( () => {
        sandbox = sinon.sandbox.create();

        $http = {
            get: sandbox.stub().returnsPromise()
        };

        detranApiService = new DetranApiService( $http, settings );
    } );

    afterEach( () => {
        sandbox.restore();
    } );

    describe( 'getDriverData()', () => {

        it( 'should call driver data api endpoint', () => {
            detranApiService.getDriverData( );

            expect( $http.get.calledWith( settings.api.detran + '/driverData' ) ).to.be.true;
        } );

        it( 'should normalize response to response.data property', () => {
            let response = {
                data: {
                    date: '2016/07/01'
                }
            };

            $http.get.resolves( response );

            detranApiService.getDriverData().then( ( data ) => {
                expect( data ).to.deep.equal( response.data );
            } );
        } );

    } );

    describe( 'getTickets()', () => {

        it( 'should call tickets api endpoint', () => {
            detranApiService.getTickets( );

            expect( $http.get.calledWith( settings.api.detran + '/tickets' ) ).to.be.true;
        } );

        it( 'should normalize response to response.data property', () => {
            let response = {
                data: {
                    date: '2016/07/01'
                }
            };

            $http.get.resolves( response );

            detranApiService.getTickets().then( ( data ) => {
                expect( data ).to.deep.equal( response.data );
            } );
        } );

    } );

} );

