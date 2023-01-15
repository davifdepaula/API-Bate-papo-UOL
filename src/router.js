import express from 'express'
import { db } from './config/connection.js'
import { getMessages } from './controllers/messagesController.js'
import { getParticipants, postParticipants } from './controllers/participantsController.js'
import { validatePostParticipants } from './middleware/validateMiddleware.js'

const routes = express.Router()

routes.get("/participants", getParticipants)
routes.get("/messages", getMessages)
routes.post("/participants", validatePostParticipants, postParticipants)

export {
    routes
}