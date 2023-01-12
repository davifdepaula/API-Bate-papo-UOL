import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()
const MONGO_URI = process.env.DATABASE_URL
const mongoClient = new MongoClient(MONGO_URI)


try {
    await mongoClient.connect()
    console.log("conectado ao banco de dados")    
} catch (error) {
    console.log(error)
}

const db = mongoClient.db()

export {
    db
}