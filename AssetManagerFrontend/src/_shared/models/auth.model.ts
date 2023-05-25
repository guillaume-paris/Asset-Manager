export interface ILogin {
    success: boolean;
    title: string;
    message: string;
    username: string;
    token: string;
    expiresIn: number;
}

export interface IRegister {
    success: boolean;
    title: string;
    message: string;
    username: string;
    token: string;
    expiresIn: number;
}

export interface ILogout {
    success: boolean;
    message: string;
}
