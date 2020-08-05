import getRuntimeConfig from "../server/runtimeConfig";

let appConfig;

function initConfig() {
    if (!appConfig) {
        if (typeof window !== "undefined" && !process.title.endsWith("node")) {
            appConfig = window.__CONFIG__;
        } else {
            appConfig = getRuntimeConfig();
        }

    }
}

export function getConfig(key) {
    initConfig();
    if (appConfig.hasOwnProperty(key)) return appConfig[key];

    throw new Error(`No value found for config key ${key}`)
};

export function getConfigOrDefault(key, defaultValue) {
    initConfig();

    if (appConfig.hasOwnProperty(key)) return appConfig[key];
    return defaultValue;
}

export function isBrowserEnv() {
    return typeof window !== "undefined" && !process.title.endsWith("node")
}

export function isMicrosoftBrowser() {
    return !!(document.documentMode || /Edge/.test(navigator.userAgent));
}
