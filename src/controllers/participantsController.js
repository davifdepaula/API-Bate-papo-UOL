import { db } from "../config/connection.js"
import dayjs from "dayjs"

const getParticipants = async(req, res) => {
    const participants = await db.collection("participants").find().toArray()
    res.send(participants)
}

const postParticipants = async(req, res) => {
    const {name} = req.body
    await db.collection("participants").insertOne({name, "lastStatus": Date.now()})
    await db.collection("messages").insertOne({from: name, to: 'Todos', text: 'entra na sala...', type: 'status', time: dayjs().format("hh:mm:ss")})
    return res.sendStatus(201)
}


export {
    getParticipants,
    postParticipants
}