/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */

import { AboutController } from './about.component.controller';
import AboutComponent from './about.component';
import AboutTemplate from './about.component.html';
import { TeamsApiService, TeamMember } from './shared/index';
import packageJson from '../../package.json!';

let expect = chai.expect;

/**
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( 'About', () => {

    let sandbox;
    beforeEach( () => sandbox = sinon.sandbox.create() );
    afterEach( () => sandbox.restore() );

     describe( 'Controller', () => {
        let controller: AboutController;
        let teamsApiService: TeamsApiService;
        let onIonicBeforeEnterEvent;
        let teamMembers = <TeamMember[]>[
            { login: 'login1', avatar_url: 'avatar_url1' },
            { login: 'login2', avatar_url: 'avatar_url2' }
        ];

        beforeEach( () => {
            let $window = sandbox.stub();
            let $scope = <any>{
                $on: ( event, callback ) => {
                    if ( event === '$ionicView.beforeEnter' ) {
                        onIonicBeforeEnterEvent = callback;
                    }
                }
            };
            teamsApiService = <TeamsApiService>{
                getTeamMembers: sandbox.stub().returnsPromise().resolves( teamMembers )
            };

            controller = new AboutController( $scope, $window, teamsApiService );
        } );

        describe( 'on instantiation', () => {

            it( 'should have a empty team members list', () => {
                expect( controller.teamMembers ).to.be.empty;
            } );

            it( 'should activate on $ionicView.beforeEnter event', () => {
                let activate = sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                onIonicBeforeEnterEvent();

                expect( activate.called ).to.be.true;
            } );

            it( 'controller.project should contain package.json', () => {
                expect( controller.project ).to.not.be.undefined;
                expect( controller.project ).to.equal( packageJson );
            } );
        } );

        describe( 'activate()', () => {
            beforeEach( () => {
                controller.activate();
            } );

            it( 'should fill team members list', () => {
                expect( controller.teamMembers).to.equal( teamMembers );
            } );
        } );
     } );


    describe( 'Component', () => {
        // test the component/directive itself
        let component = AboutComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( AboutController );
        } );

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( AboutTemplate );
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
