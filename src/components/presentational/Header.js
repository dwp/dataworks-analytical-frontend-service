import React from "react";
import SignOutButton from "../auth/SignOutButton";

const Header = ({user, handleSignOut}) => {
    return (<header role="banner" id="global-header" className="with-proposition">
        <div className="header-wrapper">
            <div className="header-global">
                <div className="header-logo">
                    <a href="https://www.gov.uk/" title="Go to the GOV.UK homepage" id="logo"
                       className="content">
                        <img src="/images/gov.uk_logotype_crown_invert_trans.png" width="36" height="32"
                             alt=""/> GOV.UK
                    </a>
                </div>
            
                <div className="header-proposition">
                    <div className="content">
                        <nav id="proposition-menu">
                            <a href="/" id="proposition-name">DataWorks Analytical Environment</a>
                        </nav>
                    </div>
                </div>
                <div className="navBtns">
                    <a id="faqNav" className="button" href="./faq">FAQ</a>
                    {user ? <SignOutButton handleSignOut={handleSignOut} /> : null}
                </div>
            </div>
        </div>
    </header>)
}

export default Header;
