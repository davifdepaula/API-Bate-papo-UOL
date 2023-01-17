import  express  from 'express';
import  cors  from 'cors'
import dotenv  from 'dotenv'
import { routes } from './router.js';

dotenv.config()
const server = express()
server.use(express.json())
server.use(cors())
server.use(routes)

export {
    server
}