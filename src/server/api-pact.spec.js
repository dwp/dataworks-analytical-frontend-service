import path from 'path'
import { pactWith } from 'jest-pact';
import { Pact } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/dsl/matchers';
import { apiCall } from './api.js';

function catchAndContinue(err, done) {
  fail(err);
  done();
}

const provider = new Pact({
  consumer: "FrontEndService",
  provider: "OrchestrationService",
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  dir: path.resolve(process.cwd(), "pacts"),
  logLevel: "WARN",
})

describe('Pact Test Suite', () => {

  const EXPECTED_BODY = {
    url: "userContainerUrl/validUser/",
    redirect: false
  }

  beforeAll((done) => { 
    provider.setup()
    .then( opts =>  {
      process.env.REACT_APP_OS_URL=provider.mockService.baseUrl;
      done()
    }).catch((err) => catchAndContinue(err, done))
  });
 
  describe('connect to jupyterhub', () =>  {
    beforeEach((done) => {
      provider.addInteraction({
        state: 'I am awaiting a connection',
        uponReceiving: 'Valid request for remote tooling access',
        withRequest: {
          method: 'POST',
          path: '/connect',
          headers: { Authorisation: 'token', 'Content-Type': 'application/json' },
          body: {}
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type':'application/json' },
          body: EXPECTED_BODY
        }
      }).then(() => {
         done();
      }).catch((err) => catchAndContinue(err, done));
    })
 
    test('authorized token', (done) => {
      apiCall('token', 'connect')
        .then(
           ret => {
             console.log("Return value is " + ret);
             var retObj = JSON.parse(ret)
             expect(retObj.url).toBe('userContainerUrl/validUser/');
             expect(retObj.redirect).toBe(false)
           },
           error => {
             console.log("Unexpected error from test: " + JSON.stringify(error));
           }
        ).then( ()=> { done()});
    })
  })

  describe('unauthorized token', () => {
    beforeEach((done) => {
      provider.addInteraction({
        state: 'I am awaiting an invalid connection',
        uponReceiving: 'Invalid request for remote tooling access',
        withRequest: {
          method: 'POST',
          path: '/connect',
          headers: { Authorisation: 'badtoken', 'Content-Type': "application/json" },
          body: {}
        },
        willRespondWith: {
          status: 401,
          headers: { 'Content-Type':'application/json' }
        }
      }).then(() => done()).catch((err) => catchAndContinue(err, done));
    })

    test('failure captured', (done) => {
       apiCall('badtoken', 'connect')
        .catch( error => {
          expect(error.status).toBe(401);
        })
        .then( () => { done()} );
    })
  })
 

  // Write pact files
  afterAll((done) => {
    provider.verify();
    return provider.finalize().then(() => done()).catch((err) => catchAndContinue(err, done));
  })
})
