import { db } from "../config/connection.js"
import joi from "joi"

const participantsSchema = joi.object({
    name: joi.string().required()
})

const validatePostParticipants = async(req, res, next) => {
    const validation = participantsSchema.validate(req.body)
    if(validation.error) {
        return res.status(422).send("deve ser string não vazio")
    }
    const exist = await db.collection("participants").findOne({name: req.body.name})
    if(exist) return res.sendStatus(409)    
    next()
}

const validatePostMessages = async(req, res, next) => {
    const messageSchema = joi.object({
        to: joi.string().required(),
        text: joi.string().required(),
        type: joi.string().valid("message", "private_message").required()
    })
    
    const userValidation = participantsSchema.validate(req.headers)
    const validation = messageSchema.validate(req.body, {abortEarly: false})

    if(userValidation.error) {
        return res.status(422).send("deve ser string não vazio")
    }

    if(validation.error) {
        console.log(validation.error)
        const errors = validation.error.details.map((detail) => {
           return detail.message
        })

        return res.status(422).send(errors)
    }
    const exist = await db.collection("participants").findOne({name: req.body.name})
    if(exist) return res.sendStatus(409)    
    next()
}




export{
    validatePostParticipants,
    validatePostMessages
}