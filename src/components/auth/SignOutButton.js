import {AmplifyButton, AmplifyLoadingSpinner} from "@aws-amplify/ui-react";
import React, {useState} from "react";

const SignOutButton = ({handleSignOut, style}) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleButtonClick = async () => {
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
        <AmplifyButton handleButtonClick={handleButtonClick} style={style} disabled={isLoading} className="signOut">
            <AmplifyLoadingSpinner style={{display: isLoading ? 'initial' : 'none'}}/>
            <span style={{display: isLoading ? 'none' : 'initial'}}>Sign out</span>
        </AmplifyButton>);
}

export default SignOutButton;
