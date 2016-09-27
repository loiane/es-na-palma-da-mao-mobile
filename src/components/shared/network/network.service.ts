import { Diagnostic } from 'ionic-native';
import { IPromise } from 'angular';
import { DialogService } from '../dialog/index';

export class NetworkService {

    public static $inject: string[] = [ 'dialog' ];

    /**
     * Creates an instance of NetworkService.
     * 
     * 
     * @memberOf NetworkService
     */
    constructor( private dialog: DialogService ) { }

    /**
     * 
     * 
     * @private
     * 
     * @memberOf NetworkService
     */
    private showNetworkSettings() {
        if ( Diagnostic.switchToWifiSettings ) {
            Diagnostic.switchToWifiSettings();
        } else {
            Diagnostic.switchToSettings();
        }
    }


    /**
     * 
     * 
     * 
     * @memberOf NetworkService
     */
    public showNetworkAlert(): IPromise<any> {
        return this.dialog.confirm( {
            title: 'Sem conexão com a internet',
            content: 'Verifique sua conexão com a internet',
            ok: 'Ver configurações'
        }).then(() => this.showNetworkSettings() );
    }
}