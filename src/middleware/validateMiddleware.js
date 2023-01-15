import { db } from "../config/connection.js"
import joi from "joi"

const validatePostParticipants = async(req, res, next) => {
    const participantsSchema = joi.object({
        name: joi.string().required()
    })
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

    const userSchema = joi.object({
        user: joi.string().required()
    })
    const messagevalidation = messageSchema.validate(req.body, {abortEarly: false})

    const userValidation = userSchema.validate(req.headers)

    if(!userValidation.error) {
        return res.status(422).send("deve ser string não vazio")
    }

    if(messagevalidation.error) {
        console.log(validation.error)
        const errors = validation.error.details.map((detail) => {
           return detail.message
        })
        return res.status(422).send(errors)
    }  
    next()
}




export{
    validatePostParticipants,
    validatePostMessages
}