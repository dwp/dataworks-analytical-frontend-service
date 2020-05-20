const AWS = require("aws-sdk");
const crypto = require("crypto-secure-random-digit");
const sendSMS = require('./aws/sendSMS.js').sendSMS

module.exports.handler = async (event = {}, context) => {
    var mobileNumber = ()=> {
        if(event.request.userAttributes.phone_number == null||event.request.userAttributes.phone_number == undefined){
            throw new Error("No phone number provided")
        }
        else return event.request.userAttributes.phone_number;
    }
    oneTimeAuthCode = crypto.randomDigits(6).join('');
    await sendSMS(mobileNumber(), oneTimeAuthCode, event.userName)
    event.response.privateChallengeParameters = { "otp" : oneTimeAuthCode };
    
    return event
}
