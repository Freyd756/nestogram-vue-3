import type IUser from "@/models/IUser.d"
export default interface IUserState{
    users: IUser[],
    user: IUser|null,
}