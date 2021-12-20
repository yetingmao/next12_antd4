import Qs from "querystring";
import { request } from "../utils";


export async function login(body) {
    return await request({
        url: "/login",
        method: "post",
        data: body,
    });
}
export async function getRole() {
    const url = `/system/role/list`;
    return await request({
        url,
        method: "get",
    });
}
export async function getRoleDetail(id) {
    const url = `/system/menu/roleMenuTreeselect/${id}`;
    return await request({
        url,
        method: "get",
    });
}
export async function addRole(data) {
    return await request({
        url: "/system/role/update",
        method: "post",
        data,
    });
}
//修改
export async function updateRole(data) {
    return await request({
        url: "/system/role",
        method: "put",
        data
    });
}
export async function delRole(ids) {
    const url = `/system/role/${ids}`;
    return await request({
        url,
        method: "delete",
    });
}
export async function getUser(query) {
    const url = `/system/user/list?${Qs.stringify(query)}`;
    return await request({
        url,
        method: "get",
    });
}
export async function addUser(data) {
    return await request({
        url: "/system/user",
        method: "post",
        data
    });
}
export async function updateUser(data) {
    return await request({
        url: "/system/user",
        method: "put",
        data
    });
}
export async function delUser(ids) {
    const url = `/system/user/${ids}`;
    return await request({
        url,
        method: "delete",
    });
}

