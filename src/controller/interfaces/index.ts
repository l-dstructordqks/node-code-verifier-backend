import { BasicResponse } from "../types";
import { IUser } from "../../domain/interfaces/IUser.interface";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}
export interface IUserController {
	// Read all users from databases || Find User by ID (ObjectID)
    getUsers(id?: string): Promise<any>
    // Delete User By ID
    deleteUser(id?: string): Promise<any>
     // Update User
    updateUser(id: string, user: any): Promise<any>
}

export interface IAUthController {
    // register users
    registerUser(user: IUser): Promise<any>
    // login User 
    loginUser(auth: any): Promise<any>
}
