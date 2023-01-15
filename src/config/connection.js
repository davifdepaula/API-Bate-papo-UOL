import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()
const MONGO_URI = process.env.DATABASE_URL
const mongoClient = new MongoClient(MONGO_URI)
let db

try {
    await mongoClient.connect()
    db = mongoClient.db()
    console.log("conectado ao banco de dados")    
} catch (error) {
    console.log(error)
}

export {
    db
}