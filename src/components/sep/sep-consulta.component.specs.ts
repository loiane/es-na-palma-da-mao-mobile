/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */

import SepConsultaComponent from './sep-consulta.component';
import SepConsultaTemplate from './sep-consulta.component.html';
import { Process, ProcessUpdate } from './shared/index';
import { SepConsultaController } from './sep-consulta.component.controller';

let expect = chai.expect;

/**
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( 'SepConsulta', () => {

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
        let sepApiService;
        let toastService;
        let $ionicScrollDelegate;
        let $ionicLoading;
        let onIonicBeforeEnterEvent;

        let processNumber = 68985037;

        let process: Process = {
            number: '68985037',
            parts: [
                'PRODEST - GEREH'
            ],
            subject: 'AUTORIZACAO',
            summary: 'PEDIDO DE AUTORIZAÇÃO DE SUBSTITUIÇÃO DO GERENTE DA GESIN - GERÊNCIA DE SISTEMAS.',
            status: 'EM ANDAMENTO',
            updates: [
                {
                    date: '22/01/2015 08:56:00',
                    agency: 'INSTITUTO DE TECNOLOGIA DE INFORMACAO E COMUNICACAO DO ESTADO DO ESPIRITO SANTO',
                    area: 'GERENCIA DE SISTEMAS DE INFORMACAO',
                    status: 'EM ANDAMENTO'
                },
                {
                    date: '21/01/2015 15:40:00',
                    agency: 'INSTITUTO DE TECNOLOGIA DE INFORMACAO E COMUNICACAO DO ESTADO DO ESPIRITO SANTO',
                    area: 'GERENCIA DE RECURSOS HUMANOS',
                    status: 'EM ANDAMENTO'
                },
                {
                    date: '20/01/2015 17:57:00',
                    agency: 'INSTITUTO DE TECNOLOGIA DE INFORMACAO E COMUNICACAO DO ESTADO DO ESPIRITO SANTO',
                    area: 'GERENCIA DE FINANCAS E ORCAMENTOS',
                    status: 'EM ANDAMENTO'
                },
                {
                    date: '14/01/2015 11:45:00',
                    agency: 'INSTITUTO DE TECNOLOGIA DE INFORMACAO E COMUNICACAO DO ESTADO DO ESPIRITO SANTO',
                    area: 'DIRETORIA TECNICA',
                    status: 'EM ANDAMENTO'
                },
                {
                    date: '14/01/2015 11:39:00',
                    agency: 'INSTITUTO DE TECNOLOGIA DE INFORMACAO E COMUNICACAO DO ESTADO DO ESPIRITO SANTO',
                    area: 'GERENCIA DE RECURSOS HUMANOS',
                    status: 'EM ANDAMENTO'
                },
                {
                    date: '14/01/2015 11:31:40',
                    agency: 'INSTITUTO DE TECNOLOGIA DE INFORMACAO E COMUNICACAO DO ESTADO DO ESPIRITO SANTO',
                    area: 'GERENCIA DE ADMINISTRACAO GERAL',
                    status: 'AUTUADO'
                }
            ],
            district: 'VITÓRIA',
            extra: 'GEREH'
        };

        let lastUpdate = {
            date: '22/01/2015 08:56:00',
            agency: 'INSTITUTO DE TECNOLOGIA DE INFORMACAO E COMUNICACAO DO ESTADO DO ESPIRITO SANTO',
            area: 'GERENCIA DE SISTEMAS DE INFORMACAO',
            status: 'EM ANDAMENTO'
        };

        let firstUpdate = {
            date: '14/01/2015 11:31:40',
            agency: 'INSTITUTO DE TECNOLOGIA DE INFORMACAO E COMUNICACAO DO ESTADO DO ESPIRITO SANTO',
            area: 'GERENCIA DE ADMINISTRACAO GERAL',
            status: 'AUTUADO'
        };

        let hiddenUpdates = [
            {
                date: '21/01/2015 15:40:00',
                agency: 'INSTITUTO DE TECNOLOGIA DE INFORMACAO E COMUNICACAO DO ESTADO DO ESPIRITO SANTO',
                area: 'GERENCIA DE RECURSOS HUMANOS',
                status: 'EM ANDAMENTO'
            },
            {
                date: '20/01/2015 17:57:00',
                agency: 'INSTITUTO DE TECNOLOGIA DE INFORMACAO E COMUNICACAO DO ESTADO DO ESPIRITO SANTO',
                area: 'GERENCIA DE FINANCAS E ORCAMENTOS',
                status: 'EM ANDAMENTO'
            },
            {
                date: '14/01/2015 11:45:00',
                agency: 'INSTITUTO DE TECNOLOGIA DE INFORMACAO E COMUNICACAO DO ESTADO DO ESPIRITO SANTO',
                area: 'DIRETORIA TECNICA',
                status: 'EM ANDAMENTO'
            },
            {
                date: '14/01/2015 11:39:00',
                agency: 'INSTITUTO DE TECNOLOGIA DE INFORMACAO E COMUNICACAO DO ESTADO DO ESPIRITO SANTO',
                area: 'GERENCIA DE RECURSOS HUMANOS',
                status: 'EM ANDAMENTO'
            },
            {
                date: '14/01/2015 11:31:40',
                agency: 'INSTITUTO DE TECNOLOGIA DE INFORMACAO E COMUNICACAO DO ESTADO DO ESPIRITO SANTO',
                area: 'GERENCIA DE ADMINISTRACAO GERAL',
                status: 'AUTUADO'
            }
        ];

        beforeEach( () => {
            $scope = {
                $on: ( event, callback ) => {
                    if ( event === '$ionicView.beforeEnter' ) {
                        onIonicBeforeEnterEvent = callback;
                    }
                }
            };

            $ionicScrollDelegate = {
                scrollTo: sandbox.stub().returnsPromise().resolves()
            };

            toastService = {
                show: sandbox.stub()
            };

            $ionicLoading = {
                show: sandbox.stub().returnsPromise().resolves(),
                hide: sandbox.stub().returnsPromise().resolves()
            };

            sepApiService = {
                getProcessByNumber: sandbox.stub().returnsPromise()
            };

            controller = new SepConsultaController( $scope, $ionicScrollDelegate, $ionicLoading, toastService, sepApiService );
        } );

        describe( 'on instanciation', () => {
            it( 'should activate on $ionicView.beforeEnter event', () => {
                sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                onIonicBeforeEnterEvent();

                expect( controller.activate.called ).to.be.true;
            } );
        } );

        describe( 'activate()', () => {
            beforeEach( () => {
                controller.activate();
            } );

            it( 'should have an undefined process', () => {
                expect( controller.process ).to.be.undefined;
            } );

            it( 'should have see more message button', () => {
                expect( controller.seeMoreUpdates ).to.be.equal( 'VER MAIS' );
            } );

            it( 'should have empty process number', () => {
                expect( controller.processNumber ).to.be.empty;
            } );

            it( 'should hot have been populated', () => {
                expect( controller.populated ).to.be.false;
            } );

            it( 'should hide all updates', () => {
                expect( controller.showAllUpdates ).to.be.false;
            } );
        } );

        describe( 'getProcess( number )', () => {
            beforeEach( () => {
                sepApiService.getProcessByNumber.resolves( process );
                controller.getProcess( processNumber );
            } );

            it( 'should fill process with object from promise', () => {
                expect( controller.process ).to.deep.equal( process );
            } );

            it( 'should set populated to true', () => {
                expect( controller.populated ).to.be.true;
            } );

            it( 'should unset process value on error', () => {
                sepApiService.getProcessByNumber.rejects();
                controller.getProcess( processNumber );

                expect( controller.process ).to.be.undefined;
            } );
        } );

        describe( 'toggleUpdates()', () => {

            it( 'should invert showAllUpdates value', () => {
                let oldValue = controller.showAllUpdates;
                controller.toggleUpdates();
                expect( controller.showAllUpdates ).to.be.equal( !oldValue );
            } );

            it( 'should change seeMoreUpdates value to OCULTAR if showAllUpdates === false', () => {
                controller.showAllUpdates = false;
                controller.toggleUpdates();
                expect( controller.seeMoreUpdates ).to.be.equal( 'OCULTAR' );

            } );

            it( 'should change seeMoreUpdates value to VER MAIS if showAllUpdates === true', () => {
                controller.showAllUpdates = true;
                controller.toggleUpdates();
                expect( controller.seeMoreUpdates ).to.be.equal( 'VER MAIS' );
            } );

            it( 'should call $ionicScrollDelegate.scrollTo() if showAllUpdates === false', () => {
                controller.showAllUpdates = false;
                controller.toggleUpdates();
                expect( controller.$ionicScrollDelegate.scrollTo.called ).to.be.true;
            } );
        } );

        describe( 'firstUpdate', () => {
            beforeEach( () => {
                sepApiService.getProcessByNumber.resolves( process );
            } );

            it( 'should return last item if has process', () => {
                controller.getProcess( processNumber );
                expect( controller.firstUpdate ).to.deep.equal( firstUpdate );
            } );

            it( 'should return nothing if has no process', () => {
                expect( controller.firstUpdate ).to.be.undefined;
            } );
        } );

        describe( 'lastUpdate', () => {
            beforeEach( () => {
                sepApiService.getProcessByNumber.resolves( process );
            } );

            it( 'should return first item if has process', () => {
                controller.getProcess( processNumber );
                expect( controller.lastUpdate ).to.deep.equal( lastUpdate );
            } );

            it( 'should return nothing if has no process', () => {
                expect( controller.lastUpdate ).to.be.undefined;
            } );
        } );

        describe( 'hiddenUpdates', () => {
            beforeEach( () => {
                sepApiService.getProcessByNumber.resolves( process );
            } );

            it( 'should return all but the first item if has process', () => {
                controller.getProcess( processNumber );
                expect( controller.hiddenUpdates ).to.deep.equal( hiddenUpdates );
            } );

            it( 'should return nothing if has no process', () => {
                expect( controller.hiddenUpdates ).to.be.undefined;
            } );
        } );

        describe( 'hasProcess', () => {
            beforeEach( () => {
                sepApiService.getProcessByNumber.resolves( process );
            } );

            it( 'should return all but the first item if has process', () => {
                controller.getProcess( processNumber );
                expect( controller.hasProcess ).to.be.true;
            } );

            it( 'should return all but the first item if has process', () => {
                expect( controller.hasProcess ).to.be.false;
            } );
        } );
    } );

    describe( 'Component', () => {
        // test the component/directive itself
        let component = SepConsultaComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( SepConsultaController );
        } );

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( SepConsultaTemplate );
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
