import React from "react";
import {AmplifyButton} from '@aws-amplify/ui-react';

const Header = ({user, disconnect}) => (<header role="banner" id="global-header" className="with-proposition">
    <div className="header-wrapper">
        <div className="header-global">
            <div className="header-logo">
                <a href="https://www.gov.uk/" title="Go to the GOV.UK homepage" id="logo"
                   className="content">
                    <img src="/images/gov.uk_logotype_crown_invert_trans.png" width="36" height="32"
                         alt=""/> GOV.UK
                </a>
            </div>
        </div>
        <div className="header-proposition">
            <div className="content">
                <a href="#" className="js-header-toggle menu">Menu</a>
                <nav id="proposition-menu" style={{display: "inline-flex"}}>
                    <a href='/' id="proposition-name">DataWorks Analytical Environment</a>
                    {user ? <AmplifyButton handleButtonClick={disconnect} style={{marginLeft: "50px"}}>Sign
                        out</AmplifyButton> : null}
                </nav>
            </div>
        </div>
    </div>
</header>)

export default Header;
