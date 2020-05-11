import React from "react";
import { AmplifyButton, AmplifyLabel, AmplifyCodeField } from '@aws-amplify/ui-react';
import {Auth} from "aws-amplify";


const Header = () => (<header role="banner" id="global-header" className="with-proposition">
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
                <nav id="proposition-menu">
                    <a href='/' id="proposition-name">Dataworks Analytical Environment</a>
                </nav>
            </div>
        </div>
    </div>
</header>)

export default Header;
