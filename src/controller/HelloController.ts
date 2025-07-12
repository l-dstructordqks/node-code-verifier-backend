import { BasicResponse } from "./types";
import { IHelloController } from "./interfaces";
import { LogSuccess } from "@/utils/logger"; // Reference from "params" de tsconfig.json

export class HelloController implements IHelloController {

    public async getMessage(name?: string): Promise<BasicResponse> {
        LogSuccess('[/api/hello] Get Request');

        return {
            message: `Hello, ${name || "World!"}`
        }
    }
    
}