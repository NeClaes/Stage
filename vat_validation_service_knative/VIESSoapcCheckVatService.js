const soap = require('soap');
const url = 'http://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl'

module.exports = function VIESSoapcCheckVatService(countryCode, vatNumber) {
    return new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if (err) {
                reject(Error(err))
            }
            else {
                var myarg = {
                    countryCode: countryCode,
                    vatNumber: vatNumber
                }
                client.checkVat(myarg, function (err, result) {
                    if (err) {
                        reject(Error(err))
                    }
                    else {
                        return resolve(result)
                    }
                })
            }
        })
    })
}

