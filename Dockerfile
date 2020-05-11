FROM node:alpine
ENV APP_NAME=dataworks-analytical-frontend-service
ENV APP_HOME=/app
ENV HTTPS=true
ENV PORT=8443

RUN mkdir ${APP_HOME}
WORKDIR ${APP_HOME}

COPY package*.json ./ 
COPY src/ ./src/
COPY public/ ./public/
COPY webpack.server.js ./
COPY .babelrc ./

RUN npm install
RUN npm install --save react-mdl
RUN npm run build

RUN apk add openssl

COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

EXPOSE 8443

ENTRYPOINT ["./entrypoint.sh"]
