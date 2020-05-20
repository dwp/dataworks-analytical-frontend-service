const getUserDetails = require('./aws/getUserDetails').getUserDetails;

exports.handler = async (event, context) => {
    let userDetails = await getUserDetails(event.userPoolId, event.userName)
    let existingMFA = (userDetails.PreferredMfaSetting == "SOFTWARE_TOKEN_MFA")
    
    if (event.request.session.length == 1 && event.request.session[0].challengeName == 'SRP_A') {
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'PASSWORD_VERIFIER';
    } else if (!existingMFA && event.request.session.length == 2 && event.request.session[1].challengeName == 'PASSWORD_VERIFIER' && event.request.session[1].challengeResult == true) {
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'CUSTOM_CHALLENGE';
    } else if ((existingMFA && event.request.session[1].challengeName == 'PASSWORD_VERIFIER' && event.request.session[1].challengeResult == true) || (event.request.session.length == 3 && event.request.session[2].challengeName == 'CUSTOM_CHALLENGE' && event.request.session[2].challengeResult == true)) {
        event.response.issueTokens = true;
        event.response.failAuthentication = false;
    } else {
        event.response.issueTokens = false;
        event.response.failAuthentication = true;
    }

    return await event;
}
