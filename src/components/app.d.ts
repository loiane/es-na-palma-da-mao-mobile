// tslint:disable-next-line
/// <reference path="../../typings/index.d.ts" />



declare namespace ionic {
    namespace loading {
        interface IonicLoadingService {
            show( opts?: ionic.loading.IonicLoadingOptions ): ng.IPromise<void>;
            hide(): ng.IPromise<void>;
        }
    }
}

declare interface DateConstructor {
    new ( value: Date ): Date;
}


declare interface Navigator {
    splashscreen: { hide: Function };
}


declare module 'chai' {
     interface LanguageChains {
        called: chai.Assertion;
    }
}

declare var __moduleName: string;


