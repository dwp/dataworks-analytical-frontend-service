FROM node:14.16-alpine
ENV APP_NAME=dataworks-analytical-frontend-service
ENV APP_HOME=/app
ENV HTTPS=true
ENV PORT=8443

RUN mkdir ${APP_HOME}
WORKDIR ${APP_HOME}

COPY package*.json ./ 

RUN apk add openssl
RUN npm install

COPY src/ ./src/
COPY public/ ./public/
COPY webpack.server.js ./
COPY .babelrc ./

RUN npm run build

COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

EXPOSE 8443

ENTRYPOINT ["./entrypoint.sh"]
