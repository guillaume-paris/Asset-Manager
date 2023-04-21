export interface ILogin {
    success: boolean;
    message: string;
    username: string;
    token: string;
    expires_in: number;
}

export interface IRegister {
    success: boolean;
    message: string;
    username: string;
    token: string;
    expires_in: number;
}

export interface ILogout {
    success: boolean;
    message: string;
}
