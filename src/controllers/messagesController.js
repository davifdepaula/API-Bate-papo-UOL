import { db } from "../config/connection.js"
import dayjs from "dayjs"


const getMessages = async(req, res) => {
    const messages = await db.collection("messages").find().toArray()
    return res.send(messages)
}

const postMessages = async(req, res) => {
    const {to, text, type} = req.body
    const {from} = req.headers

    await db.collection("messages").insertOne({
        from: from,
        to: to,
        text: text,
        type: type,
        time: dayjs().format("hh:mm:ss")
    })

    return res.sendStatus(201)
}

export {
    getMessages,
    postMessages
}