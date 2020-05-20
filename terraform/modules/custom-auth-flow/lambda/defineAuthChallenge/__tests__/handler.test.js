const handler = require('../handler.js').handler;
const context = {};
const sessionLength1 = {version: '1',  region: 'eu-west-0',  userPoolId: 'eu-west-0-SOMETHING',  userName: 'TestUser',  callerContext: {    awsSdkVersion: 'aws-sdk-unknown-unknown',    clientId: 'testClientID'  },  triggerSource: 'DefineAuthChallenge_Authentication',  request: {    userAttributes: {      sub: '12345678',      email_verified: 'true',      'cognito:user_status': 'FORCE_CHANGE_PASSWORD',    phone_number_verified: 'true',      phone_number: '+447891098765',     email: 'test@email.co.uk'    },    session: [ {       "challengeName": "SRP_A",       "challengeResult": true,       "challengeMetadata": null    } ],    userNotFound: false  },  response: { challengeName: null, issueTokens: null, failAuthentication: null }}
const sessionLength2 = {version: '1',  region: 'eu-west-0',  userPoolId: 'eu-west-0-SOMETHING',  userName: 'noMfa',  callerContext: {    awsSdkVersion: 'aws-sdk-unknown-unknown',    clientId: 'testClientID'  },  triggerSource: 'DefineAuthChallenge_Authentication',  request: {    userAttributes: {      sub: '12345678',      email_verified: 'true',      'cognito:user_status': 'FORCE_CHANGE_PASSWORD',    phone_number_verified: 'true',      phone_number: '+447891098765',     email: 'test@email.co.uk'    },    session: [ {       "challengeName": "SRP_A",       "challengeResult": true,       "challengeMetadata": null    }, {       "challengeName": "PASSWORD_VERIFIER",       "challengeResult": true,       "challengeMetadata": null    } ],    userNotFound: false  },  response: { challengeName: null, issueTokens: null, failAuthentication: null }}
const sessionLength2Fail = {version: '1',  region: 'eu-west-0',  userPoolId: 'eu-west-0-SOMETHING',  userName: 'noMfa',  callerContext: {    awsSdkVersion: 'aws-sdk-unknown-unknown',    clientId: 'testClientID'  },  triggerSource: 'DefineAuthChallenge_Authentication',  request: {    userAttributes: {      sub: '12345678',      email_verified: 'true',      'cognito:user_status': 'FORCE_CHANGE_PASSWORD',    phone_number_verified: 'true',      phone_number: '+447891098765',     email: 'test@email.co.uk'    },    session: [ {       "challengeName": "SRP_A",       "challengeResult": true,       "challengeMetadata": null    }, {       "challengeName": "PASSWORD_VERIFIER",       "challengeResult": false,       "challengeMetadata": null    } ],    userNotFound: false  },  response: { challengeName: null, issueTokens: null, failAuthentication: null }}
const sessionLength2mfa = {version: '1',  region: 'eu-west-0',  userPoolId: 'eu-west-0-SOMETHING',  userName: 'testUser',  callerContext: {    awsSdkVersion: 'aws-sdk-unknown-unknown',    clientId: 'testClientID'  },  triggerSource: 'DefineAuthChallenge_Authentication',  request: {    userAttributes: {      sub: '12345678',      email_verified: 'true',      'cognito:user_status': 'FORCE_CHANGE_PASSWORD',    phone_number_verified: 'true',      phone_number: '+447891098765',     email: 'test@email.co.uk'    },    session: [ {       "challengeName": "SRP_A",       "challengeResult": true,       "challengeMetadata": null    }, {       "challengeName": "PASSWORD_VERIFIER",       "challengeResult": true,       "challengeMetadata": null    } ],    userNotFound: false  },  response: { challengeName: null, issueTokens: null, failAuthentication: null }}
const sessionLength3 = {version: '1',  region: 'eu-west-0',  userPoolId: 'eu-west-0-SOMETHING',  userName: 'noMfa',  callerContext: {    awsSdkVersion: 'aws-sdk-unknown-unknown',    clientId: 'testClientID'  },  triggerSource: 'DefineAuthChallenge_Authentication',  request: {    userAttributes: {      sub: '12345678',      email_verified: 'true',      'cognito:user_status': 'FORCE_CHANGE_PASSWORD',    phone_number_verified: 'true',      phone_number: '+447891098765',     email: 'test@email.co.uk'    },    session: [ {       "challengeName": "SRP_A",       "challengeResult": true,       "challengeMetadata": null    }, {       "challengeName": "PASSWORD_VERIFIER",       "challengeResult": true,       "challengeMetadata": null    }, {       "challengeName": "CUSTOM_CHALLENGE",       "challengeResult": true,       "challengeMetadata": null    } ],    userNotFound: false  },  response: { challengeName: null, issueTokens: null, failAuthentication: null }}
const sessionLength3Fail = {version: '1',  region: 'eu-west-0',  userPoolId: 'eu-west-0-SOMETHING',  userName: 'noMfa',  callerContext: {    awsSdkVersion: 'aws-sdk-unknown-unknown',    clientId: 'testClientID'  },  triggerSource: 'DefineAuthChallenge_Authentication',  request: {    userAttributes: {      sub: '12345678',      email_verified: 'true',      'cognito:user_status': 'FORCE_CHANGE_PASSWORD',    phone_number_verified: 'true',      phone_number: '+447891098765',     email: 'test@email.co.uk'    },    session: [ {       "challengeName": "SRP_A",       "challengeResult": true,       "challengeMetadata": null    }, {       "challengeName": "PASSWORD_VERIFIER",       "challengeResult": true,       "challengeMetadata": null    }, {       "challengeName": "CUSTOM_CHALLENGE",       "challengeResult": false,       "challengeMetadata": null    } ],    userNotFound: false  },  response: { challengeName: null, issueTokens: null, failAuthentication: null }}
jest.mock('../aws/getUserDetails')

test('sets challenge name to PASSWORD_VERIFIER based on session length == 1', async () => {
    let response = await handler(sessionLength1, context)
    expect(response.response.challengeName).toBe("PASSWORD_VERIFIER");
    expect(response.response.issueTokens).toBe(false);
    expect(response.response.failAuthentication).toBe(false);
});

test('sets challenge name to CUSTOM_CHALLENGE based on session length == 2 and no MFA settings', async () => {
    let response = await handler(sessionLength2, context)
    expect(response.response.challengeName).toBe("CUSTOM_CHALLENGE");
    expect(response.response.issueTokens).toBe(false);
    expect(response.response.failAuthentication).toBe(false);
});

test('issues token if mfa exists and password verified', async () => {
    let response = await handler(sessionLength2mfa, context)
    expect(response.response.issueTokens).toBe(true);
    expect(response.response.failAuthentication).toBe(false);
});

test('issues token if mfa not present but code and password verified', async () => {
    let response = await handler(sessionLength3, context)
    expect(response.response.issueTokens).toBe(true);
    expect(response.response.failAuthentication).toBe(false);
});

test('fails auth and doesnt issue token if challenges arent passed', async () => {
    let response1 = await handler(sessionLength3Fail, context)
    expect(response1.response.issueTokens).toBe(false);
    expect(response1.response.failAuthentication).toBe(true);
    let response2 = await handler(sessionLength2Fail, context)
    expect(response2.response.issueTokens).toBe(false);
    expect(response2.response.failAuthentication).toBe(true);
});
