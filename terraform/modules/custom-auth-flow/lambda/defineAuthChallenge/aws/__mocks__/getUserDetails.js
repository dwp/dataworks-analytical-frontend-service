module.exports.getUserDetails = async function (userPoolId,userName){
    if(userName == "noMfa"){
        return {PreferredMfaSetting: null}
    }
    return {PreferredMfaSetting: "SOFTWARE_TOKEN_MFA"}
}
