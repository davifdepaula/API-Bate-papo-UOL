import { db } from "../config/connection.js"
import dayjs from "dayjs"


const getMessages = async(req, res) => {
    const messages = await db.collection("messages").find().toArray()
    return res.send(messages)
}

export {
    getMessages
}