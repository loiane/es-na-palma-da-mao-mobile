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

import { HTTP_PROVIDERS } from '@angular/http';
import { ionicBootstrap } from 'ionic-angular';
import { AppComponent } from './app/app.component';
import { Settings } from './shared/index';

let settingsProvider = {
    provide: Settings,
    useFactory: () => Settings.getInstance()
};

ionicBootstrap( AppComponent, [ HTTP_PROVIDERS, settingsProvider ] );

