import ReactDOMServer from 'react-dom/server';
import App from "../App";
import React from "react";
import serialize from 'serialize-javascript';
import { StaticRouter } from 'react-router-dom';
import getRuntimeConfig from "./runtimeConfig";

const renderedApp = ReactDOMServer.renderToString(<StaticRouter><App/></StaticRouter>);

/**
 * Function that takes an HTML string and injects the
 * rendered React app and runtime configuration
 */
function templateApp(htmlString) {
    const jsonConfiguration = serialize(getRuntimeConfig(), {isJSON: true});

    return htmlString.replace('<div id="root"></div>',
        `
        <div id="root">${renderedApp}</div>
        <script>window.__CONFIG__ = ${jsonConfiguration}</script>
     `)
}

export default templateApp;
