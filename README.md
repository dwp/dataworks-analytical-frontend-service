# Dataworks Analytical Frontend Service
Frontend service providing user authentication and interface with orchestration service.

The Analytical Frontend Service is the first point of interaction between analytical users and the Analytical Environment. It has 2 main goals:

1. User authentication
2. Request provisioning and deprovisioning of tooling environments

The app uses an Express.js server to handle Server Side Rendering (to inject runtime configuration) and to act as a proxy for requests to the Orchestration Service ([GitHub](https://github.com/dwp/orchestration-service/)).

## Authentication
AWS cognito is used as the authentication provider. The Cognito User Pool and app client must support the `CUSTOM_AUTH` and `USER_SRP_AUTH` flows. 

AWS Amplify components are used for to handle the authentication flow. However, due to implementation oversights in the Amplify library, custom components have been created for some of the auth steps (see PRs #32 and #45 ).

Direct login with username and password is not supported on Internet Explorer and older versions of Microsoft Edge (before the switch to Chromium) due to missing/incorrect implementation for the Web Components standard used by AWS Amplify auth components. 

Additionally, the app uses an inelegant fix (documented in PR #70) to support ADFS login in Internet Explorer and non-chromium Edge. The fix hooks onto internal AWS Amplify Auth configuration that is not supported in later versions of the Amplify library. This will have to be addressed in the future before upgrading the library.

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

### API Calls
Since the express applications runs as a Single Page application within the users browser environments, the API calls it performs go
to the node.js Express backend, which in turn use node.js Rest calls to the Orchestration service.

So an API call in a React page calls into src/utils/api.js (which is located in the users browser javascript environment)
This in turn builds a request to call the Express node.js backend api, whose endpoints are located in src/server/.
The endpoints are defined in src/server/index.js and these in turn use the src/server/api.js layer to call into the Orchestration Service.

So we have React Page -> utils/api.js -> server/index.js -> server/api.js -> Internal service (Orchestration Service)
