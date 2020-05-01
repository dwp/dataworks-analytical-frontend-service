#!/usr/bin/env sh

## Script to generate SSL certificates and then start the app

mkdir -p /etc/${APP_NAME}
/usr/bin/openssl req -x509 -newkey rsa:4096 -keyout /etc/${APP_NAME}/key.pem -out /etc/${APP_NAME}/cert.pem -days 3650 -nodes -subj '/CN=${APP_NAME}'

node server-build/index.js
