import * as angular from 'angular';

declare module 'angular' {
    interface IRootScopeService {
        backButtonPressedOnceToExit: boolean;
    }

    interface IScope {
        isAndroid: boolean;
        isIOS: boolean;
    }
}

declare global {
    interface DateConstructor {
        new ( value: Date ): Date;
    }


    interface Navigator {
        splashscreen: { hide: Function };
    }

    interface ServiceWorkerContainer {
        addEventListener: Function;
        removeEventListener: Function;
    }


    interface CordovaPlugins {
        permissions: any;
    }

    interface Window {
        plugins: any;
    }
}
