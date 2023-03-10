import express from 'express'
import { deleteMessages, getMessages, postMessages, putMessages } from './controllers/messagesController.js'
import { getParticipants, postParticipants } from './controllers/participantsController.js'
import { validateDelete, validateLimit, validatePostParticipants, validatePostStatus, validatePut } from './middleware/validateMiddleware.js'
import { validatePostMessages } from './middleware/validateMiddleware.js'
import { postStatus } from './controllers/statusController.js'

const routes = express.Router()

routes.get("/participants", getParticipants)
routes.get("/messages",validateLimit, getMessages)
routes.post("/participants", validatePostParticipants, postParticipants)
routes.post("/messages", validatePostMessages, postMessages)
routes.post("/status", validatePostStatus, postStatus)
routes.delete("/messages/:id", validateDelete, deleteMessages)
routes.put("/messages/:id", validatePut, putMessages)

export {
    routes
} 