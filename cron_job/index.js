'use strict';

const express = require('express')
const got = require('got')
const cheerio = require('cheerio')
const dotenv = require('dotenv')
dotenv.config();

const port = process.env.PORT || 8080

const app = express();

app.get('/', async (req, res) => {
    try {
        const response = await got('https://www.coolblue.be/nl/consoles/computerplatform:nintendo-switch').then(response => {
            const $ = cheerio.load(response.body)

            let consoles = []
            let j = 1;

            $('h3').each((i, title) => {
                let url = title.parent.attribs.href
                let id = url.split('/')[3]
                let text_1 = title.children[0].data
                text_1 = text_1.replace(/(\r\n|\n|\r)/gm, "")
                text_1 = text_1.trim()
                let strong = $('strong.sales-price__current')[i]
                let text_2 = strong.children[0].data
                let leverbaar = $('button.button--order')[j]
                let isLeverbaar = false
                if (leverbaar != undefined) {
                    leverbaar = JSON.parse(leverbaar.parent.attribs['data-atc-product-data']).productIds[0]
                    if (id == leverbaar) {
                        isLeverbaar = true
                        j++
                    }
                }

                consoles.push({ name: text_1, price: text_2, url: `https://www.coolblue.be${url}`, leverbaar: isLeverbaar })

            })

            res.status(200).send(consoles)
        }).catch(err => {
            res.status(500).send({
                error: 500,
                message: err.message
            })
        })


    } catch (error) {
        res.status(500).send({
            error: 500,
            message: error.message
        })
    }

});



app.listen(port, () => console.log(`app is running on port ${port}`));