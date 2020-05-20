const AWS = require("aws-sdk");
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

module.exports.getUserDetails = async function (userPoolId,userName){
var userParams = {
    UserPoolId: userPoolId, 
    Username: userName 
  };
  return await cognitoidentityserviceprovider.adminGetUser(userParams).promise()
}