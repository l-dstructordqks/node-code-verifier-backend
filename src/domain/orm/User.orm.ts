import { userEntity } from "../entities/User.entity";
import { LogSuccess, LogError } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";

// CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        // Search all users
        return await userModel.find({})
        //return await userModel.find({isDelete: false})

    } catch(error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`);
    }
}

export const getUserByID = async (id: string) : Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // Search User By ID
        return await userModel.findById(id);

    } catch(error) {
        LogError(`[ORM ERROR]: Getting User By ID`)
    }
}

export const deleteUserByID = async (id: string) : Promise<any | undefined> => {
    try {
        // Inicializes the model
        let userModel = userEntity();

        // Search User By ID
        return await userModel.deleteOne({ _id: id });

    } catch(error) {
        LogError(`[ORM ERROR]: Deleting User By ID ${error}`)
    }
}

// - Create New User
export const createUser = async (user: IUser): Promise<any | undefined> => {

    try {
        // Inicializes the model
        let userModel = userEntity();

        // Search User By ID
        return await userModel.create(user);

    } catch (error) {
        LogError(`[ORM ERROR]: Creating User By ID ${error}`);

    }
}

// - Update User By ID
export const updateUserByID = async (id: string, user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // Update User
        return await userModel.findByIdAndUpdate(id, user);

    } catch (error) {
        LogError(`[ORM ERROR]: Updating User By ID ${error}`);

    }
}