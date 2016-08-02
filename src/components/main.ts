// tslint:disable-next-line
import 'moment/locale/pt-br';

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mergeMap'; // flatMap
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/finally';

import { HTTP_PROVIDERS, Http, XHRBackend, RequestOptions } from '@angular/http';
import { ionicBootstrap } from 'ionic-angular';
import { AppComponent } from './app/app.component';
import { Settings, BaseHttp, UIStateService } from './shared/index';

let httpProvider = {
    provide: Http,
    useFactory: ( backend: XHRBackend, defaultOptions: RequestOptions, uiStateService: UIStateService ) => {
        return new BaseHttp( backend, defaultOptions, uiStateService );
    },
    deps: [ XHRBackend, RequestOptions, UIStateService ]
};

let settingsProvider = {
    provide: Settings,
    useFactory: () => Settings.getInstance()
};

ionicBootstrap( AppComponent, [ HTTP_PROVIDERS, UIStateService, httpProvider, settingsProvider ] );

