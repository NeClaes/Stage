const mqtt = require('mqtt')
const dotenv = require('dotenv');
dotenv.config();

const client = mqtt.connect({
    host: `${process.env.BROKER_URL}`,
    port: process.env.BROKER_PORT,
    username: process.env.BROKER_USER,
    password: process.env.BROKER_PWD
})

const publishEvent = (json) => {
    client.on('connect', function () {
        client.subscribe('change-db', function (err) {
            if (!err) {
                console.log(json)
                client.publish('change-db', JSON.stringify(json))
                client.end()
            } else {
                console.log(err)
            }
        })
    })
}

module.exports = { publishEvent }