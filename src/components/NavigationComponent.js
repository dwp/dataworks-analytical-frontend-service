import React, {useState} from "react";
import ConnectPage from "./pages/ConnectPage";
import MainPage from "./pages/MainPage";
import SetupMFAPage from "./pages/SetupMFAPage";
import DesktopPage from "./pages/DesktopPage";
import UserNotSetUpPage from "./pages/UserNotSetUpPage"

export const Pages = Object.freeze({
    SETUP_MFA: SetupMFAPage,
    CONNECT: ConnectPage,
    MAIN: MainPage,
    DESKTOP: DesktopPage,
    USER_NOT_SET_UP: UserNotSetUpPage,
});

const NavigationComponent = ({style}) => {
    const [pageState, setPageState] = useState({page: Pages.MAIN, props: {}});

    const nav = {
        go: (page, props) => setPageState({page, props})
    }
    return <pageState.page {...pageState.props} nav={nav}/>

}

export default NavigationComponent;
