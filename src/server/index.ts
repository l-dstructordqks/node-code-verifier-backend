import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
// Swagger
import swaggerUi from 'swagger-ui-express';

// Security
import cors from 'cors'
import helmet from "helmet";

// TODO: HTTPS

// Root Router
import rootRouter from '../routes';

// * Create Express APP or Specify the server
const server: Express = express();


// * Swagger Config and route
server.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
            explorer: true
        }
    })
)


// * Define SERVER to use "/api" and use rootRouter from 'index.ts' in routes
// From this point onver: http://localhost:8000/api/...
server.use(
    '/api',
    rootRouter
    );

// Static server
server.use(express.static('public'));

// TODO: Mongoose Connection
mongoose.connect('mongodb://localhost:27017/codeverification')


// * Security config
server.use(helmet());
server.use(cors())

// * Content Type: (type of content that the server will show)
server.use(express.urlencoded({ extended: true, limit: '50mb' })) // limit of mbs that our server can recive
server.use(express.json({limit: '50mb'}));

// * Redirecting Config
// http://localhost:8000/ ---> http://localhost:8000/api/
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api');
});

export default server;