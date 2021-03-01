'use strict';

const express = require('express');

const port = process.env.PORT || 8080

const app = express();

app.get('/api/validate/:iban', (req, res) => {
    res.send({ 'isValid': true });
});

app.listen(port);