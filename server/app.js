import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotnet from 'dotenv'
import { connectDB } from './db/connection.js'
import OpenAiRoute from './routes/openai.js'
import UserRoute from './routes/user.js'

dotnet.config()

let app = express()
let port = process.env.PORT

app.use(cors({ credentials: true, origin: process.env.SITE_URL }))
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))

app.use('/api/openai', OpenAiRoute)
app.use('/api/user', UserRoute)

connectDB((err) => {
    if (err) return console.log("MongoDB Connect Failed : ", err)

    console.log("MongoDB Connected")

    app.listen(port, () => {
        console.log("server started")
    })
})

