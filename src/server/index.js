import path from 'path';
import fs from 'fs';
import express from 'express';
import http from 'http';
import https from 'https';
import "regenerator-runtime/runtime.js";

import templateApp from './template'


import  { connect, disconnect } from '../utils/api.js'
import regeneratorRuntime from "regenerator-runtime";
import {getTlsConfig} from "./serverConfig";

const port = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build', {index: false}));

app.get('/connect', async (req, res) => {
    console.log('Connection request to Orchestration Service');
    const url = await connect(req.id_token);
    return res.send(url);
});

app.get('/disconnect',(req, res) => {
    console.log('Disconnection request to Orchestration Service');
    disconnect(req.id_token);
});

app.get('/*', (req, res) => {
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send();
        }

        return res.send(templateApp(data));
    });
});

const tlsConfig = getTlsConfig();

if (tlsConfig) https.createServer(tlsConfig, app).listen(port, () => console.info(`Server is HTTPS listening on port ${port}`));
else http.createServer(app).listen(port, () => console.info(`Server is HTTP listening on port ${port}`));
