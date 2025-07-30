import express, { Request, Response } from "express";
import { UsersController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";
import { BasicResponse } from "@/controller/types";
import { IUser } from "@/domain/interfaces/IUser.interface";

// BCRYPT for password
import bcrypt from 'bcrypt';

// Router from express
let usersRouter = express.Router();

// http://localhost:8000/api/users?id=9093804788nbc98473
usersRouter.route('/')
    // GET:
    .get(async(req: Request, res: Response) => {

        //Obtain the Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);

        // Controller Instance to execute method
        const controller: UsersController = new UsersController();
        // Obtain Response
        const response: any = await controller.getUsers(id);
        // Send to the client the response
        res.status(200).send(response);
    })

    // DELETE:
    .delete(async(req: Request, res: Response) => {

        //Obtain the Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);

        // Controller Instance to execute method
        const controller: UsersController = new UsersController();
        // Obtain Response
        const response: any = await controller.deleteUser(id);
        // Send to the client the response
        res.status(response.status).send(response);
    })


    // UPDATE
    .put(async(req: Request, res: Response) => {
        // Obtain a Query Param(ID)
        let id: any = req?.query?.id;
        let name: any = req?.query?.name;
        let age: any = req?.query?.age;
        let email: any = req?.query?.email;
        LogInfo(`Query Params: ${id}, ${name}, ${age}, ${email}`);

        // Controller Instance to execute method
        const controller: UsersController = new UsersController();

        let user = {
            name: name,
            email: email,
            age: age
        }

        // Obtain Response
        const response: any = await controller.updateUser(id, user);
        // Send to the client the response
        res.status(response.status).send(response);
    })


// Export Users Router
export default usersRouter;


/**
 * 
 * Get Documents => 200 OK
 * Cretion Documents => 201 OK
 * Deletion of Documents => 200 (Entity) /204 (No return)
 * Update of Documents => 200 (Entity) / 204 (No return)
 */