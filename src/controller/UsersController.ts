import { Get, Route, Tags, Query, Delete, Post, Put } from "tsoa";
import { IUserController } from "./interfaces"
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Users Collection
import { deleteUserByID, getAllUsers, getUserByID, createUser, updateUserByID } from "../domain/orm/User.orm"
import { BasicResponse } from "./types";


@Route("/api/users")
@Tags("UserController")
export class UsersController implements IUserController {
    /**
     * Endpoint to retrive the Users in the Collection "Users" of DB
     * @param {string} id Id of user to retreive (optional)
     * @returns All users or user found by ID
     */
    @Get("/")
    public async getUsers(@Query()id?: string): Promise<any> {
        let response: any = '';

        if(id) {
            LogSuccess(`[/api/users] Get User By ID: ${id} `)
            response = await getUserByID(id);
            // Remove the password
            response.password = '';
        } else {
            LogSuccess('[/api/users] Get All Users Request')
            response = await getAllUsers();
            // TODO: remove passwords from response
        }
        return response;
        
    }

    /**
     * Endpoint to delete User by ID in the Collection "Users" of DB
     * @param {string} id Id of user to delete (optional)
     * @returns message informing if deletion was correct
     */
    @Delete("/")
    public async deleteUser(@Query()id?: string): Promise<any> {
        let response: any = '';

        if(id) {
            LogSuccess(`[/api/users] Delete User By ID: ${id} `)
            await deleteUserByID(id).then((r) => {
                response = {
                    status: 204,
                    message: `User with id ${id} deleted successfully`
                }
            })
        } else {
            LogWarning('[/api/users] Delete User Request WITHOUT ID')
            response = {
                status: 400,
                message: 'Pleasem, provide an ID to remove from database'
            }
        }
        return response;
        
    }


    @Put("/")
    public async updateUser(@Query()id: string, user: any): Promise<any> {
        let response: any = '';

        if(id) {
            LogSuccess(`[/api/users] Update User By ID: ${id} `)
            await updateUserByID(id, user).then((r) => {
                response = {
                    status: 204,
                    message: `User with id ${id} updated successfully`
                }
            })
        } else {
            LogWarning('[/api/users] Update User Request WITHOUT ID')
            response = {
                status: 400,
                message: 'Pleasem, provide an ID to update an existing user'
            }
        }
        return response;
    }
}