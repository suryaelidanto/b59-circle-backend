const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.get("/", (req, res) => {
    res.send("Welcome to Circle API!")
})

app.listen(port, () => {
    console.info(`Server is running at port ${port}`)
})


