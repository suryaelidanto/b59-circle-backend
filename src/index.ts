import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Circle API 😁!")
})

app.listen(port, () => {
    console.info(`Server is running at port ${port}`)
})


