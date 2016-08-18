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
        called: Chai.Assertion;
    }
}

declare namespace angular {
    interface IRootScopeService {
        backButtonPressedOnceToExit: boolean;
    }

    interface IScope {
        isAndroid: boolean;
    }
}

declare module '*.html' {
    const content: string;
    export = content;
}

declare module '*.json' {
    const content: any;
    export = content;
}
