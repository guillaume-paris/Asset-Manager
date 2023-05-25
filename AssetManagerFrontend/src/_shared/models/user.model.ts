export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    createdBy: string;
    id: number;
}

export interface IUserResult {
    totalUsers: number,
    usersPaged: [
        IUser
    ]
}