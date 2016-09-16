import { LoginController } from './login.component.controller';
import { AuthenticationService, Identity } from '../shared/authentication/index';
import { PushConfig } from '../shared/push/index';
import { environment, $stateMock, $windowMock, dialogServiceMock, toastServiceMock } from '../shared/tests/index';

let expect = chai.expect;

describe( 'Login', () => {

    let sandbox: Sinon.SinonSandbox;
    beforeEach(() => sandbox = sinon.sandbox.create() );
    afterEach(() => sandbox.restore() );

    describe( 'Controller', () => {
        let controller: LoginController;
        let pushConfig: PushConfig;

        // dialogs
        let dialogConfirm: Sinon.SinonStub;
        let dialogConfirmPromise: Sinon.SinonPromise;
        let toastInfo: Sinon.SinonStub;
        let toastError: Sinon.SinonStub;

        // angular
        let $windowOpen: Sinon.SinonStub;

        // api
        let authenticationService: AuthenticationService;
        let authLoginPromise: Sinon.SinonPromise;
        let authLogin: Sinon.SinonStub;
        let pushConfigInit: Sinon.SinonStub;
        // let digitsLoginPromise: Sinon.SinonPromise;
        // let googleLoginPromise: Sinon.SinonPromise;
        // let facebookLoginPromise: Sinon.SinonPromise;
        let signInAcessoCidadao: Sinon.SinonStub;

        // models
        let identity: Identity;

        beforeEach(() => {
            environment.refresh();
            authenticationService = <AuthenticationService><any>{
                login() { },
                facebookLogin() { },
                googleLogin() { },
                digitsLogin() { }
            };
            pushConfig = <PushConfig>{ init() { } };

            controller = new LoginController(
                $stateMock,
                authenticationService,
                dialogServiceMock,
                toastServiceMock,
                $windowMock,
                environment.$ionicHistory,
                pushConfig );

            // setup stubs
            dialogConfirm = sandbox.stub( dialogServiceMock, 'confirm' );
            dialogConfirmPromise = dialogConfirm.returnsPromise();
            $windowOpen = sandbox.stub( $windowMock, 'open' );
            toastInfo = sandbox.stub( toastServiceMock, 'info' );
            toastError = sandbox.stub( toastServiceMock, 'error' );

            identity = <Identity>{
                client_id: '21312341324',
                client_secret: '132132323',
                grant_type: 'type',
                scope: 'scope',
                refresh_token: '234jhj546hjhdjfgh'
            };

            pushConfigInit = sandbox.stub( pushConfig, 'init' );
            // digitsLoginPromise = sandbox.stub( authenticationService, 'digitsLogin' ).returnsPromise();
            // googleLoginPromise = sandbox.stub( authenticationService, 'googleLogin' ).returnsPromise();
            // facebookLoginPromise = sandbox.stub( authenticationService, 'facebookLogin' ).returnsPromise();
            signInAcessoCidadao = sandbox.stub( controller, 'signInAcessoCidadao' );
            authLogin = sandbox.stub( authenticationService, 'login' );
            authLoginPromise = authLogin.returnsPromise();
        });

        describe( 'on instantiation', () => {
            it( 'should have a blank user', () => {
                expect( controller.user ).to.be.deep.equal( { username: '', password: '' });
            });

            it( 'should not be processing login', () => {
                expect( controller.processingLogin ).to.be.false;
            });

            it( 'should have pre-defined error messages', () => {
                expect( controller.errorMsgs ).to.be.deep.equal( {
                    accountNotLinked: 'User not found.' // Verification message with AcessoCidadao
                });
            });
        });

        describe( 'isAccountNotLinked(data)', () => {
            it( 'should return true if data.error message is "User not found."', () => {
                expect( controller.isAccountNotLinked( { error: 'User not found.' }) ).to.be.true;
            });
        });

        describe( 'showDialogAccountNotLinked()', () => {
            it( 'should show confirm dialog', () => {
                controller.showDialogAccountNotLinked();

                expect( dialogConfirm.calledWithExactly( {
                    title: 'Conta não vinculada',
                    content: 'Acesse utilizando o usuário e senha ou clique para criar uma nova conta',
                    ok: 'Criar conta'
                }) ).to.be.true;
            });

            it( 'should open acesso cidadão web site on dialog confirm', () => {
                dialogConfirmPromise.resolves();

                controller.showDialogAccountNotLinked();

                expect( $windowOpen.calledWithExactly( 'https://acessocidadao.es.gov.br/Conta/VerificarCPF', '_system' ) ).to.be.true;
            });

            it( 'should not open acesso cidadão web site on dialog cancel', () => {
                dialogConfirmPromise.rejects();

                controller.showDialogAccountNotLinked();

                expect( $windowOpen.notCalled ).to.be.true;
            });
        });

        describe( 'login()', () => {
            beforeEach(() => {
                controller.processingLogin = false;
                controller.user = { username: 'joão', password: '123456' };
            });

            it( 'should put controller on processing mode', () => {
                controller.processingLogin = false;

                controller.login();

                expect( controller.processingLogin ).to.be.true;
            });

            it( 'should show validation message if login or password is not provided', () => {
                controller.user = { username: '', password: '123456' };
                controller.login();
                controller.user = { username: '123456', password: '' };
                controller.login();

                expect( toastInfo.calledTwice ).to.be.true;
                expect( toastInfo.calledWithExactly( { title: 'Login e senha são obrigatórios' }) ).to.be.true;
                expect( authLogin.notCalled ).to.be.true;
            });

            it( 'should authenticate user on acesso cidadão', () => {
                controller.login();

                expect( authLogin.calledWithExactly( controller.user.username, controller.user.password ) ).to.be.true;
            });


            it( 'should call success callback on acesso cidadão authentication success', () => {
                let onAcessoCidadaoLoginSuccess = sandbox.stub( controller, 'onAcessoCidadaoLoginSuccess' );
                authLoginPromise.resolves();

                controller.login();

                expect( onAcessoCidadaoLoginSuccess.calledOnce ).to.be.true;
            });

            it( 'should call error callback on acesso cidadão authentication error', () => {
                let onAcessoCidadaoLoginError = sandbox.stub( controller, 'onAcessoCidadaoLoginError' );
                authLoginPromise.rejects();

                controller.login();

                expect( onAcessoCidadaoLoginError.calledOnce ).to.be.true;
            });


            it( 'should exit processing mode if auth request successful', () => {
                authLoginPromise.resolves();

                controller.login();

                expect( controller.processingLogin ).to.be.false;
            });

            it( 'should exit processing mode if auth request failed', () => {
                authLoginPromise.rejects();

                controller.login();

                expect( controller.processingLogin ).to.be.false;
            });
        });

        describe( 'onAcessoCidadaoLoginSuccess()', () => {

            it( 'should init push config', () => {
                controller.onAcessoCidadaoLoginSuccess();

                expect( pushConfigInit.called ).to.be.true;
            });

            it( 'should reset user data', () => {
                controller.onAcessoCidadaoLoginSuccess();

                expect( controller.user ).to.be.deep.equal( { username: '', password: '' });
            });

            it( 'should redirect user to dashboard', () => {
                controller.onAcessoCidadaoLoginSuccess();

                expect( controller.user ).to.be.deep.equal( { username: '', password: '' });
            });
        });

        describe( 'openUrlForgotPassword()', () => {
            it( 'should open acesso cidadão forgot password page', () => {
                controller.openUrlForgotPassword();

                expect( $windowOpen.calledWithExactly( 'https://acessocidadao.es.gov.br/Conta/SolicitarReinicioSenha', '_system' ) ).to.be.true;
            });
        });


        describe( 'goToDashboard()', () => {
            let nextViewOptions: Sinon.SinonStub;

            beforeEach(() => {
                nextViewOptions = sandbox.stub( environment.$ionicHistory, 'nextViewOptions' );
            });

            it( 'should call $ionicHistory.nextViewOptions', () => {

                controller.goToDashboard();

                expect( nextViewOptions.calledWithExactly( {
                    disableAnimate: true,
                    historyRoot: true
                }) ).to.be.true;
            });

            it( 'should redirect to dashboard', () => {
                let go = sandbox.stub( $stateMock, 'go' );

                controller.goToDashboard();

                expect( go.calledWithExactly( 'app.dashboard.newsHighlights' ) ).to.be.true;
            });
        });

        // describe( 'facebookLogin()', () => {
        //     it( 'should sign in acesso cidadão with the provided token', () => {
        //         facebookLoginPromise.resolves( identity );

        //         controller.facebookLogin();

        //         expect( signInAcessoCidadao.calledWith( identity ) ).to.be.true;
        //     });

        //     it( 'should show login error message for facebook', () => {
        //         facebookLoginPromise.rejects();

        //         controller.facebookLogin();

        //         expect( toastInfo.calledWithExactly( { title: '[Facebook] Falha no login' }) ).to.be.true;
        //     });
        // });

        // describe( 'googleLogin()', () => {
        //     it( 'should sign in acesso cidadão with the provided token', () => {
        //         facebookLoginPromise.resolves( identity );

        //         controller.googleLogin();

        //         expect( signInAcessoCidadao.calledWithExactly( identity ) ).to.be.true;
        //     });

        //     it( 'should show login error message for google', () => {
        //         facebookLoginPromise.rejects();

        //         controller.facebookLogin();

        //         expect( toastInfo.calledWithExactly( { title: '[Google] Falha no login' }) ).to.be.true;
        //     });
        // });


        // describe( 'digitsLogin()', () => {
        //     it( 'should sign in acesso cidadão with the provided token', () => {
        //         facebookLoginPromise.resolves( identity );

        //         controller.googleLogin();

        //         expect( signInAcessoCidadao.calledWithExactly( identity ) ).to.be.true;
        //     });

        //     it( 'should show login error message for digits', () => {
        //         facebookLoginPromise.rejects();

        //         controller.digitsLogin();

        //         expect( toastInfo.calledWithExactly( { title: '[SMS] Falha no login' }) ).to.be.true;
        //     });
        // });
    });
});