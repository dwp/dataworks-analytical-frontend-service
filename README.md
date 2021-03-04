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

The app needs some environment variables to run. A script is supplied for generating these based on the development environment.

```
./generate_local_env.sh
```

Copy and paste the output export commands into your shell to set the environment.

### Development Cycle

Make your changes, then...

* Start the dev server using ```npm start dev```
* Wait for the application to build - this takes some time.
* If ```index.html``` is missing, you didn't wait long enough.
* CTRL-C to exit.

If you make further changes, you must restart the dev server. Auto reload isn't sufficient.