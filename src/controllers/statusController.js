import { db } from "../config/connection.js";

const putStatus = async(req, res) => {
    const {user} = req.headers
    const userToBeupdated = await db
                            .collection("participants")
                            .updateOne({name: user}, {$set: {lastStatus: Date.now()}})
    console.log(userToBeupdated)

    return res.status(200)
}


export {
    putStatus
}