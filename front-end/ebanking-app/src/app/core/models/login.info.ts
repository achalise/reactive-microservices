export class LoginInfo {
    constructor(public userId: string, public password: string){}
}

export interface ILoginResponse {
    status: string,
    message: string
}

export enum AuthStatus {
    AUTHENTICATING = 'Authenticating',
    AUTHENTICATED = 'Authenticated',
    UNAUTHENTICATED = 'UnAuthenticated'
}