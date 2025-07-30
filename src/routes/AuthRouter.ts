import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { LogInfo } from "../utils/logger";
import { BasicResponse } from "@/controller/types";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// BCRYPT for password
import bcrypt from 'bcrypt';

// MiddleWare
import { verification } from '../middlewares/verifyToken';

// Body Parser (Read JSON  from Body in Requests)
import bodyParser from "body-parser";

// Middleware to read JSON in Body
let jsonParser = bodyParser.json();

// Router from express
let authRouter = express.Router();

// http://localhost:8000/auth/register
authRouter.route('/register')
    // CREATE:
    .post(jsonParser, async(req: Request, res: Response) => {
        // Obtain a Body Information
        let { name, email, password, age } = req?.body;
        let hashedPassword = '';

        if( name && password && email &&  age ){
            // Cypher password
            hashedPassword = bcrypt.hashSync(password, 8);

            let newUser = {
                name: name,
                email: email,
                password: hashedPassword,
                age: age
            }
            // Controller Instance to execute method
            const controller: AuthController = new AuthController();
            // Obtain Response
            const response: any = await controller.registerUser(newUser);
            
            // Send to the client the response
            res.status(200).send(response);
        } else {
            // Send to client the Error response
            res.status(400).send({
                message: '[ERROR] User Data missing]: No user can be registered'
            })
        }

        LogInfo(`Body Values: ${name}, ${age}, ${email}`);
    })

    // http://localhost:8000/auth/login
authRouter.route('/login')
    // CREATE:
    .post(jsonParser, async(req: Request, res: Response) => {
        // Obtain a body information
        let { email, password } = req?.body;

        if( email && password ){
            // Controller Instance to execute method
            const controller: AuthController = new AuthController();
            
            let auth: IAuth = {
                email: email,
                password: password
            }

            // Obtain Response
            const response: any = await controller.loginUser(auth);
            // Send to the client the response wich include the JWT(TOKEN) to authorize requests
            res.status(201).send(response);
        } else {
            // Send to client the Error response
            res.status(400).send({
                message: '[ERROR] User Data missing]: No user can be logged in'
            })
        }

    })

// Route Protected by VERIFY TOKEN Middlewarw
authRouter.route('/me')
    .get(verification, async (req: Request, res: Response) => {
        // Obtain the ID of user to check it's data
        let id: any = req?.query?.id;

        if(id){
            // Controller: Auth Controller
            const controller: AuthController = new AuthController();

            // Obtain response from Controller
            let response: any = await controller.userData(id);

            // If user is authorized:
            res.status(200).send(response);
        } else {
            res.status(401).send({
                message: 'You are not authorized to perform this action'
            })
        }
    })

// Export Auth Router
export default authRouter;