# dataworks-analytical-frontend-service
Frontend service providing user authentication and interface with orchestration service

## Environment Variables
This image requires the following environment variables at runtime:

| Env var | Description | Example value |
| ------- | ----------- | ------------- |
| REACT_APP_UI_LOGIN_URL    | URL to redirect user for login | https://domain.cogntio.com/login?client_id=id&redirect_uri=https://example.com |
| REACT_APP_API_CONNECT_ENDPOINT    | URL for orchestration service `/connect` endpoint | https://localhost:3000/connect |
| ALLOW_HTTP (Optional)    | Allow the server to accept HTTP requests  | true |
