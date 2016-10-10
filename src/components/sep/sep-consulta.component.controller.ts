import { IScope } from 'angular';
import { SepApiService, Process, ProcessUpdate } from './shared/index';
import { ToastService, ToastOptions } from '../shared/index';
import { SocialSharing, BarcodeScanner } from 'ionic-native';

export class SepConsultaController {

    public static $inject: string[] = [
        '$scope',
        '$ionicScrollDelegate',
        '$stateParams',
        'toast',
        'sepApiService'
    ];

    public processNumber: number | undefined;
    public lastProcessNumber: string;
    public process: Process | undefined;
    public searched: boolean;
    public showAllUpdates: boolean;


    /**
     * Creates an instance of SepConsultaController.
     * 
     * @param {IScope} $scope
     * @param {ionic.scroll.IonicScrollDelegate} $ionicScrollDelegate
     * @param {ToastService} toast
     * @param {SepApiService} sepApiService
     */
    constructor( private $scope: IScope,
        private $ionicScrollDelegate: ionic.scroll.IonicScrollDelegate,
        private $stateParams: angular.ui.IStateParamsService,
        private toast: ToastService,
        private sepApiService: SepApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    public activate(): void {
        this.processNumber = undefined;
        this.lastProcessNumber = '';
        this.process = undefined;
        this.searched = false;
        this.showAllUpdates = false;

        const procNumber = this.$stateParams[ 'processNumber' ];
        if ( procNumber ) {
            this.getProcess( procNumber );
            this.processNumber = Number( procNumber );
        }
    }

    /**
     * Obtém a última atualização do processo
     * 
     * @readonly
     * @type {ProcessUpdate}
     */
    public get lastUpdate(): ProcessUpdate | undefined {
        if ( this.process ) {
            return this.process.updates[ 0 ];
        }
    }

    /**
     * Alterna a visibilidade das atualizações do processo eletrônico
     */
    public toggleUpdates(): void {
        this.showAllUpdates = !this.showAllUpdates;
        this.$ionicScrollDelegate.scrollTo( 0, 300, true ); // TODO: try to search the element to scroll: anchorScroll
    }


    /**
    * 
    * 
    * @param {string} link
    * 
    * @memberOf NewsDetailController
    */
    public share( process: Process ): void {
        SocialSharing.shareWithOptions( {
            message: `SEP - Processo ${process.number}`,
            subject: `SEP - Processo ${process.number}`,
            url: process.pageUrl
        });
    }


    /**
     * 
     * 
     * 
     * @memberOf SepConsultaController
     */
    public scanBarcode() {
        const scanOptions = {
            'preferFrontCamera': false, // iOS and Android
            'prompt': 'Posicione o código dentro da área de leitura', // supported on Android only
            'format': 'CODE_39'
        };

        BarcodeScanner.scan( scanOptions )
            .then(( barcodeData ) => {
                if ( !!barcodeData.text ) {
                    this.getProcess( barcodeData.text );
                }
            })
            .catch(() => {
                this.toast.error( { title: 'Não foi possível ler o código do processo' });
            });
    }

    /**
     * Obtém um processo eletrônico pelo número do processo.
     * @param {Number} number: Process number
     * @return {undefined}
     */
    public getProcess( procNumber: string ): void {

        if ( !procNumber ) {
            this.toast.info( { title: 'N° do processo é obrigatório' } as ToastOptions ); return;
        }

        this.sepApiService.getProcessByNumber( procNumber )
            .then( process => {
                this.process = process;
                return process;
            })
            .catch(() => {
                this.process = undefined;
            })
            .finally(() => {
                this.searched = true;

                if ( this.process ) {
                    this.lastProcessNumber = '';
                } else {
                    this.lastProcessNumber = procNumber;
                }
            });
    }

    /**
     * Evento disparado quando o enter(return) é pressionado.
     * Disparado pela diretiva input-return. 
     * 
     * @param {string} procNumber
     * 
     * @memberOf SepConsultaController
     */
    public onEnterPressed( procNumber: string ) {
        this.getProcess( procNumber );
    }
}
