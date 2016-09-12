/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */

import SepConsultaComponent from './sep-consulta.component';
import SepConsultaTemplate from './sep-consulta.component.html';
import { SepApiService, Process } from './shared/index';
import { SepConsultaController } from './sep-consulta.component.controller';
import { } from './shared/index';
import { ToastService } from '../shared/toast/index';
let expect = chai.expect;

/**
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( 'SEP/sep-consulta', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: SepConsultaController;
        let $scope;
        let sepApiService: SepApiService;
        let toastService: ToastService;
        let $ionicScrollDelegate;
        let onIonicBeforeEnterEvent;

        let processNumber = '68985037';

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

        beforeEach(() => {
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

            toastService = <ToastService><any>{
                info: () => { }
            };

            sepApiService = <SepApiService><any>{
                getProcessByNumber: () => {}
            };

            controller = new SepConsultaController( $scope, $ionicScrollDelegate, toastService, sepApiService );
        });

        describe( 'on instanciation', () => {
            it( 'should activate on $ionicView.beforeEnter event', () => {
                let activate = sandbox.stub( controller, 'activate' ); // replace original activate

                // simulates ionic before event trigger
                onIonicBeforeEnterEvent();

                expect( activate.called ).to.be.true;
            });
        });

        describe( 'activate()', () => {
            beforeEach(() => {
                controller.activate();
            });

            it( 'should have an undefined process', () => {
                expect( controller.process ).to.be.undefined;
            });

            it( 'should have empty process number', () => {
                expect( controller.processNumber ).to.be.empty;
            });

            it( 'should hot have been searched', () => {
                expect( controller.searched ).to.be.false;
            });

            it( 'should hide all updates', () => {
                expect( controller.showAllUpdates ).to.be.false;
            });
        });

        describe( 'getProcess( number )', () => {

            let getProcessByNumber: Sinon.SinonStub;

            beforeEach(() => {
                getProcessByNumber = sinon.stub( sepApiService, 'getProcessByNumber' );
                getProcessByNumber.returnsPromise().resolves( process );
            });

            it( 'should show validation message if no process number is provided', () => {
                let info = sandbox.stub( toastService, 'info' ); // replace original activate

                controller.getProcess( '' );
                expect( info.calledWith( { title: 'N° do processo é obrigatório' }) ).to.be.true;
                expect( getProcessByNumber.notCalled ).to.be.true;
            });

            it( 'should fill process with object from promise', () => {
                controller.getProcess( processNumber );
                expect( controller.process ).to.deep.equal( process );
            });

            it( 'should set searched to true', () => {
                controller.getProcess( processNumber );
                expect( controller.searched ).to.be.true;
            });

            it( 'should unset process value on error', () => {
                getProcessByNumber.returnsPromise().rejects();
                controller.process = process;

                controller.getProcess( processNumber );

                expect( controller.process ).to.be.undefined;
            });
        });

        describe( 'toggleUpdates()', () => {

            it( 'should invert showAllUpdates value', () => {
                let oldValue = controller.showAllUpdates;
                controller.toggleUpdates();
                expect( controller.showAllUpdates ).to.be.equal( !oldValue );
            });
        });

        describe( 'lastUpdate', () => {
            it( 'should return first update of process', () => {
                controller.process = process;
                expect( controller.lastUpdate ).to.deep.equal( controller.process!.updates[ 0 ] );
            });

            it( 'should return undefined if has no process', () => {
                controller.process = undefined;
                expect( controller.lastUpdate ).to.be.undefined;
            });
        });
    });

    describe( 'Component', () => {
        // test the component/directive itself
        let component = SepConsultaComponent();

        it( 'should use the right controller', () => {
            expect( component.controller ).to.equal( SepConsultaController );
        });

        it( 'should use the right template', () => {
            expect( component.template ).to.equal( SepConsultaTemplate );
        });

        it( 'should use controllerAs', () => {
            expect( component ).to.have.property( 'controllerAs' );
        });

        it( 'should use controllerAs "vm"', () => {
            expect( component.controllerAs ).to.equal( 'vm' );
        });

        it( 'should use bindToController: true', () => {
            expect( component ).to.have.property( 'bindToController' );
            expect( component.bindToController ).to.equal( true );
        });
    });
});

