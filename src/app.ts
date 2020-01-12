require('dotenv').config()
import Koa from 'koa'
import sampleAPI from './API/sampleAPI'
import mongoose from 'mongoose'

import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser'

const app = new Koa()

mongoose.connect(process.env.MONGODB_PATH!, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(bodyParser())
app.use(sampleAPI.routes())

export default app
