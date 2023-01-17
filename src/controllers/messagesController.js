import { db } from "../config/connection.js"
import dayjs from "dayjs"
import { ObjectId } from "mongodb"


const getMessages = async(req, res) => {
    const {limit} = req.query
    const {user} = req.headers
    let allMessages = await db.collection("messages").find().toArray()
    let messages = allMessages.filter(message => {
        if(message.type == "private_message" ){
            if(message.to == user || message.from == user){
                return message
            }
        }
        else return message
    })
    if(limit > 0) return res.send(messages.reverse().slice(0, limit))
    return res.send(messages)
}

const postMessages = async(req, res) => {
    const {to, text, type} = req.body
    const {user} = req.headers

    await db.collection("messages").insertOne({
        from: user,
        to: to,
        text: text,
        type: type,
        time: dayjs().format("hh:mm:ss")
    })

    return res.sendStatus(201)
}

const deleteMessages = async(req, res) => {
    const {id}= req.params
    await db.collection("messages").deleteOne({_id: ObjectId(id)})
    return res.sendStatus(200)
}

const putMessages = async(req, res) => {
    const {to, text, type} = req.body
    const {user} = req.headers

    await db.collection("messages").updateOne({_id: ObjectId(id)}, {
        from: user,
        to: to,
        text: text,
        type: type,
    })
    return res.sendStatus(200)
}

export {
    getMessages,
    postMessages,
    deleteMessages,
    putMessages
}