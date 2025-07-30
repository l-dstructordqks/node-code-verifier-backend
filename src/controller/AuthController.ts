import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IAUthController } from "./interfaces";
import { IUser } from "../domain/interfaces/IUser.interface";
import { LogSuccess, LogError, LogInfo, LogWarning } from "../utils/logger";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// ORM imports
import { getUserByID } from "../domain/orm/User.orm";
import { registerUser, loginUser, logoutUser } from "../domain/orm/Auth.orm";
import { AuthResponse, ErrorResponse } from "./types";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAUthController {

    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {
        let response: any = '';

        if(user){
            LogSuccess(`[/api/auth/register] Register New User: ${user} `);
            await registerUser(user).then((r) => {
                LogSuccess(`[/api/auth/register] Create User: ${user} `);
                response = {
                    message: `User created successfully: ${user.name}`
                }
            });
        } else {
            LogWarning('[/api/auth/register] Register needs User Entity')
            response = {
                message: 'User not registered: Please, provide a User Entity to create one'
            }
        }

        return response;
    }

    @Post("/login")
    public async loginUser(auth: IAuth): Promise<any> {
        let response: AuthResponse | ErrorResponse | undefined;

        if(auth){
            LogSuccess(`[/api/auth/login] Login User: ${auth} `);

            let data = await loginUser(auth);
            response = {
                message: `Welcome, ${data.user.name}`,
                token: data.token
            }
        } else {
            LogWarning('[/api/auth/login] Login needs Auth Entity (email && password)')
            response = {
                message: 'Please, provide a email && password to login',
                token: 'Not Valid'
            }
        }

        return response;
    }


    @Get("/me")
    public async userData(@Query() id: string): Promise<any> {
        let response: any = '';
    
        if(id) {
            LogSuccess(`[/api/users] Get User Data By ID: ${id} `)
            response = await getUserByID(id);
            // Remove the password
            response.password = '';
        }
        return response;
            
    }

    @Post("/logout")
    public async logoutUser(auth: any): Promise<any> {
        // TODO: Authenticate user and returns JWT
        throw new Error("Method not implemented.");
    }
    
}