import { IHttpService } from 'angular';
import { Push, AndroidPushOptions, IOSPushOptions, PushNotification } from 'ionic-native';

import { ISettings } from '../settings/index';
import { PushUser } from './models/index';
import { AuthenticationStorageService } from '../authentication/index';

export class PushService {

    public static $inject: string[] = [
        '$state',
        '$ionicHistory',
        '$ionicNativeTransitions',
        '$http',
        '$mdSidenav',
        'settings',
        'authenticationStorageService'
    ];

    constructor( private $state: angular.ui.IStateService,
        private $ionicHistory: ionic.navigation.IonicHistoryService,
        private $ionicNativeTransitions,
        private $http: IHttpService,
        private $mdSidenav: angular.material.ISidenavService,
        private settings: ISettings,
        private authenticationStorageService: AuthenticationStorageService ) {
    }

    public init() {
        let androidPushConfig: AndroidPushOptions = {
            senderID: this.settings.push.senderId,
            forceShow: this.settings.push.forceShow,
            icon: 'notification',
            iconColor: '#549db2'
        };

        let iosPushConfig: IOSPushOptions = {
            senderID: this.settings.push.senderId,
            alert: this.settings.push.alert,
            badge: this.settings.push.badge,
            sound: this.settings.push.sound,
            gcmSandbox: this.settings.push.gcmSandbox
        };

        let push: PushNotification = Push.init( { android: androidPushConfig, ios: iosPushConfig });

        if ( push.on ) {
            push.on( 'registration', ( data ) => {
                console.log( data );
                this.registerUser( data.registrationId );
            });

            push.on( 'notification', ( data ) => {
                console.log( data );
                this.notify( data.additionalData );
            });

            push.on( 'error', ( e ) => console.log( e ) );
        }
    }

    /**
     * 
     * 
     * @param {string} token
     */
    public registerUser( token: string ) {
        let data: PushUser = {
            user: this.authenticationStorageService.tokenSub,
            type: ionic.Platform.platform(),
            token: token
        };

        this.$http.post( `${this.settings.api.push}/subscribe`, data );
    }

    /**
     * 
     * 
     * @param {*} data
     */
    public notify( data: any ): void {
        if ( data.appData && data.appData.state ) {
            this.navigateTo( data.appData.state, data.appData.params );
        }
    }

    /**
     *  Fecha a barra de navegação lateral
     *  It will use with event on-swipe-left="closeSideNav()" on-drag-left="closeSideNav()"
     *  When user swipe or drag md-sidenav to left side
     *
     *  @returns {void}
     */
    public closeSideNav(): void {
        this.$mdSidenav( 'left' ).close();
    }

    /**
     * Navega para o state especificado
     *
     * @param {string} stateName - o nome do state destino
     * @param {any} routeParameters - dados a serem passados pra rota
     * @returns {void}
     */
    public navigateTo( stateName: string, routeParameters: any ): void {
        this.closeSideNav();

            this.$ionicHistory.nextViewOptions( {
                disableAnimate: true,
                disableBack: true,
                historyRoot: true
            });

            if ( this.$ionicNativeTransitions ) {
            this.$ionicNativeTransitions.stateGo( stateName, routeParameters, { reload: true }, { 'type': 'fade' });
            } else {
            if ( this.$ionicHistory.currentStateName() !== stateName ) {
                this.$state.go( stateName, routeParameters );
            }
        }
    }
}
