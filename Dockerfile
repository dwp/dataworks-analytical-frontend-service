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
RUN npm run build

EXPOSE 8443

CMD ["node","server-build/index.js"]
