import express, { Request, Response } from "express";
import { HelloController } from "../controller/HelloController";
import { LogInfo } from "../utils/logger";
import { BasicResponse } from "@/controller/types";

// Router from express
let helloRouter = express.Router();

// http://localhost:8000/api/hello?name=Martin/
helloRouter.route('/')
    // GET:
    .get(async(req: Request, res: Response) => {
        // Obtain a Query Param
        let name: any = req?.query?.name;
        LogInfo(`Query Param: ${name}`);
        // Controller Instance to execute method
        const controller: HelloController = new HelloController();
        // Obtain Response
        const response: BasicResponse = await controller.getMessage(name);
        // Send to the client the response
        res.send(response);
    })

// Export Hello Router
export default helloRouter;