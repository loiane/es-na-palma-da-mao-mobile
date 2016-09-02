import { IHttpService, IPromise } from 'angular';
import { ISettings } from '../../shared/settings/index';
import { Warning, Region, LatLng } from './models/index';

export class CbmesApiService {

    public static $inject: string[] = [ '$http', 'settings', '$q' ];


    /**
     * Creates an instance of CbmesApiService.
     * 
     * @param {IHttpService} $http
     * @param {ISettings} settings
     */
    constructor( private $http: IHttpService, private settings: ISettings, private $q ) {
    }

    /**
     * 
     * 
     * @returns {IPromise<Warning[]>}
     */
    public getLastWarnings(): IPromise<Warning[]> {
        let today = new Date();
        today.setDate( today.getDate() - 7 );

        // TODO: Remover mock assim que a api estiver pronta
        // return this.mockLastWarnings();

        return this.$http.get( this.settings.api.cbmes, today )
            .then(( response: { data: Warning[] }) => {
                return response.data;
            });
    }

    public mockLastWarnings() {
        return this.$q(( resolve, reject ) => {
            resolve( this.objMock );
        });
    }

    private get objMock(): Warning[] {
        return [ {
            level: 'alto',
            title: 'Incêndio',
            message: 'Princípio de incendio no centro',
            beginDate: new Date(),
            endDate: new Date(),
            region: {
                type: 'circle',
                center: { latitude: -20, longitude: -40 },
                radius: 2000
            }
        },
        {
            level: 'medio',
            title: 'Incêndio',
            message: 'Princípio de incendio no centro',
            beginDate: new Date(),
            endDate: new Date(),
            region: {
                type: 'circle',
                center: { latitude: -20, longitude: -40 },
                radius: 2000
            }
        },
        {
            level: 'baixo',
            title: 'Incêndio',
            message: 'Princípio de incendio no centro',
            beginDate: new Date(),
            endDate: new Date(),
            region: {
                type: 'circle',
                center: { latitude: -20, longitude: -40 },
                radius: 2000
            }
        }];
    }
}
