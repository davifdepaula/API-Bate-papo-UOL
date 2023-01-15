import { db } from "../config/connection.js";

const postStatus = async(req, res) => {
    const {user} = req.headers
    const participant = await db.collection("participants").updateOne({name: user}, {$set: {lastStatus: Date.now()}})
    return res.sendStatus(200)
}


export {
    postStatus
}