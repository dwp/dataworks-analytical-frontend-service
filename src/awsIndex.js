const fs = require("fs");
const AWS = require("aws-sdk");

const cognitoISP = new AWS.CognitoIdentityServiceProvider({ region: 'eu-west-2' });

const params = {
    UserPoolId: 'your-user-pool-id',
  };
  
  cognitoISP.setUICustomization(params, (err, data) => {
    if (err) console.log(err, err.stack); // error 
    else console.log(`Successfully updated, new css version:  ${data.UICustomization.CSSVersion}`); // successful response
  });