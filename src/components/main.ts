// tslint:disable-next-line
import 'font-awesome';
import 'robotoDraft/robotodraft.css!';

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/elementAt';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { Provider } from '@angular/core';
import { HTTP_PROVIDERS, RequestOptions, XHRBackend } from '@angular/http';
import { AuthorizedHttp } from './shared/authorized-http.component';

import { COOL_STORAGE_PROVIDERS, CoolLocalStorage } from 'angular2-cool-storage';

import { ionicBootstrap } from 'ionic-angular';
import { AppComponent } from './app/app.component';
import { Settings } from './shared/index';

let settingsProvider = {
    provide: Settings,
    useFactory: () => Settings.getInstance()
};

// Provider for authorized requests
let authHttpProvider = {
    provide: AuthorizedHttp,
    useFactory: ( backend: XHRBackend, defaultOptions: RequestOptions, localStorage: CoolLocalStorage ) => new AuthorizedHttp( backend, defaultOptions, localStorage ),
    deps: [ XHRBackend, RequestOptions, CoolLocalStorage ]
};

ionicBootstrap( AppComponent, [ HTTP_PROVIDERS, settingsProvider, authHttpProvider, COOL_STORAGE_PROVIDERS ] );
