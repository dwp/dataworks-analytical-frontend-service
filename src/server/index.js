import path from 'path';
import fs from 'fs';
import express from 'express';
import http from 'http';
import https from 'https';
import "regenerator-runtime/runtime.js";

import templateApp from './template'


import {connect, disconnect} from '../utils/api.js'
import regeneratorRuntime from "regenerator-runtime";
import {getTlsConfig} from "./serverConfig";

// include the library
const dwpNodeLogger = require('@dwp/node-logger');

const logger = dwpNodeLogger('web');

const port = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build', {index: false}));

app.get('/connect', async (req, res) => {
    console.info('Connection request to Orchestration Service');

    try {
        const url = await connect(req.query.id_token);
        return res.send(url)
    } catch(e){
        res.status(500).send('Error occurred, cannot connect to Orchestration Service');
        logger.error(e.message);
    }

});

app.get('/disconnect', async (req, res) => {
    console.log('Disconnection request to Orchestration Service');
    try {
        const response = await disconnect(req.query.id_token);
        res.send(response);
    } catch (e){
        res.status(500).send("Error shutting down environments");
        logger.error(e.message);
    }
});

app.get('/faq', (req, res) => {
    const faqFile = path.resolve('./build/faq.html');
    fs.readFile(faqFile, 'utf8', (err, data) => {
        if (err) {
            logger.error('Something went wrong:', err);
            return res.status(500).send();
        }

        return res.send(data);
    });
});

app.get('/', (req, res) => {
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            logger.error('Something went wrong:', err);
            return res.status(500).send();
        }

        return res.send(templateApp(data));
    });
});

const tlsConfig = getTlsConfig();

if (tlsConfig) https.createServer(tlsConfig, app).listen(port, () => logger.info(`Server is HTTPS listening on port ${port}`));
else http.createServer(app).listen(port, () => logger.info(`Server is HTTP listening on port ${port}`));
