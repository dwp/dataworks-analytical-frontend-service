const AWS = require("aws-sdk");
const crypto = require("crypto-secure-random-digit");
const sendSMS = require('./aws/sendSMS.js').sendSMS

module.exports.handler = async (event = {}, context) => {
    var mobileNumber = ()=> {
        console.log("Phone Number = ", event.request.userAttributes.phone_number)
        if(event.request.userAttributes.phone_number == null||event.request.userAttributes.phone_number == undefined){
            throw new Error("No phone number provided")
        }
        else return event.request.userAttributes.phone_number;
    }
    oneTimeAuthCode = crypto.randomDigits(6).join('');
    await sendSMS(mobileNumber(), oneTimeAuthCode, event.userName)
    event.response.privateChallengeParameters = { "otp" : oneTimeAuthCode };
    
//    await sendTestEmail(oneTimeAuthCode, event.userName, context)
    console.log(JSON.stringify(event))
    return event
}



//async function sendTestEmail(otp, userName, context){
//    var params = {
//      Message: userName + ", your one-time MFA code is: " + otp,
//      TopicArn: 'arn:aws:sns:***REGION***:***ACC.NO.***:lambda_auth_test'
//    };
//
//    await sns.publish(params).promise();
//}
