

import { request } from "../utils";

export async function login(data) {
    return await request({
        url: "/login",
        method: "post",
        data,
    });
}