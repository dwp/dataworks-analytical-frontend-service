import fs from 'fs';
import path from 'path';

export function getTlsConfig() {
    const CERT_DIR = `/etc/${process.env.APP_NAME}`;
    let config;
    try {
        config = {
            key: fs.readFileSync(path.join(CERT_DIR, 'key.pem')),
            cert: fs.readFileSync(path.join(CERT_DIR, "cert.pem"))
        }
    } catch (e) {
        if(!process.env.ALLOW_HTTP) {
            console.error("Error reading TLS certificates and ALLOW_HTTP not set");
            throw e;
        }
        else{
            console.warn("Error reading TLS certificates, using HTTP", e);
            return null;
        }
    }

    console.info("Successfully read TLS certificates, using HTTPS");
    return config;
}
