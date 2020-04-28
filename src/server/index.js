import path from 'path';
import fs from 'fs';
import React from 'react';
import express from 'express';

import templateApp from './template'

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build'));

app.get('/*', (req, res) => {

    const indexFile = path.resolve('../build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send();
        }

        return res.send(templateApp(data, {}));
    });
});

app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
});