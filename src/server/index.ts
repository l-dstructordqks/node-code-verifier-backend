import express, { Express, Request, Response } from "express";

// Security
import cors from 'cors'
import helmet from "helmet";

// TODO: HTTPS

// Root Router
import rootRouter from '../routes';

// * Create Express APP or Specify the server
const server: Express = express();

// * Define SERVER to use "/api" and use rootRouter from 'index.ts' in routes
// From this point onver: http://localhost:8000/api/...
server.use(
    '/api',
    rootRouter
    );

// TODO: Mongoose Connection

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