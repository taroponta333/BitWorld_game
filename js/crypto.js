/*
==========================================
BitWorld
crypto.js
Version 0.1
==========================================
*/

"use strict";

/*
==========================================
SHA-256
==========================================
*/

async function sha256(text){

    const encoder = new TextEncoder();

    const data = encoder.encode(text);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    return hashArray
        .map(byte =>
            byte.toString(16).padStart(2,"0")
        )
        .join("");

}


/*
==========================================
ランダム数字
==========================================
*/

function randomNumber(min,max){

    return Math.floor(
        Math.random()*(max-min+1)
    )+min;

}


/*
==========================================
ランダム文字列
==========================================
*/

function randomString(length=16){

    const chars=

    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
    "abcdefghijklmnopqrstuvwxyz"+
    "0123456789";

    let result="";

    for(let i=0;i<length;i++){

        result+=
        chars.charAt(
            Math.floor(
                Math.random()*chars.length
            )
        );

    }

    return result;

}


/*
==========================================
BitWorld ID
例
BW-5F7A9D82
==========================================
*/

function createBitWorldID(){

    return "BW-"+

    randomString(8).toUpperCase();

}


/*
==========================================
World ID
==========================================
*/

function createWorldID(){

    return "WORLD-"+

    Date.now()

    +"-"+

    randomString(6);

}


/*
==========================================
Crystal Transaction ID
==========================================
*/

function createTransactionID(){

    return "CC-"+

    Date.now()

    +"-"+

    randomString(5);

}


/*
==========================================
UUID
==========================================
*/

function uuid(){

    return crypto.randomUUID();

}


/*
==========================================
簡易Base64
(バックアップ用)
==========================================
*/

function encodeBase64(text){

    return btoa(

        unescape(

            encodeURIComponent(text)

        )

    );

}


function decodeBase64(text){

    return decodeURIComponent(

        escape(

            atob(text)

        )

    );

}


/*
==========================================
JSON保存
==========================================
*/

function saveJSON(key,data){

    localStorage.setItem(

        key,

        JSON.stringify(data)

    );

}


function loadJSON(key){

    const data=

    localStorage.getItem(key);

    if(data==null){

        return null;

    }

    try{

        return JSON.parse(data);

    }

    catch{

        return null;

    }

}


/*
==========================================
時刻
==========================================
*/

function now(){

    return new Date().toISOString();

}


/*
==========================================
シード生成
==========================================
*/

function createSeed(){

    return randomNumber(

        100000000,

        999999999

    );

}


/*
==========================================
パスワードチェック
==========================================
*/

function passwordStrength(password){

    let score=0;

    if(password.length>=8) score++;

    if(/[A-Z]/.test(password)) score++;

    if(/[a-z]/.test(password)) score++;

    if(/[0-9]/.test(password)) score++;

    if(/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    return score;

}


/*
==========================================
将来用AES暗号化
（現在未使用）
==========================================
*/

async function encryptData(){

    console.warn(

        "encryptData(): v0.1では未実装"

    );

}


async function decryptData(){

    console.warn(

        "decryptData(): v0.1では未実装"

    );

}


/*
==========================================
BitWorld Crypto Ready
==========================================
*/

console.log(

    "✅ crypto.js loaded"

);
