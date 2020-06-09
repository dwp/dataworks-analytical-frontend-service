import {AmplifyButton, AmplifyLoadingSpinner} from "@aws-amplify/ui-react";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../utils/Auth";

const SignOutButton = ({handleSignOut, style}) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleButtonClick = async () => {
        console.log('click')
        setIsLoading(true);
        try{
            await handleSignOut();
        } catch(e){
            console.error(`Error signing out: ${JSON.stringify(e)}`);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <AmplifyButton handleButtonClick={handleButtonClick} style={style} disabled={isLoading}>
            <AmplifyLoadingSpinner style={{display: isLoading ? 'initial' : 'none'}}/>
            <span style={{display: isLoading ? 'none' : 'initial'}}>Sign out</span>
        </AmplifyButton>);
}

export default SignOutButton;
