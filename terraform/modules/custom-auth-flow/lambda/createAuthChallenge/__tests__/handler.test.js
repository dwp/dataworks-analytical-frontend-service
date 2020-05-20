const event = {version: '1',  region: 'eu-west-0',  userPoolId: 'eu-west-0-SOMETHING',  userName: 'TestUser',  callerContext: {    awsSdkVersion: 'aws-sdk-unknown-unknown',    clientId: 'testClientID'  },  triggerSource: 'DefineAuthChallenge_Authentication',  request: {    userAttributes: {      sub: '12345678',      email_verified: 'true',      'cognito:user_status': 'FORCE_CHANGE_PASSWORD',    phone_number_verified: 'true',      phone_number: '+447891098765',     email: 'test@email.co.uk'    },    session: [ {       "challengeName": "SRP_A",       "challengeResult": true,       "challengeMetadata": null    } ],    userNotFound: false  },  response: { challengeName: null, issueTokens: null, failAuthentication: null }}
const handler = require('../handler.js').handler;
jest.mock('../aws/sendSMS')


test('adds 6 digit otp to response', async () => {
    let context = {};
    let response1 = await handler(event, context)
    expect(response1.response.privateChallengeParameters.otp.length).toBe(6);
});

test('correct error thrown when no phone number found', async () => {
    const nullPhone = {version: '1',  region: 'eu-west-0',  userPoolId: 'eu-west-0-SOMETHING',  userName: 'TestUser',  callerContext: {    awsSdkVersion: 'aws-sdk-unknown-unknown',    clientId: 'testClientID'  },  triggerSource: 'DefineAuthChallenge_Authentication',  request: {    userAttributes: {      sub: '12345678',      email_verified: 'true',      'cognito:user_status': 'FORCE_CHANGE_PASSWORD',    phone_number_verified: 'true',      phone_number: null,     email: 'test@email.co.uk'    },    session: [ {       "challengeName": "SRP_A",       "challengeResult": true,       "challengeMetadata": null    } ],    userNotFound: false  },  response: { challengeName: null, issueTokens: null, failAuthentication: null }}
    const noPhone = {version: '1',  region: 'eu-west-0',  userPoolId: 'eu-west-0-SOMETHING',  userName: 'TestUser',  callerContext: {    awsSdkVersion: 'aws-sdk-unknown-unknown',    clientId: 'testClientID'  },  triggerSource: 'DefineAuthChallenge_Authentication',  request: {    userAttributes: {      sub: '12345678',      email_verified: 'true',      'cognito:user_status': 'FORCE_CHANGE_PASSWORD',    phone_number_verified: 'true',    email: 'test@email.co.uk'    },    session: [ {       "challengeName": "SRP_A",       "challengeResult": true,       "challengeMetadata": null    } ],    userNotFound: false  },  response: { challengeName: null, issueTokens: null, failAuthentication: null }}
    let context = {};
    await expect(handler(nullPhone, context)).rejects.toThrow(new Error('No phone number provided'))
    await expect(handler(noPhone, context)).rejects.toThrow(new Error('No phone number provided'))
});
