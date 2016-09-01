
/**
 * 
 * 
 * @export
 * @class HttpErrorSnifferService
 */
export class HttpErrorSnifferService {

    public errors: any[] = [];

    /**
     * 
     * 
     * @param {any} error
     */
    public addError( error: any ): void {
        this.errors.push( error );
    }

    /**
     * 
     */
    public clearErrors(): void {
        this.errors.length = 0;
    }

    /**
     * 
     * 
     * @readonly
     */
    public get lastError(): any {
        return this.errors[ this.errors.length - 1 ];
    }
}
