
const line = "";
const test = "";
const SERVERURL = process.env.NODE_ENV === "development" ? test : line;

const Global = {
    isLogin: false,
}

export {
    SERVERURL,
    Global
}