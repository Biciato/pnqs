
import express from 'express'
import routes from './routes'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { config } from './config'

const env = process.env.NODE_ENV
const stage = config[env]

dotenv.config()
 
const app = express()
 
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

if (env !== 'production') {
    app.use(morgan('combined'))
}
 
routes(app)
 
app.listen(`${stage.port}`, () => console.log(`you are server is running on ${stage.port}`))

export default app