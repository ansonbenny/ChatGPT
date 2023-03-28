import { MongoClient } from "mongodb";

let db = null

const connectDB = async (done) => {
    try {
        var data = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
        db = data.db('chatGPT')
        done()
    } catch (err) {
        done(err)
    }
}

export { connectDB, db }