let shopData=[];

const login =
document.getElementById("login");

const register =
document.getElementById("register");

const home =
document.getElementById("home");

const shop =
document.getElementById("shop");

const worldCreate =
document.getElementById("worldCreate");

const items =
document.getElementById("items");

const shopCoins =
document.getElementById("shopCoins");

const nicknameInput =
document.getElementById("nicknameInput");

const nickname =
document.getElementById("nickname");

const icon =
document.getElementById("icon");

const userid =
document.getElementById("userid");

const coins =
document.getElementById("coins");

function accounts(){

return JSON.parse(
localStorage.getItem(
"BitWorldAccounts"
)
)||[];

}


function save(data){

localStorage.setItem(
"BitWorldAccounts",
JSON.stringify(data)
);

}



async function hash(text){

let data=
new TextEncoder()
.encode(text);


let hash=
await crypto.subtle.digest(
"SHA-256",
data
);


return Array.from(
new Uint8Array(hash)
)
.map(
b=>b.toString(16).padStart(2,"0")
)
.join("");

}




function id(){

return "BW-"+
Math.floor(
Math.random()*900000+100000
);

}




async function register(){

let u=
newUser.value;

let p=
newPass.value;


let list=accounts();


if(list.find(
a=>a.username==u
)){

alert("使用済み");

return;

}


list.push({

id:id(),

username:u,

passwordHash:
await hash(p),

nickname:u,

icon:"😀",

coins:100,

ownedItems:[]

});


save(list);


alert("登録完了");

backLogin();

}





async function login(){

let u=
loginUser.value;

let p=
await hash(
loginPass.value
);


let user=
accounts()
.find(
a=>
a.username==u
&&
a.passwordHash==p
);



if(!user){

alert("ログイン失敗");

return;

}


localStorage.setItem(
"BitWorldUser",
JSON.stringify(user)
);


showHome(user);

}




function showHome(user){

login.classList.add("hidden");

home.classList.remove("hidden");


icon.textContent=user.icon;

nickname.textContent=user.nickname;

userid.textContent=user.id;

coins.textContent=user.coins;


}




function changeIcon(i){

let user=current();

user.icon=i;

update(user);

showHome(user);

}




function changeNickname(){

let user=current();

user.nickname=
nicknameInput.value;


update(user);

showHome(user);

}




function current(){

return JSON.parse(
localStorage.getItem(
"BitWorldUser"
)
);

}



function update(user){

let list=accounts();

let index=
list.findIndex(
a=>a.id==user.id
);


list[index]=user;

save(list);


localStorage.setItem(
"BitWorldUser",
JSON.stringify(user)
);

}




function openRegister(){

login.classList.add("hidden");

register.classList.remove("hidden");

}


function backLogin(){

register.classList.add("hidden");

login.classList.remove("hidden");

}



function logout(){

localStorage.removeItem(
"BitWorldUser"
);

home.classList.add("hidden");

login.classList.remove("hidden");

}




async function openShop(){

home.classList.add("hidden");

shop.classList.remove("hidden");


let res=
await fetch("shop.json");

shopData=
await res.json();


showShop();

}




function showShop(){

let user=current();

shopCoins.textContent=user.coins;


items.innerHTML="";


shopData.forEach(item=>{


let own=
user.ownedItems.includes(
item.id
);


items.innerHTML+=`

<div class="profile">

<h3>${item.name}</h3>

<p>💎${item.price}</p>

<button onclick="buy('${item.id}')">

${own?"購入済":"購入"}

</button>

</div>

`;

});


}




function buy(id){


let item=
shopData.find(
a=>a.id==id
);


let user=current();


if(
user.ownedItems.includes(id)
){

return;

}


if(user.coins<item.price){

alert("コイン不足");

return;

}


user.coins-=item.price;

user.ownedItems.push(id);


update(user);


showShop();

}




function closeShop(){

shop.classList.add("hidden");

home.classList.remove("hidden");

showHome(current());

}
