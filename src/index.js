import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.hydrate(
  <React.StrictMode>
    <header role="banner" id="global-header" className="with-proposition">
        <div className="header-wrapper">
            <div className="header-global">
                <div className="header-logo">
                    <a href="https://www.gov.uk/" title="Go to the GOV.UK homepage" id="logo" className="content">
                        <img src="/images/gov.uk_logotype_crown_invert_trans.png" width="36" height="32" alt=""/> GOV.UK
                    </a>
                </div>
            </div>
            <div className="header-proposition">
                <div className="content">
                    <a href="#" className="js-header-toggle menu">Menu</a>
                    <nav id="proposition-menu">
                        <a  href='/' id="proposition-name">Dataworks Analytical Environment</a>
                    </nav>
                </div>
            </div>
        </div>
    </header>
    <div id="global-header-bar"></div>
    <main id="content" role="main" className="">
        <div className="article-container group">
            <div className="content-block">
                <div id="desktop" className="inner">
                  <App />
                </div>
            </div>
        </div>
    </main>
    <footer className="group js-footer" id="footer" role="contentinfo">
        <div className="footer-wrapper">
            <div className="footer-meta">
                <div className="footer-meta-inner">
                    <div className="open-government-licence">
                        <p className="logo"><a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence</a></p>
                        <p>All content is available under the <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</a>, except where otherwise stated</p>
                    </div>
                </div>
                <div className="copyright">
                    <a href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/copyright-and-re-use/crown-copyright/">© Crown copyright</a>
                </div>
            </div>
        </div>
    </footer>
  </React.StrictMode>,
  document.getElementById('root')
);
