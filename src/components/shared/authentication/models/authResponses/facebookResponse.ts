import {FacebookAuthResponse} from './facebookAuthResponse';

export interface FacebookResponse {
    status: string;
    authResponse: FacebookAuthResponse;
}