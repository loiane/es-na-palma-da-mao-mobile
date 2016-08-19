import { ISettings } from '../../shared/settings/index';
import { PushService } from './push.service';

export class PushConfig {

    public static $inject: string[] = [
        'pushService',
        'settings'
    ];

    private pushNotification: PhonegapPluginPush.PushNotificationStatic;

    constructor( private pushService: PushService, private settings: ISettings ) {
        if ( window.PushNotification ) {
            this.pushNotification = window.PushNotification;
        }
    }

    public init(): void {
        if ( this.pushNotification ) {
            let push = PushNotification.init(
                {
                    android: {
                        senderID: this.settings.push.senderId,
                        forceShow: this.settings.push.forceShow
                    },
                    ios: {
                        senderID: this.settings.push.senderId,
                        alert: this.settings.push.alert,
                        badge: this.settings.push.badge,
                        sound: this.settings.push.sound
                    }
                });

            PushNotification.hasPermission(( data ) => {
                if ( data.isEnabled ) {
                    console.log( 'isEnabled' );
                }
            });

            push.on( 'registration', ( data ) => {
                // data.registrationId
                this.pushService.registerUser( data.registrationId );
                console.log( data );
            });

            push.on( 'notification', ( data ) => {
                console.log( data );

                this.pushService.notify( data.additionalData );
            });

            push.on( 'error', ( e ) => {
                // e.message
                console.log( e );
                // alert( e );
            });
        }
    }
}
