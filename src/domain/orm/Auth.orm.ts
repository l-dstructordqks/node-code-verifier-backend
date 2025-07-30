/**
 * ORM to connect Auth Collection
 */

import { LogError } from "../../utils/logger";
import { userEntity } from "../entities/User.entity";
import { IAuth } from "../interfaces/IAuth.interface";
import { IUser } from "../interfaces/IUser.interface";

// Enviroment variables
import dotenv from 'dotenv';

// BCRYPT for passwords
import bcrypt from 'bcrypt'

// JWT
import jwt from 'jsonwebtoken'

// Configuration of enviroment variables
dotenv.config();

// Obtain Secret key to generate JWT
const secret = process.env.SECRETKEY || 'SECRETWORD';

// - Register New User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // Create / Insert new User
        return await userModel.create(user);
    } catch (error) {
        LogError(`[ORM ERROR]: Creating User: ${error}`);
    }
}

// - Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        let userFound: IUser | undefined = undefined;
        let token = undefined;

        // Check if user exist by Unique Email
        await userModel.findOne({email: auth.email}).then((user: IUser) => {
            userFound = user;
        }).catch((error) => {
            console.error(`[ERROR Authentication IN ORM]: User No Found`);
            throw new Error(`[ERROR Authentication IN ORM]: User No Found: ${error}`);
            
        });

        // Check if Password is Valid (compare with BCRYPT)
        let validPassword = bcrypt.compareSync(auth.password, userFound!.password);

        if(!validPassword){
            console.error(`[ERROR Authentication IN ORM]: User No Found`);
            throw new Error(`[ERROR Authentication IN ORM]: User No Found:`);
        
        }

        // Generate our JWT
        token = jwt.sign({email: userFound!.email}, secret, {
            expiresIn: "2h"
        })

        return {
            user: userFound,
            token: token
        }

    } catch (error) {
        LogError(`[ORM ERROR]: Login User: ${error}`);
    }
}

// - Logout User
export const logoutUser = async (): Promise<any | undefined> => {
    // TODO: NOT IMPLEMENTED

}