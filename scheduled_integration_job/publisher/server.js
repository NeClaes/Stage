'use strict'

const express = require('express')
const dotenv = require('dotenv');
dotenv.config();


const { publishEvent } = require('./mqtt')

const port = process.env.PORT || 8080

const app = express();

const runAtStart = () => {
    console.log('hello')
    publishEvent({ sometext: 'test123' })
}

app.get('/', (req, res) => {
    try {
        res.status(200).json({ "status": "succes" })
    } catch (err) {
        res.status(500).json({ "status": "failed" })
    }

})

runAtStart()


app.listen(port, () => console.log(`app is running on port ${port}`))
