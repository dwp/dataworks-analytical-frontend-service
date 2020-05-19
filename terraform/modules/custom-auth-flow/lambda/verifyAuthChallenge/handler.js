exports.handler = async(event) => {
    const oneTimeAuthCode = event.request.privateChallengeParameters.otp;
    if(event.request.challengeAnswer === oneTimeAuthCode){
        event.response.answerCorrect = true;
    }
    else {
        event.response.answerCorrect = false;
    }
    return event
}