# Dataworks Analytical Frontend Service
Frontend service providing user authentication and interface with orchestration service,

## Running Locally

### Dependencies

Install the NPM modules, if you are using a UC Mac you need to supply the CA cert:

```
export NODE_EXTRA_CA_CERTS="/usr/local/scripts/Certificates/Universal Credit Root CA.pem"
npm install
```

### Setup the Application Environment

The app needs some environment variables to run. A script is supplied for generating these based on the development environment. Ensure you have a valid AWS token before proceeding.

```
 export AWS_PROFILE="<your dataworks dev profile>"
./generate_local_env.sh
```

Copy and paste the output export commands into your shell to set the environment.

### Development Cycle

Make your changes, then...

* Start the dev server using ```npm run dev```
* Wait for the application to build - this takes some time.
* If ```index.html``` is missing, you didn't wait long enough.
* CTRL-C to exit.

If you make further changes, you must restart the dev server. Auto reload isn't sufficient.

### Environment Variables
This image requires the following environment variables at runtime:

| Env var | Description | Example value |
| ------- | ----------- | ------------- |
| REACT_APP_OS_URL    | URL for orchestration service | https://localhost:3000/ |
| REACT_APP_REGION    | Region we are running in | eu-west-2 |
| REACT_APP_USERPOOL_WEBCLIENT_ID    | Cognito Appication ID | - |
| REACT_APP_USERPOOLID    | Cognito User Pool ID | - |
| REACT_APP_ENV    | Where we are deploying | development |
| ALLOW_HTTP (Optional)    | Allow the server to accept HTTP requests  | true |

This list is not complete however the ```generate_local_env.sh``` script will generate all required variables.