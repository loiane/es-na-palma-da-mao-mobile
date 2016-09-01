import { Error } from '../../../shared/http/index';

export class ErrorMessageController {
    public error: Error;
    public unhandledErrorMessage: string;

    /**
     * Creates an instance of ErrorMessageController.
     * 
     */
    constructor() {
         this.unhandledErrorMessage = this.unhandledErrorMessage || 'Erro inesperado';
    }
}