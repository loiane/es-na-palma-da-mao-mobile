import { IScope, IPromise, ILogService } from 'angular';
import { SepApiService, Process, ProcessUpdate } from './shared/index';
import { ToastService, ToastOptions } from '../shared/toast/index';

export class SepConsultaController {

    public static $inject: string[] = [
        '$scope',
        '$log',
        '$ionicScrollDelegate',
        '$ionicLoading',
        'toast',
        'sepApiService'
    ];

    private seeMoreUpdates: string;
    private processNumber: string;
    private process: Process;
    private populated: boolean;
    private showAllUpdates: boolean;


    /**
     * Creates an instance of SepConsultaController.
     * 
     * @param {IScope} $scope
     * @param {ILogService} $log
     * @param {ionic.scroll.IonicScrollDelegate} $ionicScrollDelegate
     * @param {ionic.loading.IonicLoadingService} $ionicLoading
     * @param {ToastService} toast
     * @param {SepApiService} sepApiService
     */
    constructor( private $scope: IScope,
                 private $log: ILogService,
                 private $ionicScrollDelegate: ionic.scroll.IonicScrollDelegate,
                 private $ionicLoading: ionic.loading.IonicLoadingService,
                 private toast: ToastService,
                 private sepApiService: SepApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    public activate(): void {
        this.seeMoreUpdates = 'VER MAIS';
        this.processNumber = '';
        this.process = undefined;
        this.populated = false;
        this.showAllUpdates = false;
    }


    /**
     * Obtém a primeira atualização do processo
     * 
     * @readonly
     * @type {ProcessUpdate}
     */
    public get firstUpdate(): ProcessUpdate {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates[ this.process.updates.length - 1 ];
        }
    }

    /**
     * Obtém a última atualização do processo
     * 
     * @readonly
     * @type {ProcessUpdate}
     */
    public get lastUpdate(): ProcessUpdate {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates[ 0 ];
        }
    }


    /**
     * Indica se existe algum processo carregado
     * 
     * @readonly
     * @type {boolean}
     */
    public get hasProcess(): boolean {
        return angular.isDefined( this.process );
    }

    /**
     * Alterna a visibilidade das atualizações do processo eletrônico
     */
    public toggleUpdates(): void {
        this.showAllUpdates = !this.showAllUpdates;

        if ( this.showAllUpdates ) {
            this.seeMoreUpdates = 'OCULTAR';
            this.$ionicScrollDelegate.scrollTo( 0, 300, true ); // TODO: try to search the element to scroll: anchorScroll
        } else {
            this.seeMoreUpdates = 'VER MAIS';
        }
    }

     /**
     * Obtém as atualizações que ficarão inicialmente escondidas na tela.
     * 
     * @readonly
     * @type {ProcessUpdate[]}
     */
    public get hiddenUpdates(): ProcessUpdate[] {
        if ( this.process && this.process.updates && this.process.updates.length > 0 ) {
            return this.process.updates.slice( 1 );
        }
    }

    /**
     * Obtém um processo eletrônico pelo número do processo.
     * @param {Number} number: Process number
     * @return {undefined}
     */
    public getProcess( procNumber: string ): void {

        if ( !procNumber ) {
             this.toast.info( { title: 'N° do processo é obrigatório', } as ToastOptions ); return;
        }

        this.$ionicLoading.show();

        this.sepApiService.getProcessByNumber( procNumber )
                        .then( process => {
                            this.process = process;
                            return process;
                        } )
                        .catch( error => {
                            this.toast.error( { title: `Falha ao buscar processo n° ${ procNumber}` } );
                            this.$log.error( error );
                            this.process = undefined;
                        } )
                        .finally( () => {
                            this.$ionicLoading.hide();
                            this.populated = true;
                        } );
    }
}
