
// // tslint:disable-next-line

declare var sinon: Sinon.SinonStatic;
declare var angular: angular.IAngularStatic;

declare module 'rxjs/Observable' {
    export interface Observable<T> { subscribe: Function; }
}
declare module 'rxjs/Rx' {
    export interface Observable<T> { }
}

declare module '*.html' {
    const content: string;
    export default content;
}

declare module '*.json' {
    const content: any;
    export = content;
}

declare module '*!image' {
    const content: any;
    export = content;
}

declare module 'calendar' {
    const content: any;
    export = content;
}
