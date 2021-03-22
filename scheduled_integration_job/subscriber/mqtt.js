const mqtt = require('mqtt')
const dotenv = require('dotenv');
dotenv.config();

const client = mqtt.connect({
    host: `${process.env.BROKER_URL}`,
    port: process.env.BROKER_PORT,
    username: process.env.BROKER_USER,
    password: process.env.BROKER_PWD
})

client.on('connect', function () {
    client.subscribe('change-db', function (err) {
        if (err) {
            console.log("error", err.message)
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(JSON.parse(message))
})