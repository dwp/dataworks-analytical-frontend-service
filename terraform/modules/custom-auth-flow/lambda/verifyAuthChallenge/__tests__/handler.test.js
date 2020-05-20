const handler = require('../handler.js').handler;

test('verifies answer if equal', async () => {
    let event = {request: {challengeAnswer: "123456", privateChallengeParameters: {otp: "123456"}}, response:{answerCorrect: false}}
    let context = {};
    let response1 = await handler(event, context)
    expect(response1.response.answerCorrect).toBe(true);
});

test('rejects answer if not equal', async () => {
    let event = {request: {challengeAnswer: "123456", privateChallengeParameters: {otp: "345678"}}, response:{answerCorrect: false}}
    let context = {};
    let response1 = await handler(event, context)
    expect(response1.response.answerCorrect).toBe(false);
});
