import express from 'express'
import { db } from './config/connection.js'
import { getMessages, postMessages } from './controllers/messagesController.js'
import { getParticipants, postParticipants } from './controllers/participantsController.js'
import { validatePostParticipants, validatePutStatus } from './middleware/validateMiddleware.js'
import { validatePostMessages } from './middleware/validateMiddleware.js'
import { putStatus } from './controllers/statusController.js'

const routes = express.Router()

routes.get("/participants", getParticipants)
routes.get("/messages", getMessages)
routes.post("/participants", validatePostParticipants, postParticipants)
routes.post("/messages", validatePostMessages, postMessages)
routes.post("/status", validatePutStatus, putStatus)

export {
    routes
} 