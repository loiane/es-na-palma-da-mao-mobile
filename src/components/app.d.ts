// tslint:disable-next-line
/// <reference path="../../typings/index.d.ts" />

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


