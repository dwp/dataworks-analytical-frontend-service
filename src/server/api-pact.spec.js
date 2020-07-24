import path from 'path'
import { pactWith } from 'jest-pact';
import { Pact } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/dsl/matchers';
import { connect } from './api.js';

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
          headers: { 'Content-Type':'text/plain' },
          body: like('userContainerUrl/validUser/')
        }
      }).then(() => {
         done();
      }).catch((err) => catchAndContinue(err, done));
    })
 
    test('authorized token', (done) => {
      connect('token')
        .then(
           url => {
             expect(url).toBe('userContainerUrl/validUser/');
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
          headers: { 'Content-Type':'text/plain' }
        }
      }).then(() => done()).catch((err) => catchAndContinue(err, done));
    })

    test('failure captured', (done) => {
       connect('badtoken')
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
