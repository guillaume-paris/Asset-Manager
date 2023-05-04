export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    id: number;
}

export interface IUserResult {
    totalUsers: number,
    usersPaged: [
        IUser
    ]
}