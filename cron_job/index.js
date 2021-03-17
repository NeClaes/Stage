'use strict'

const express = require('express')
const dotenv = require('dotenv');
dotenv.config();


const port = process.env.PORT || 8080

const app = express();

app.get('/', (req, res) => {
    try {
        console.log('test')
        res.status(200).json({ "status": "succes" })
    } catch (err) {
        res.status(500).json({ "status": "failed" })
    }

})


app.listen(port, () => console.log(`app is running on port ${port}`))
