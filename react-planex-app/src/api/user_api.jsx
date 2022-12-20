import { config } from '@fortawesome/fontawesome-svg-core';
import React, { useEffect, useState } from 'react'
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import AxiosClient from '../utilities/AxiosClient';

// ********************* user crud *****************************************************

function convertUserGet(userInfo)
{
    return {
        login: userInfo.login,
        password: userInfo.password,
        username: userInfo.username,
        email: userInfo.email,
        notifications: userInfo.team_working,
    }
}

function convertUserPost(userInfo)
{
    return {
        login: userInfo.login,
        password: userInfo.password,
        username: userInfo.username,
        email: userInfo.email,
        notifications: userInfo.notifications,
    }
}

function convertUserEdit(userInfo)
{
    let res = {};
    if (userInfo['updated_login']) {
        res['login'] = userInfo['updated_login'];
    }

    if (userInfo['updated_email']) {
        res['email'] = userInfo['updated_email'];
    }
    if (userInfo['updated_name']) {
        res['username'] = userInfo['updated_name'];
    }
    if (userInfo['updated_password']) {
        res['new_password'] = userInfo['updated_password'];
    }
    if (userInfo['password']) {
        res['password'] = userInfo['password'];
    }
    if ('notifications' in userInfo) {
        res['notifications'] = userInfo['notifications'];
    }
    return res;
}


export function apiAddUser(userInfo) {

    userInfo=convertUserPost(userInfo);
    console.log("user info", userInfo);


    AxiosClient.post('/user/register', userInfo
    ).then((response) => {
        console.log(response);
        return 1;
    }).catch((error) => {
        console.log(error);
        return 0;
    });
}


export async function apiDeleteUser() {

    await AxiosClient.delete('/user'
    ).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });

}


export async function apiGetUser() {

    let userInfo = {};
    let response = await AxiosClient.get('/user');

    if (response.status === 200) {
        userInfo = convertUserGet(response.data);
    } else {
        console.log(response);
    }
    return userInfo;
}


export async function apiEditUser(userInfo) {

    userInfo=convertUserEdit(userInfo);
    console.log("user info", userInfo);

    await AxiosClient.put('/user', userInfo
    ).then((response) => {
        console.log(response);
        return 1;
    }).catch((error) => {
        console.log(error);
        return 0;
    });
}
