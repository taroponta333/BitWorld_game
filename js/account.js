/*
==========================================
BitWorld
account.js
Version 0.1 Part 1
==========================================
*/

"use strict";

/*=========================================
画面取得
=========================================*/

const loginScreen =
document.getElementById("loginScreen");

const registerScreen =
document.getElementById("registerScreen");

const homeScreen =
document.getElementById("homeScreen");


/*=========================================
入力欄
=========================================*/

const loginUsername =
document.getElementById("loginUsername");

const loginPassword =
document.getElementById("loginPassword");

const registerUsername =
document.getElementById("registerUsername");

const registerPassword =
document.getElementById("registerPassword");


/*=========================================
ボタン
=========================================*/

const loginButton =
document.getElementById("loginButton");

const openRegisterButton =
document.getElementById("openRegisterButton");

const registerButton =
document.getElementById("registerButton");

const backLoginButton =
document.getElementById("backLoginButton");

const logoutButton =
document.getElementById("logoutButton");


/*=========================================
定数
=========================================*/

const ACCOUNT_KEY =
"BitWorldAccounts";

const LOGIN_KEY =
"BitWorldLogin";


/*=========================================
アカウント取得
=========================================*/

function getAccounts(){

    const data =
    loadJSON(ACCOUNT_KEY);

    if(data===null){

        return [];

    }

    return data;

}


/*=========================================
保存
=========================================*/

function saveAccounts(accounts){

    saveJSON(
        ACCOUNT_KEY,
        accounts
    );

}


/*=========================================
現在ログイン中
=========================================*/

function getCurrentUser(){

    return loadJSON(LOGIN_KEY);

}


function setCurrentUser(user){

    saveJSON(
        LOGIN_KEY,
        user
    );

}


/*=========================================
アカウント検索
=========================================*/

function findAccount(username){

    const accounts =
    getAccounts();

    return accounts.find(

        account=>

        account.username===username

    );

}


/*=========================================
画面切替
=========================================*/

function showLogin(){

    loginScreen.classList.remove("hidden");

    registerScreen.classList.add("hidden");

    homeScreen.classList.add("hidden");

}


function showRegister(){

    loginScreen.classList.add("hidden");

    registerScreen.classList.remove("hidden");

    homeScreen.classList.add("hidden");

}


/*=========================================
新規登録
=========================================*/

async function registerAccount(){

    const username =
    registerUsername.value.trim();

    const password =
    registerPassword.value;

    if(username===""){

        alert("ユーザー名を入力してください");

        return;

    }

    if(password.length<8){

        alert("パスワードは8文字以上です");

        return;

    }

    if(findAccount(username)){

        alert("このユーザー名は使用されています");

        return;

    }

    const passwordHash =
    await sha256(password);

    const account={

        id:createBitWorldID(),

        username:username,

        passwordHash:passwordHash,

        nickname:username,

        icon:"😀",

        coins:100,

        worlds:[],

        ownedItems:[],

        createdAt:now()

    };

    const accounts =
    getAccounts();

    accounts.push(account);

    saveAccounts(accounts);

    alert("登録完了！");

    registerUsername.value="";

    registerPassword.value="";

    showLogin();

}


/*=========================================
ログイン
=========================================*/

async function loginAccount(){

    const username =
    loginUsername.value.trim();

    const password =
    loginPassword.value;

    const account =
    findAccount(username);

    if(account===undefined){

        alert("ユーザーが存在しません");

        return;

    }

    const passwordHash =
    await sha256(password);

    if(passwordHash!==account.passwordHash){

        alert("パスワードが違います");

        return;

    }

    setCurrentUser(account);

    loginUsername.value="";

    loginPassword.value="";

    if(typeof loadProfile==="function"){

        loadProfile();

    }

}


/*=========================================
ログアウト
=========================================*/

function logout(){

    localStorage.removeItem(
        LOGIN_KEY
    );

    showLogin();

}


/*=========================================
自動ログイン
=========================================*/

function autoLogin(){

    const account =
    getCurrentUser();

    if(account===null){

        showLogin();

        return;

    }

    if(typeof loadProfile==="function"){

        loadProfile();

    }

}


/*=========================================
イベント登録
=========================================*/

loginButton.addEventListener(
"click",
loginAccount
);

registerButton.addEventListener(
"click",
registerAccount
);

openRegisterButton.addEventListener(
"click",
showRegister
);

backLoginButton.addEventListener(
"click",
showLogin
);

logoutButton.addEventListener(
"click",
logout
);


/*=========================================
起動
=========================================*/

window.addEventListener(

"load",

autoLogin

);

console.log(
"✅ account.js Part1 Loaded"
);
