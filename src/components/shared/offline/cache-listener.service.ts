
import { ToastService } from '../../shared/index';

export class CacheListenerService {

    public static $inject: string[] = [ 'toast' ];

    private scheduledActions: { action: ( cacheData: any ) => void, cacheData: any }[] = [];
    private cacheListeners: ( ( event: any ) => void )[] = [];

    /**
     * Creates an instance of CacheManager.
     * 
     * @param {ToastService} toast
     * 
     * @memberOf CacheManager
     */
    constructor( private toast: ToastService ) {

    }

    /**
     * 
     * 
     * 
     * @memberOf CacheListenerService
     */
    public removeAllListeners() {
        this.cacheListeners.forEach( listener => {
            navigator.serviceWorker.removeEventListener( 'message', listener );
        });
        this.scheduledActions.length = 0;
    }

    /**
     * 
     * 
     * @param {string} cacheName
     * @param {( cacheData: any ) => boolean} executeIf
     * @param {( cacheData: any ) => void} action
     * @param {{ message: string, action: string, hideDelay?: number }} [toastOptions={ message: 'Novos dados disponíveis', action: 'Atualizar' }]
     * @returns
     * 
     * @memberOf CacheListenerService
     */
    public listenToCache( cacheName: string,
        executeIf: ( cacheData: any ) => boolean,
        action: ( cacheData: any ) => void,
        toastOptions: { message: string, action: string, hideDelay?: number } = { message: 'Novos dados disponíveis', action: 'Atualizar' }) {

        if ( !( 'serviceWorker' in navigator ) ) { return; }

        const cacheListener = ( event: { data: { message: any, cacheName: string, client: string, origin: string } }) => {
            if ( event.data.cacheName === cacheName && executeIf( event.data.message ) ) {
                this.scheduledActions.push( { action: action, cacheData: event.data.message });
                if ( this.scheduledActions.length === 1 ) {
                    this.toast.showActionToast( toastOptions ).then( response => {
                        if ( response === 'ok' ) {
                            this.scheduledActions.forEach( a => a.action( a.cacheData ) );
                            this.scheduledActions.length = 0;
                        }
                        return response;
                    });
                }
            }
        };

        this.cacheListeners.push( cacheListener );
        navigator.serviceWorker.addEventListener( 'message', cacheListener );
    }
}