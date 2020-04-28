import getRuntimeConfig from "../server/runtimeConfig";

let appConfig;

if (!appConfig) {
    if (typeof window !== "undefined") {
        appConfig = window.__CONFIG__;
        delete window.__CONFIG__;
    } else {
        appConfig = getRuntimeConfig();
    }
}

export default appConfig;
