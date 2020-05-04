import path from 'path';
import fs from 'fs';
import express from 'express';

import templateApp from './template'
import getConfig from '../utils/appConfig'
import getRuntimeConfig from './runtimeConfig'

import  { connect, disconnect } from '../utils/api.js'
import regeneratorRuntime from "regenerator-runtime";

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build', {index: false}));

app.get('/connect', async (req, res) => {
    console.log('Connection request to Orchestration Service');
    url = await connect(req.id_token);
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


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
