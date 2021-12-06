const prometheus = require('prom-client')

const Registry = prometheus.Registry;
export const register = new Registry();

const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({register});


const httpGauge = new prometheus.Gauge({
    name: "http_requests_total",
    help: "The total number of http requests",
    labelNames: ['method', 'responseCode'],
    registers: [register]
})

export function incHttpGauge(method, responseCode) {
    httpGauge.labels(method, responseCode).inc()
}