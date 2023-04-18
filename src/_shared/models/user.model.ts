export interface IUser {
    id: number
}

export interface User extends IUser {
    firstName: string,
    lastName: string,
    email: string,
    role: string
}
  