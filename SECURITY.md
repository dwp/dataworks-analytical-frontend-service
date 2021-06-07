# Security Status

This file records the current state of the Snyk scan for this repository.

Last update: 7th June 2021

Project was removed from and re-added to Snyk to update manifests. Code Analysis was enabled.

| File | Issue | Snyk Severity | Commentary | Adjusted Serverity | Reviewed | Next Review | Action |
| ---- | ----- | ------------- | ---------- | ------------------ | -------- | ----------- | ------ |
| src/server/index.js | Potential XSS Vulnerability | High | This is a usr facing service, all be it internal, we should investigate | High | 3-Jun-21 | N/A | DW-6400 logged |
| src/server/index.js | Potential XSS Vulnerability | Medium | This is an internal facing endpoint, DDoS is unlikely, DoS resolvable  | Low | 3-Jun-21 | 3-Dec-21 | Supress for now to allow focus on higher priority issues. |
| src/server/index.js | Information Expsoure | Medium | The codebase is open source, information already disclosed. | Low | 3-Jun-21 | 3-Dec-21 | Supress for now to allow focus on higher priority issues. |
| bootstrap_terraform.py | Jinja2 No Default Escape | Medium | Deployment time only, no user input, PR process mitigates. | Low | 3-Jun-21 | 3-Dec-21 | Supress for now to allow focus on higher priority issues. |
| Dockerfile | NodeJS Improper Cert Validation | High | This requires resolution. | High  | 3-Jun-21 | N/A | DW-6402 logged |
| Dockerfile | NoeJS Null Pointer Dereference | Medium | Actually an OpenSSL vuln. Availability only, no impact on integrity or confidentiality. Will be fixed by the upgrade for the issue above | Low | 3-Jun-21 | N/A | Will be resolved by DW-6402 |
| package.json | React Script - SSRI - Regex DoS | High | Because this is a react dependency this is a client side bug, lower priority | Low | 03-Jun-2021 | 03-Dec-2021 | Supress for 6 months to allow focus on higher priority issues. |
| package.json | Insecure Randomness CryptoJS | High | Our version of the amplify library is using insecure random data, fix. | High | 03-Jun-2021 | 03-Dec-2021 | DW-6404 logged |
| package.json | React - WS - RegexDoS | Medium | Because this is a react dependency this is a client side bug, lower priority | Low | 03-Jun-2021 | 03-Dec-2021 | Supress for 6 months to allow focus on higher priority issues. |
| package.json | ReactDevUtils command injection | Medium | Our usage is safe according to the advisory information | Low | 03-Jun-2021 | 03-Dec-2021 | Supress for 6 months to allow focus on higher priority issues. |
| package.json | React - Glob-Parent - RegexDoS | Medium | Because this is a react dependency this is a client side bug, lower priority | Low | 03-Jun-2021 | 03-Dec-2021 | Supress for 6 months to allow focus on higher priority issues. |
| package.json | React - POSTCSS - RegexDoS | Medium | Because this is a react dependency this is a client side bug, lower priority | Low | 03-Jun-2021 | 03-Dec-2021 | Supress for 6 months to allow focus on higher priority issues. |
| package.json | React - DNS-Packet - Remote Memory Exposure | High | Although this would be hard to exploit - it provides a possible channel for data exfiltration. We should patch this. | High | 03-Jun-2021 | N/A | DW-6405 logged |
| package.json | React - Normalise-url - RegexDoS | High | Because this is a react dependency this is a client side bug, lower priority | Low | 03-Jun-2021 | 03-Dec-2021 | Supress for 6 months to allow focus on higher priority issues. |
| package.json | React - browserslist - RegexDoS | Medium | Because this is a react dependency this is a client side bug, lower priority | Low | 03-Jun-2021 | 03-Dec-2021 | Supress for 6 months to allow focus on higher priority issues. |
| package.json | React - hosted-git-info - RegexDoS | Medium | Because this is a react dependency this is a client side bug, lower priority | Low | 03-Jun-2021 | 03-Dec-2021 | Supress for 6 months to allow focus on higher priority issues. |
| package.json | React - is-svg - RegexDoS | Medium | Because this is a react dependency this is a client side bug, lower priority | Low | 03-Jun-2021 | 03-Dec-2021 | Supress for 6 months to allow focus on higher priority issues. |
| package.json | React - css-what - RegexDoS | Medium | Because this is a react dependency this is a client side bug, lower priority | Low | 03-Jun-2021 | 03-Dec-2021 | Supress for 6 months to allow focus on higher priority issues. |
| package.json | React - color-string - RegexDoS | Medium | Because this is a react dependency this is a client side bug, lower priority | Low | 03-Jun-2021 | 03-Dec-2021 | Supress for 6 months to allow focus on higher priority issues. |
| package.json | React - path-parse - RegexDoS | Medium | Because this is a react dependency this is a client side bug, lower priority | Low | 03-Jun-2021 | 03-Dec-2021 | Supress for 6 months to allow focus on higher priority issues. |

In general, items that have been adjusted to LOW are likely to be ignored.

N.B. Due to limitations in Snyk, some vulnerabilties cannot be ignored through the snyk file, so the console has been used to ignore all of these items. Due to console limitations on ignore time, they are all ignored permanently in Snyk. They are still tracked here, and manual review will be required at the date shown.

N.B. We only consider medium and high vulnerabilties, lows are left for now except in exceptional circumstances.
