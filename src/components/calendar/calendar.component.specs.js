/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */

import CalendarController from './calendar.component.controller.js';
import CalendarComponent from './calendar.component.js';
import CalendarTemplate from './calendar.component.html!text';

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
        let $ionicLoading;

        beforeEach( () => {
            $scope = {
                $on: sandbox.stub()
            };
            $ionicLoading = {
                show: sandbox.stub().returnsPromise().resolves(),
                hide: sandbox.stub().returnsPromise().resolves()
            };
            calendarApiService = {
                getAvailableCalendars: sandbox.stub().returnsPromise(),
                getFullCalendars: sandbox.stub().returnsPromise()
            };

            controller = new CalendarController( $scope, calendarApiService, $ionicLoading );
        } );

        describe( 'on instanciation', () => {

            it( 'should have a empty calendar', () => {
                expect( controller.calendar ).to.be.empty;
            } );

            it( 'no calendar should be selected', () => {
                expect( controller.selectedCalendars ).to.be.empty;
            } );

            it( 'no calendar should be available', () => {
                expect( controller.availableCalendars ).to.be.empty;
            } );
        } );

        describe( 'activate()', () => {
            beforeEach( () => {
                sandbox.stub( controller, 'getAvailableCalendars' );
                sandbox.stub( controller, 'loadEvents' );

                controller.activate();
            } );

            it( 'should show loading spinner immediately', () => {
                expect( controller.$ionicLoading.show.called ).to.be.true;
            } );

            it( 'should call getAvailableCalendars()', () => {
                expect( controller.getAvailableCalendars.calledOnce ).to.be.true;
            } );

            it( 'should call loadEvents()', () => {
                expect( controller.loadEvents.calledOnce ).to.be.true;
            } );

            it( 'should hide loading spinner on complete', () => {
                expect( controller.$ionicLoading.hide.called ).to.be.true;
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

        describe( 'loadEvents()', () => {

            let selectedCalendars = [ 'SEFAZ', 'SEGER' ];
            let availableCalendars = [ { name: 'SEFAZ' }, { name: 'SEGER 2' }, { name: 'SEJUS' } ];
            let fullCalendars = [ { name: 'SEFAZ' }, { name: 'SEGER' }, { name: 'SEJUS' } ];

            beforeEach( () => {
                calendarApiService.getAvailableCalendars.resolves( availableCalendars );
                calendarApiService.getFullCalendars.resolves( fullCalendars );
                controller.loadEvents( selectedCalendars );
            } );

            it( 'should show loading spinner after 200ms', () => {
                expect( controller.$ionicLoading.show.calledWith( { delay: 200 } ) ).to.be.true;
            } );

            it( 'should retrieve selected calendars events', () => {
                expect( calendarApiService.getFullCalendars.calledWith( selectedCalendars ) ).to.be.true;

            } );

            it( 'should fill calendar event sources', () => {
                expect( controller.calendar.eventSources ).to.equal( fullCalendars );
            } );

            it( 'should hide loading spinner on complete', () => {
                expect( controller.$ionicLoading.hide.calledOnce ).to.be.true;
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
