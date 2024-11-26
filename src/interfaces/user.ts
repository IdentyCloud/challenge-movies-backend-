export interface IAuthentication {
    password: string;
    salt: string;
    sessionToken?: string;
}

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    birthdate: Date;
    authentication: IAuthentication;
}