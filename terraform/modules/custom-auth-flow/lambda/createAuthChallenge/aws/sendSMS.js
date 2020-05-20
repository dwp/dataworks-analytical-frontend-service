const AWS = require("aws-sdk");
const sns = new AWS.SNS({region: 'eu-west-1'});

module.exports.sendSMS = async (mobileNumber, otp, userName) => {
    const params = {"Message" : userName + ", your one-time MFA code is: " + otp, "PhoneNumber": mobileNumber};
    await sns.publish(params).promise();
}
