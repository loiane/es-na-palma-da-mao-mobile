/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */
import 'angular';
import DetranApiService from './detran-api.service.js';
import settings from '../../../shared/settings.js';

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

} );

