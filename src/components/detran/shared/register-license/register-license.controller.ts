import { ToastService } from '../../../shared/toast/index';

export class RegisterLicenseController {

    public static $inject: string[] = [ '$mdDialog', 'toast' ];

    constructor( private $mdDialog, private toast: ToastService ) {}

    public cancel() {
        this.$mdDialog.cancel();
    }

    public ok( registerNumber: string, ballot: string ) {

        if ( !registerNumber ) {
             this.toast.info( { title: 'Nº do registro é obrigatório' } ); return;
        }
        if ( !ballot ) {
             this.toast.info( { title: 'Nº da cédula é obrigatório' } ); return;
        }

        this.$mdDialog.hide( {
            registerNumber,
            ballot
        } );
    }
}
