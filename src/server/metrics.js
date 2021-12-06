const prometheus = require('prom-client')

const Registry = prometheus.Registry;
export const register = new Registry();

const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({register});


export const httpGauge = new prometheus.Gauge({
    name: "http_requests_total",
    help: "The total number of http requests",
    labelNames: ['service', 'method', 'responseCode'],
    registers: [register]
})
