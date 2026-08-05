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

/*
==========================================
BitWorld
account.js
Part2 前半
プロフィール管理
==========================================
*/

"use strict";

/*=========================================
プロフィール画面
=========================================*/

const playerIcon =
document.getElementById("playerIcon");

const playerNickname =
document.getElementById("playerNickname");

const playerID =
document.getElementById("playerID");

const coinText =
document.getElementById("coinText");


/*=========================================
設定画面
=========================================*/

const nicknameInput =
document.getElementById("nicknameInput");

const iconFile =
document.getElementById("iconFile");


/*=========================================
現在のアカウント取得
=========================================*/

function currentAccount(){

    return getCurrentUser();

}


/*=========================================
アカウント更新
=========================================*/

function updateAccount(account){

    const accounts =
    getAccounts();

    const index =
    accounts.findIndex(

        a => a.id === account.id

    );

    if(index===-1){

        return;

    }

    accounts[index]=account;

    saveAccounts(accounts);

    setCurrentUser(account);

}


/*=========================================
プロフィール表示
=========================================*/

function loadProfile(){

    const account =
    currentAccount();

    if(account==null){

        showLogin();

        return;

    }

    loginScreen.classList.add("hidden");

    registerScreen.classList.add("hidden");

    homeScreen.classList.remove("hidden");


    playerNickname.textContent =
    account.nickname;

    playerID.textContent =
    account.id;

    coinText.textContent =
    account.coins;


    updatePlayerIcon(account);

}


/*=========================================
アイコン更新
=========================================*/

function updatePlayerIcon(account){

    if(account.iconType==="custom"){

        playerIcon.innerHTML="";

        const img =
        document.createElement("img");

        img.src =
        account.icon;

        img.width=96;
        img.height=96;

        img.style.borderRadius="50%";

        img.style.objectFit="cover";

        playerIcon.appendChild(img);

        return;

    }

    playerIcon.textContent =
    account.icon;

}


/*=========================================
ニックネーム変更
=========================================*/

function changeNickname(){

    const account =
    currentAccount();

    const name =
    nicknameInput.value.trim();

    if(name===""){

        alert("入力してください");

        return;

    }

    if(name.length>20){

        alert("20文字以内です");

        return;

    }

    account.nickname=name;

    updateAccount(account);

    loadProfile();

    alert("変更しました");

}


/*=========================================
デフォルトアイコン変更
=========================================*/

function changeIcon(icon){

    const account =
    currentAccount();

    account.iconType="default";

    account.icon=icon;

    updateAccount(account);

    loadProfile();

}


/*=========================================
カスタムアイコン
=========================================*/

function uploadCustomIcon(){

    const file =
    iconFile.files[0];

    if(!file){

        return;

    }

    if(file.size>

    1024*1024*2){

        alert(

        "2MB以下の画像のみ"

        );

        return;

    }

    const reader =
    new FileReader();

    reader.onload=function(){

        const account =
        currentAccount();

        account.iconType="custom";

        account.icon=
        reader.result;

        updateAccount(account);

        loadProfile();

        alert(

        "アイコン変更完了"

        );

    };

    reader.readAsDataURL(file);

}

console.log(
"✅ account.js Part2 前半 Loaded"
);

/*
==========================================
BitWorld
account.js
Part2 後半
==========================================
*/

"use strict";

/*=========================================
コイン
=========================================*/

function addCoins(amount){

    const account =
    currentAccount();

    account.coins += amount;

    if(account.coins < 0){

        account.coins = 0;

    }

    updateAccount(account);

    loadProfile();

}


function removeCoins(amount){

    const account =
    currentAccount();

    if(account.coins < amount){

        return false;

    }

    account.coins -= amount;

    updateAccount(account);

    loadProfile();

    return true;

}


/*=========================================
アイテム
=========================================*/

function addItem(itemID){

    const account =
    currentAccount();

    if(!account.ownedItems){

        account.ownedItems=[];

    }

    if(account.ownedItems.includes(itemID)){

        return;

    }

    account.ownedItems.push(itemID);

    updateAccount(account);

}


function removeItem(itemID){

    const account =
    currentAccount();

    account.ownedItems=

    account.ownedItems.filter(

        item=>item!==itemID

    );

    updateAccount(account);

}


function hasItem(itemID){

    const account =
    currentAccount();

    return account.ownedItems.includes(itemID);

}


/*=========================================
ワールド
=========================================*/

function addWorld(world){

    const account =
    currentAccount();

    if(!account.worlds){

        account.worlds=[];

    }

    account.worlds.push(world);

    updateAccount(account);

}


function deleteWorld(worldID){

    const account =
    currentAccount();

    account.worlds=

    account.worlds.filter(

        world=>world.id!==worldID

    );

    updateAccount(account);

}


/*=========================================
統計
=========================================*/

function initializeStats(account){

    if(account.stats){

        return;

    }

    account.stats={

        playTime:0,

        loginCount:0,

        worldsCreated:0,

        blocksPlaced:0,

        circuitsCreated:0,

        itemsCrafted:0,

        coinsEarned:0,

        coinsSpent:0

    };

}


function getStats(){

    const account =
    currentAccount();

    initializeStats(account);

    return account.stats;

}


function addPlayTime(seconds){

    const account =
    currentAccount();

    initializeStats(account);

    account.stats.playTime += seconds;

    updateAccount(account);

}


/*=========================================
実績
=========================================*/

function initializeAchievements(account){

    if(account.achievements){

        return;

    }

    account.achievements=[];

}


function unlockAchievement(id){

    const account =
    currentAccount();

    initializeAchievements(account);

    if(

        account.achievements.includes(id)

    ){

        return;

    }

    account.achievements.push(id);

    updateAccount(account);

    console.log(

        "Achievement:",

        id

    );

}


function hasAchievement(id){

    const account =
    currentAccount();

    initializeAchievements(account);

    return account.achievements.includes(id);

}


/*=========================================
プロフィール更新
=========================================*/

function refreshAccount(){

    const account =
    currentAccount();

    updateAccount(account);

    loadProfile();

}


/*=========================================
アカウント削除
=========================================*/

function deleteAccount(){

    if(

        !confirm(

        "本当に削除しますか？"

        )

    ){

        return;

    }

    const account =
    currentAccount();

    let accounts =
    getAccounts();

    accounts=

    accounts.filter(

        a=>a.id!==account.id

    );

    saveAccounts(accounts);

    localStorage.removeItem(

        LOGIN_KEY

    );

    alert(

        "アカウントを削除しました"

    );

    showLogin();

}


/*=========================================
ログ
=========================================*/

console.log(

"✅ account.js Part2 後半 Loaded"

);
