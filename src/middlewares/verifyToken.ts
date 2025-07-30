import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

//import bcrypt from 'bcrypt';

// Enviroment variables configuration
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.SECRETKEY || 'MYSECRETKEY';

/**
 * 
 * @param { Request } req Original reques previous middleware of  verification JWT
 * @param { Response } res Response to verification of JWT
 * @param { NextFunction } next Next function to be executed
 * @returns Errors of verification or next execution
 */
export const verification = (req: Request, res: Response, next: NextFunction) => {
    // Check HEADER from Request for 'x-access-token'
    let token: any = req.headers['x-access-token'];

    // Verify if jwt is present
    if(!token){
        res.status(403).send({
            authenticationError: 'JWT verification failed',
            message: 'Failed to verify JWT token in request'
        });
    }

    // Verify the token obtained. We pass the secret
    jwt.verify(token, secret, (err: any, decoded: any) => {
        if(err){
            res.status(500).send({
                authenticationError: 'JWT verification failed',
                message: 'Failed to verify JWT token in request'
            });
        }
    })

    // Pass something to next request (id of user || other info)

    // Execute Next Function  -> Protected Routes will be executed
    next();
}