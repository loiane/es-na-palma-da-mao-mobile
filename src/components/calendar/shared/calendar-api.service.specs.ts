/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */
import 'angular';
import { CalendarApiService } from './calendar-api.service';
import { Settings, ISettings } from '../../shared/settings/index';

let expect = chai.expect;

describe( 'CalendarApiService', () => {

    let sandbox: Sinon.SinonSandbox;
    let calendarApiService: CalendarApiService;
    let settings: ISettings;
    let $httpGet: Sinon.SinonStub;

    beforeEach( () => sandbox = sinon.sandbox.create() );
    afterEach( () => sandbox.restore() );

    beforeEach( () => {
        let $http: any = { get() {} };
        $httpGet = sandbox.stub( $http, 'get' );
        $httpGet.returnsPromise();

        settings = Settings.getInstance();
        calendarApiService = new CalendarApiService( $http, settings );
    } );

    describe( 'getAvailableCalendars()', () => {
        it( 'should call calendars api endpoint', () => {
            calendarApiService.getAvailableCalendars();

            expect( $httpGet.calledWith( settings.api.calendars ) ).to.be.true;
        } );

        it( 'should normalize response to response.data property', () => {
            let response = {
                data: [
                    { name: 'SEGER' }, { name: 'SEJUS' }, { name: 'PRODEST' }
                ]
            };
            $httpGet.returnsPromise().resolves( response );

            calendarApiService.getAvailableCalendars().then( ( calendars ) => {
                expect( calendars ).to.deep.equal( response.data );
            } );
        } );
    } );

    describe( 'getFullCalendars( calendars, options = {} )', () => {

        describe( 'always', () => {

            it( 'should call calendars events api endpoint', () => {

                calendarApiService.getFullCalendars( [] );

                expect( $httpGet.calledWith( `${settings.api.calendars}/events`) ).to.be.true;
            } );

            it( 'should normalize response to response.data property', () => {
                let response = {
                    data: [
                        { name: 'SEGER' }, { name: 'SEJUS' }, { name: 'PRODEST' }
                    ]
                };
                $httpGet.returnsPromise().resolves( response );

                calendarApiService.getFullCalendars( [], {} ).then( ( calendars ) => {
                    expect( calendars ).to.deep.equal( response.data );
                } );
            } );
        } );

        describe( 'with no provided calendars', () => {

            it( 'should use defaut empty calendar list', () => {

                calendarApiService.getFullCalendars();
                calendarApiService.getFullCalendars( undefined );

                expect( $httpGet.getCall( 0 ).args[ 1 ].params.calendars ).to.deep.equal( [] );
                expect( $httpGet.getCall( 1 ).args[ 1 ].params.calendars ).to.deep.equal( [] );
            } );
        } );

        describe( 'with provided options', () => {

            it( 'should use all provided options', () => {

                let date = new Date( 2022, 10, 10 );
                let selectedCalendars = [ 'SEJUS', 'SEGER' ];
                let options = {
                    singleEvents: false,
                    orderBy: 'endTime',
                    timeMin: date,   // começo do ano corrente
                    timeMax: date, // final do ano corrente
                    timeZone: 'America/New_York',
                    calendars: [ 'SEJUS' ]
                };

                calendarApiService.getFullCalendars( selectedCalendars, options );

                let spyCall = $httpGet.getCall( 0 );

                expect( spyCall.args[ 1 ].params.calendars ).to.equal( options.calendars );
                expect( spyCall.args[ 1 ].params.singleEvents ).to.equal( options.singleEvents );
                expect( spyCall.args[ 1 ].params.orderBy ).to.equal( options.orderBy );
                expect( spyCall.args[ 1 ].params.timeMin.getTime() ).to.equal( options.timeMin.getTime() );
                expect( spyCall.args[ 1 ].params.timeMax.getTime() ).to.equal( options.timeMax.getTime() );
                expect( spyCall.args[ 1 ].params.timeZone ).to.equal( options.timeZone );
            } );
        } );

        describe( 'with no options', () => {

            it( 'should call calendars events endpoint with default filters', () => {

                let today = new Date();
                let defaults = {
                    singleEvents: true,
                    orderBy: 'startTime',
                    timeMin: new Date( today.getFullYear(), 0, 1, 0 ),   // começo do ano corrente
                    timeMax: new Date( today.getFullYear(), 11, 31, 0 ), // final do ano corrente
                    timeZone: 'America/Sao_Paulo' // an option!
                };

                calendarApiService.getFullCalendars( [] );

                let spyCall = $httpGet.getCall( 0 );

                expect( spyCall.args[ 1 ].params.singleEvents ).to.equal( defaults.singleEvents );
                expect( spyCall.args[ 1 ].params.orderBy ).to.equal( defaults.orderBy );
                expect( spyCall.args[ 1 ].params.timeMin.getTime() ).to.equal( defaults.timeMin.getTime() );
                expect( spyCall.args[ 1 ].params.timeMax.getTime() ).to.equal( defaults.timeMax.getTime() );
                expect( spyCall.args[ 1 ].params.timeZone ).to.equal( defaults.timeZone );
            } );
        } );
    } );
} );



