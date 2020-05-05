# dataworks-analytical-frontend-service
Frontend service providing user authentication and interface with orchestration service

## Environment Variables
This image requires the following environment variables at runtime:

| Env var | Description | Example value |
| ------- | ----------- | ------------- |
| REACT_APP_OS_URL    | URL for orchestration service | https://localhost:3000/ |
| REACT_APP_REGION    | Region we are running in | eu-west-2 |
| REACT_APP_USERPOOL_WEBCLIENT_ID    | Cognito Appication ID | - |
| REACT_APP_USERPOOLID    | Cognito User Pool ID | - |
| REACT_APP_ENV    | Where we are deploying | development |
| ALLOW_HTTP (Optional)    | Allow the server to accept HTTP requests  | true |
