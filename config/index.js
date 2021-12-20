const sun = "http://114.116.247.159:8028/aikg";
const chen = "http://172.22.190.120:8038/aikg";
const xing = "http://172.22.189.102:8081";
const line = "http://114.116.247.159:8038/aikg";
const test = "http://24.59.13.170:8038/aikg";
const SERVERURL = process.env.NODE_ENV === "development" ? chen : line;

const Global = {
    isLogin: false,
}

export {
    SERVERURL,
    Global
}