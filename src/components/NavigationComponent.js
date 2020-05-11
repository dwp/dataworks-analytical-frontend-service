import React, {useState} from "react";
import ConnectPage from "./pages/ConnectPage";
import MainPage from "./pages/MainPage";
import SetupMFAPage from "./pages/SetupMFAPage";
import DesktopPage from "./pages/DesktopPage";

export const Pages = Object.freeze({
    SETUP_MFA: SetupMFAPage,
    CONNECT: ConnectPage,
    MAIN: MainPage,
    DESKTOP: DesktopPage,
});

const NavigationComponent = ({style}) => {
    const [pageState, setPageState] = useState({page: Pages.MAIN, props: {}});

    const nav = {
        go: (page, props) => setPageState({page, props})
    }
    return <div style={style}><pageState.page {...pageState.props} nav={nav}/></div>

}

export default NavigationComponent;
