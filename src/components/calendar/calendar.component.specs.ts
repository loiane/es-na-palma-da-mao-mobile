/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */

import { CalendarController } from './calendar.component.controller';
import CalendarComponent from './calendar.component';
import CalendarTemplate from './calendar.component.html';
import { CalendarApiService } from './shared/calendar-api.service';

let expect = chai.expect;

/**
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( 'Calendar', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach( () => sandbox = sinon.sandbox.create() );
    afterEach( () => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: CalendarController;
        let calendarApiService: CalendarApiService;
        let onIonicBeforeEnterEvent;

        // mocka data
        let availableCalendars = [ { name: 'SEFAZ' }, { name: 'SEGER' }, { name: 'SEJUS' } ];
        let availableCalendarsNames = availableCalendars.map( calendar => calendar.name );
        let selectedCalendars = [ 'SEFAZ', 'SEGER' ];
        let fullCalendars = [ { name: 'SEFAZ' }, { name: 'SEGER' }, { name: 'SEJUS' }, { name: 'SECOM' } ];

        beforeEach( () => {
            let $scope = <any>{
                $on: ( event, callback ) => {
                    if ( event === '$ionicView.beforeEnter' ) {
                        onIonicBeforeEnterEvent = callback;
                    }
                }
            };
            calendarApiService = <CalendarApiService>{ getAvailableCalendars() {}, getFullCalendars() {} };
            controller = new CalendarController( $scope, calendarApiService );
        } );

        describe( 'on instantiation', () => {

            it( 'should have a empty calendar', () => {
                expect( controller.calendar ).to.be.empty;
            } );

            it( 'no calendar should be selected', () => {
                expect( controller.selectedCalendars ).to.be.empty;
            } );

            it( 'no calendar should be available', () => {
                expect( controller.availableCalendars ).to.be.empty;
            } );

            it( 'should activate on $ionicView.beforeEnter event', () => {
                let activate = sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                onIonicBeforeEnterEvent();

                expect( activate.called ).to.be.true;
            } );
        } );

        describe( 'activate()', () => {

            let getAvailableCalendars: Sinon.SinonSpy;
            let loadCalendars: Sinon.SinonSpy;

            beforeEach( () => {
                getAvailableCalendars = sandbox.spy( controller, 'getAvailableCalendars' );
                loadCalendars = sandbox.spy( controller, 'loadCalendars' );

                sandbox.stub( calendarApiService, 'getAvailableCalendars' ).returnsPromise().resolves( availableCalendars );
                sandbox.stub( calendarApiService, 'getFullCalendars' ).returnsPromise().resolves( fullCalendars );

                controller.activate();
            } );

            it( 'should call getAvailableCalendars()', () => {
                expect( getAvailableCalendars.calledOnce ).to.be.true;
            } );

            it( 'should call loadCalendars( availableCalendars )', () => {
                expect( loadCalendars.calledWith( availableCalendarsNames ) ).to.be.true;
            } );
        } );


        describe( 'getAvailableCalendars()', () => {

           let getAvailableCalendars: Sinon.SinonStub;

            beforeEach( () => {
                getAvailableCalendars = sandbox.stub( calendarApiService, 'getAvailableCalendars' );
                getAvailableCalendars.returnsPromise().resolves( availableCalendars );

                controller.getAvailableCalendars();
            } );

            it( 'should fill available calendars list with calendars names', () => {
                expect( controller.availableCalendars ).to.deep.equal( availableCalendarsNames );
            } );

            it( 'should retrieve all available calendars', () => {
                expect( getAvailableCalendars.called ).to.be.true;
            } );

            it( 'should select all available calendars', () => {
                expect( controller.selectedCalendars ).to.deep.equal( availableCalendarsNames );
            } );
        } );

        describe( 'loadCalendars( selectedCalendars )', () => {

            let getFullCalendars: Sinon.SinonStub;

            beforeEach( () => {
                getFullCalendars = sandbox.stub( calendarApiService, 'getFullCalendars' );
                getFullCalendars.returnsPromise().resolves( fullCalendars );
                controller.loadCalendars( selectedCalendars );
            } );

            it( 'should retrieve selected calendars events', () => {
                expect( getFullCalendars.calledWith( selectedCalendars ) ).to.be.true;

            } );

            it( 'should fill calendar.eventSources', () => {
                expect( controller.calendar.eventSources ).to.equal( fullCalendars );
            } );
        } );

        describe( 'onViewTitleChanged( title )', () => {
            it( 'should assign title to controller.viewTitle property', () => {
                let title = 'Title Fake';

                controller.onViewTitleChanged( title );

                expect( controller.viewTitle ).to.equal( title );
            } );
        } );

        describe( 'today()', () => {
            it( 'should assign current date to calendar.currentDate property', () => {

                let futureDate = new Date( 2020, 10, 10 );
                let today = new Date();

                controller.calendar.currentDate = futureDate;

                expect( controller.calendar.currentDate.getTime() ).to.equal( futureDate.getTime() );

                controller.today();

                expect( controller.calendar.currentDate.getTime() ).to.equal( today.getTime() );
            } );
        } );

        describe( 'isToday()', () => {
            it( 'should check if calendar current date is today', () => {

                let futureDate = new Date( 2020, 10, 10 );
                let today = new Date();

                controller.calendar.currentDate = futureDate;

                expect( controller.isToday() ).to.be.false;

                controller.calendar.currentDate = today;

                expect( controller.isToday() ).to.be.true;
            } );

            it( 'should ignore date time part on comparation', () => {

                let todayMorning = new Date();
                let todayAfternoon = new Date();

                todayMorning.setHours( 9, 0, 0, 0 );
                todayAfternoon.setHours( 22, 0, 0, 0 );

                controller.calendar.currentDate = todayMorning;
                expect( controller.isToday() ).to.be.true;

                controller.calendar.currentDate = todayAfternoon;
                expect( controller.isToday() ).to.be.true;
            } );
        } );
    } );

    describe( 'Component', () => {
        // test the component/directive itself
        let component = CalendarComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( CalendarController );
        } );

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( CalendarTemplate );
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

