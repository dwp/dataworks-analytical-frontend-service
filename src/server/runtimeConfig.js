export default function getRuntimeConfig() {
    const config = {};
    Object.keys(process.env).forEach((key) => {
        if (key.toString().startsWith("REACT_APP")) config[key] = process.env[key];
    });

    return Object.freeze(config);
}