import Qs from "querystring";
import { request } from "../utils";


export async function getSystem() {
    const url = `getSystem`;
    return await request({
        url,
        method: "get",
    });
}
