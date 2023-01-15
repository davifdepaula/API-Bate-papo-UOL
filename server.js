import { app } from "./src/app.js"
import { db } from "./src/config/connection.js"
import dayjs from "dayjs"

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    setInterval(async() => {
        const users = await db.collection("participants").find().toArray()
        users.map(async(user) => {if(Date.now() - user.lastStatus > 10000){
            await db.collection("participants").deleteOne({user: user.name})
            await db.collection("messages").insertOne({from: user.name, to: 'Todos', text: 'sai da sala...', type: 'status', time: dayjs().format("hh:mm:ss")})
        }})
    }, 15000)
    console.log(`Server listen in port ${PORT}`)
})