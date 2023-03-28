import express from 'express'
import cors from 'cors'
import dotnet from 'dotenv'
import { connectDB } from './db/connection.js'
import OpenAiRoute from './routes/openai.js'

dotnet.config()

let app = express()
let port = process.env.PORT

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/openai', OpenAiRoute)

connectDB((err) => {
    if (err) return console.log("MongoDB Connect Failed : ", err)

    console.log("MongoDB Connected")

    app.listen(port, () => {
        console.log("server started")
    })
})

