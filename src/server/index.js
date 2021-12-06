import path from 'path';
import fs from 'fs';
import express, { response } from 'express';
import http from 'http';
import https from 'https';
import "regenerator-runtime/runtime.js";

import templateApp from './template'
import {getTlsConfig} from "./serverConfig";
import {apiCall} from './api.js';
import {register} from './metrics'


// include the library
const dwpNodeLogger = require('@dwp/node-logger');

const logger = dwpNodeLogger('web');

const port = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build', {index: false}));
app.use(express.json());

app.get('/metrics', (req, res) => {
    try {
        res.setHeader('Content-Type', register.contentType)
        res.end(register.metrics())
    } catch(e){
        res.status(500).send('Error occurred, cannot return metrics.')
        logger.error(e.message)
    }
})

app.post('/connect', async (req, res) => {
    console.info('Connection request to Orchestration Service');

    try {
        const connInfo = await apiCall(req.body.id_token, 'connect', req.body);
        res.type('json')
        return res.json(connInfo)
    } catch(e){
        res.status(500).send('Error occurred, cannot connect to Orchestration Service');
        logger.error(e.message);
    }

});

app.get('/disconnect', async (req, res) => {
    console.log('Disconnection request to Orchestration Service');
    try {
        const response = await apiCall(req.query.id_token, 'disconnect');
        res.send(response);
    } catch (e){
        res.status(500).send("Error shutting down environments");
        logger.error(e.message);
    }
});

app.get('/verify-user', async (req, res) => {
    console.log('Verify user request to Orchestration Service')
    try {
        const response = await apiCall(req.query.id_token, 'verify-user');
        res.send(response.text);
    } catch (e){
        if (e.status >= 500) {
            res.status(500).send("Error occurred, cannot connect to Orchestration Service to verify user");
            logger.error(e.message);
        }
        else {
            res.status(e.status).send(`Connection established - ${e.status} response`);
            logger.info(`Connection established - ${e.status} response`);
        }
        
    }
})

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
