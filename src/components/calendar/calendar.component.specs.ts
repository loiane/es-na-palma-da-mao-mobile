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

let expect = chai.expect;

/**
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( 'Calendar', () => {

    let sandbox;

    beforeEach( () => {
        sandbox = sinon.sandbox.create();
    } );

    afterEach( () => {
        sandbox.restore();
    } );

    describe( 'Module', () => {
        // test things about the component module
        // checking to see if it registers certain things and what not
        // test for best practices with naming too
        // test for routing

        it( 'Module', () => {
        } );
    } );

    describe( 'Controller', () => {
        let controller;
        let $scope;
        let calendarApiService;
        let onIonicBeforeEnterEvent;

        beforeEach( () => {
            $scope = {
                $on: ( event, callback ) => {
                    if ( event === '$ionicView.beforeEnter' ) {
                        onIonicBeforeEnterEvent = callback;
                    }
                }
            };

            calendarApiService = {
                getAvailableCalendars: sandbox.stub().returnsPromise(),
                getFullCalendars: sandbox.stub().returnsPromise()
            };

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
                sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                onIonicBeforeEnterEvent();

                expect( controller.activate.called ).to.be.true;
            } );
        } );

        describe( 'activate()', () => {
            beforeEach( () => {
                sandbox.stub( controller, 'getAvailableCalendars' );
                sandbox.stub( controller, 'loadCalendars' );

                controller.activate();
            } );

            it( 'should call getAvailableCalendars()', () => {
                expect( controller.getAvailableCalendars.calledOnce ).to.be.true;
            } );

            it( 'should call loadCalendars()', () => {
                expect( controller.loadCalendars.calledOnce ).to.be.true;
            } );
        } );

        describe( 'getAvailableCalendars()', () => {

            let availableCalendars = [ { name: 'SEFAZ' }, { name: 'SEGER' }, { name: 'SEJUS' } ];

            beforeEach( () => {
                calendarApiService.getAvailableCalendars.resolves( availableCalendars );
                controller.getAvailableCalendars();
            } );

            it( 'should fill available calendars list with calendars names', () => {
                expect( controller.availableCalendars ).to.deep.equal( [
                    'SEFAZ', 'SEGER', 'SEJUS'
                ] );
            } );

            it( 'should retrieve all available calendars', () => {
                expect( calendarApiService.getAvailableCalendars.called ).to.be.true;
            } );

            it( 'should select all available calendars', () => {
                expect( controller.availableCalendars ).to.deep.equal( controller.selectedCalendars );
            } );
        } );

        describe( 'loadCalendars( selectedCalendars )', () => {

            let selectedCalendars = [ 'SEFAZ', 'SEGER' ];
            let availableCalendars = [ { name: 'SEFAZ' }, { name: 'SEGER 2' }, { name: 'SEJUS' } ];
            let fullCalendars = [ { name: 'SEFAZ' }, { name: 'SEGER' }, { name: 'SEJUS' } ];

            beforeEach( () => {
                calendarApiService.getAvailableCalendars.resolves( availableCalendars );
                calendarApiService.getFullCalendars.resolves( fullCalendars );
                controller.loadCalendars( selectedCalendars );
            } );

            it( 'should retrieve selected calendars events', () => {
                expect( calendarApiService.getFullCalendars.calledWith( selectedCalendars ) ).to.be.true;

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
