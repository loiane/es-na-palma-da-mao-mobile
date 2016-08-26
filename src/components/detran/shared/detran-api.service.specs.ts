/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */
import 'angular';
import { DetranApiService } from './detran-api.service';
import { Settings, ISettings } from '../../shared/settings/index';

let expect = chai.expect;

describe( 'DetranApiService', () => {

    let sandbox;
    let detranApiService: DetranApiService;
    let $http;
    const settings: ISettings = Settings.getInstance();
    const fakeResponse = {
                data: {
                    fake: 'fakeValue'
                }
            };

    beforeEach( () => {
        sandbox = sinon.sandbox.create();

        $http = {
            get: sandbox.stub().returnsPromise().resolves( fakeResponse ),
            post: sandbox.stub().returnsPromise()
        };

        detranApiService = new DetranApiService( $http, settings );
    } );

    afterEach( () => {
        sandbox.restore();
    } );


    describe( 'getDriverData()', () => {

        it( 'should call /driver endpoint on detran api', () => {
            detranApiService.getDriverData();

            expect( $http.get.calledWith( `${settings.api.detran}/driver` ) ).to.be.true;
        } );

        it( 'should normalize response to response.data property', () => {
            detranApiService.getDriverData().then( ( data ) => {
                expect( data ).to.deep.equal( fakeResponse.data );
            } );
        } );

    } );


    describe( 'getDriverTickets()', () => {

        it( 'should call /driver/tickets endpoint on detran api', () => {
            detranApiService.getDriverTickets( );

            expect( $http.get.calledWith( `${settings.api.detran}/driver/tickets` ) ).to.be.true;
        } );

        it( 'should normalize response to response.data property', () => {
            detranApiService.getDriverTickets().then( ( data ) => {
                expect( data ).to.deep.equal( fakeResponse.data );
            } );
        } );
    } );


    describe( 'getVehicleTickets()', () => {

        it( 'should call /vehicle/tickets endpoint on detran api', () => {
            const vehicle = { plate: 'ovl-7878', renavam: '12344555' };
            const params = { params: vehicle };

            detranApiService.getVehicleTickets( vehicle );

            expect( $http.get.calledWith( `${settings.api.detran}/vehicle/tickets`, params ) ).to.be.true;
        } );

        it( 'should normalize response to response.data property', () => {
            detranApiService.getDriverTickets().then( ( data ) => {
                expect( data ).to.deep.equal( fakeResponse.data );
            } );
        } );
    } );

    describe( 'saveLicense()', () => {

        it( 'should call /Perfil/SalvarCNH endpoint on acessocidadao api', () => {

            const license = { registerNumber: '1234', ballot: '3423434' };
            const params = { numero: license.registerNumber, cedula: license.ballot };

            detranApiService.saveLicense( license );

            expect( $http.post.calledWith( `${settings.api.acessocidadao}/Perfil/SalvarCNH`, params ) ).to.be.true;
        } );
    } );
} );

