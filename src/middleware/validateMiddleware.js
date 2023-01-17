import { db } from "../config/connection.js"
import joi from "joi"
import { ObjectID } from "bson"

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
        user: joi.string().required()})
    const exist = await db.collection("participants").findOne({name: req.headers.user})
    if(!exist) return res.sendStatus(422)   
    const messageValidation = messageSchema.validate(req.body, {abortEarly: false})
    const userValidation = userSchema.validate({user: req.headers.user})
    if(userValidation.error) {
        return res.status(422).send("deve ser string não vazio")
    }
    if(messageValidation.error) {
        const errors = messageValidation.error.details.map((detail) => {
           return detail.message
        })
        return res.status(422).send(errors)
    }   
    next()
}

const validatePostStatus = async(req, res, next) => {
    const {user} = req.headers
    const exist = await db.collection("participants").findOne({name: user})
    if(!exist) return res.sendStatus(404)
    next()
}

const validateLimit = (req, res, next) => {
    const {limit} = req.query
    const limitSchema = joi.object({
        limit: joi.number().greater(0)
    })

    const limitValidation =limitSchema.validate({limit})

    if(limitValidation.error) return res.sendStatus(422)

    next()
}

const validateDelete = async(req, res, next) => {
    const {id} = req.params
    const {user} = req.headers
    const exist = await db.collection("messages").findOne({_id:ObjectID(id)})

    if(!exist) return res.sendStatus(404)
    console.log(exist)
    if(exist.from != user) return res.sendStatus(401)    
    next()
}

export{
    validatePostParticipants,
    validatePostMessages,
    validatePostStatus,
    validateLimit,
    validateDelete
}