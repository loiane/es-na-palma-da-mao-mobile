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
import 'rxjs/add/operator/toPromise';

import { HTTP_PROVIDERS, Http, XHRBackend, RequestOptions } from '@angular/http';
import { COOL_STORAGE_PROVIDERS, CoolLocalStorage } from 'angular2-cool-storage';
import { ionicBootstrap } from 'ionic-angular';
import { AppComponent } from './app/app.component';
import { Settings, BaseHttp, AuthorizedHttp, UIStateStore } from './shared/index';

let settingsProvider = {
    provide: Settings,
    useFactory: () => Settings.getInstance()
};

// Provider for authorized requests
let authHttpProvider = {
    provide: AuthorizedHttp,
    useFactory: ( backend: XHRBackend, defaultOptions: RequestOptions, uiStateStore: UIStateStore, localStorage: CoolLocalStorage ) => {
        return new AuthorizedHttp( backend, defaultOptions, uiStateStore, localStorage );
    },
    deps: [ XHRBackend, RequestOptions, UIStateStore, CoolLocalStorage  ]
};

let httpProvider = {
    provide: Http,
    useFactory: ( backend: XHRBackend, defaultOptions: RequestOptions, uiStateStore: UIStateStore ) => {
        return new BaseHttp( backend, defaultOptions, uiStateStore );
    },
    deps: [ XHRBackend, RequestOptions, UIStateStore ]
};

ionicBootstrap( AppComponent, [ HTTP_PROVIDERS, UIStateStore, httpProvider, settingsProvider, authHttpProvider, COOL_STORAGE_PROVIDERS ] );

