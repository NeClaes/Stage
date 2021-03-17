'use strict';

const express = require('express');

const validateSyntax = require("./ValidateSyntax")
const VIESSoapcCheckVatService = require("./VIESSoapcCheckVatService")


const port = process.env.PORT || 80

const app = express();

app.get('/api/validate/:vat', async (req, res) => {
    try {
        if (req.params.vat) {
            // Do local validation of the VAT Number
            var res_temp = validateSyntax(req.params.vat)
            var responseBody = {
                "isValid": res_temp.valid,
                "countryCode": res_temp.countryCode,
                "vatNumber": res_temp.vatNumber
            }

            // Do remote validation using VIES SOAP Service
            if (req.query.includeViesLookup === "true" && res_temp.valid) {
                try {
                    var viesRes = await VIESSoapcCheckVatService(res_temp.countryCode, res_temp.vatNumber)
                    responseBody.vies = {
                        "exists": viesRes.valid,
                        "name": viesRes.name,
                        "address": viesRes.address
                    }
                } catch (error) {
                    responseBody.vies = {
                        lookupFailure: `Could not do lookup. VIES service returned: '${error.message}'`
                    }
                }
            }


            res.status(200).send(responseBody)

        } else {
            res.status(400).send({
                error: 400,
                message: 'No VAT number provided'
            })
        }

    } catch (error) {
        res.status(500).send({
            error: 500,
            message: error.message
        })
    }

});



app.listen(port);