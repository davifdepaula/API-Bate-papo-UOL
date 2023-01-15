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


export{
    validatePostParticipants
}