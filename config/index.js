
const line = "http://114.116.247.159:8038/aikg";
const test = "http://24.59.13.170:8038/aikg";
const SERVERURL = process.env.NODE_ENV === "development" ? test : line;

const Global = {
    isLogin: false,
}

export {
    SERVERURL,
    Global
}