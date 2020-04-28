import ReactDOMServer from 'react-dom/server';
import App from "../App";
import React from "react";
import serialize from 'serialize-javascript';

const renderedApp = ReactDOMServer.renderToString(<App/>);

/**
 * Function that takes an HTML string and injects the
 * rendered React app and runtime configuration
 */
function templateApp(htmlString, runtimeConfiguration) {
    const jsonConfiguration = serialize(runtimeConfiguration, {isJSON: true});

    return htmlString.replace('<div id="root"></div>',
        `
        <div id="root">${renderedApp}</div>
        <script>window.__CONFIG__ = ${jsonConfiguration}</script>
     `)
}

export default templateApp;
