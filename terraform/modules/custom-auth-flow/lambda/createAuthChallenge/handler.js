const AWS = require("aws-sdk");
const crypto = require("crypto-secure-random-digit");

const sns = new AWS.SNS({region: 'eu-west-1'});

module.exports.handler = async (event= {}, context) => {
    var mobileNumber = event.request.userAttributes.phone_number;
    oneTimeAuthCode = crypto.randomDigits(6).join('');
    await sendSMS(mobileNumber, oneTimeAuthCode, event.userName)
    event.response.privateChallengeParameters = { "otp" : oneTimeAuthCode };
    
//    await sendTestEmail(oneTimeAuthCode, event.userName, context)
    console.log(JSON.stringify(event))
    return event
}

async function sendSMS(mobileNumber, otp, userName){
    const params = {"Message" : userName + ", your one-time MFA code is: " + otp, "PhoneNumber": mobileNumber};
    await sns.publish(params).promise();
}

//async function sendTestEmail(otp, userName, context){
//    var params = {
//      Message: userName + ", your one-time MFA code is: " + otp,
//      TopicArn: 'arn:aws:sns:***REGION***:***ACC.NO.***:lambda_auth_test'
//    };
//
//    await sns.publish(params).promise();
//}
