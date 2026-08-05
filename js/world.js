/*
==========================================
BitWorld
world.js
Version 0.1 Part1
ワールド生成
==========================================
*/

"use strict";

/*=========================================
定数
=========================================*/

const WORLD_KEY = "BitWorldWorlds";

const DEFAULT_WIDTH = 64;
const DEFAULT_HEIGHT = 64;


/*=========================================
ワールド取得
=========================================*/

function getWorlds(){

    const worlds = loadJSON(WORLD_KEY);

    if(worlds == null){

        return [];

    }

    return worlds;

}


/*=========================================
保存
=========================================*/

function saveWorlds(worlds){

    saveJSON(
        WORLD_KEY,
        worlds
    );

}


/*=========================================
乱数
=========================================*/

function createRandom(seed){

    let value = seed;

    return function(){

        value = (value * 1664525 + 1013904223) % 4294967296;

        return value / 4294967296;

    }

}


/*=========================================
ブロック
=========================================*/

function createBlock(
    x,
    y,
    z,
    id
){

    return{

        x:x,
        y:y,
        z:z,

        id:id

    };

}


/*=========================================
ワールド生成
=========================================*/

function generateWorld(options){

    const seed =

    Number(options.seed);

    const random =

    createRandom(seed);

    const world={

        id:createWorldID(),

        name:options.name,

        seed:seed,

        width:DEFAULT_WIDTH,

        height:DEFAULT_HEIGHT,

        createdAt:now(),

        blocks:[],

        player:{

            x:32,
            y:32,
            z:1

        }

    };


    /*
    地面
    */

    for(

        let y=0;

        y<world.height;

        y++

    ){

        for(

            let x=0;

            x<world.width;

            x++

        ){

            world.blocks.push(

                createBlock(

                    x,
                    y,
                    0,
                    "grass"

                )

            );

        }

    }


    /*
    木
    */

    for(

        let i=0;

        i<120;

        i++

    ){

        const x=

        Math.floor(

            random()*world.width

        );

        const y=

        Math.floor(

            random()*world.height

        );

        world.blocks.push(

            createBlock(

                x,
                y,
                1,
                "tree"

            )

        );

    }


    /*
    石
    */

    for(

        let i=0;

        i<200;

        i++

    ){

        const x=

        Math.floor(

            random()*world.width

        );

        const y=

        Math.floor(

            random()*world.height

        );

        world.blocks.push(

            createBlock(

                x,
                y,
                1,
                "stone"

            )

        );

    }


    /*
    水
    */

    for(

        let i=0;

        i<300;

        i++

    ){

        const x=

        Math.floor(

            random()*world.width

        );

        const y=

        Math.floor(

            random()*world.height

        );

        world.blocks.push(

            createBlock(

                x,
                y,
                0,
                "water"

            )

        );

    }

    return world;

}


/*=========================================
新規ワールド
=========================================*/

function createNewWorld(){

    const worldName=

    document
    .getElementById(
        "worldName"
    )
    .value
    .trim();

    let seed=

    document
    .getElementById(
        "worldSeed"
    )
    .value
    .trim();


    if(worldName==""){

        alert("名前を入力");

        return;

    }


    if(seed==""){

        seed=createSeed();

    }


    const world=

    generateWorld({

        name:worldName,

        seed:seed

    });


    addWorld(world);

    renderWorldList();

    alert("ワールド作成！");

}


/*=========================================
一覧
=========================================*/

function renderWorldList(){

    const list=

    document
    .getElementById(
        "worldList"
    );

    list.innerHTML="";


    const account=

    currentAccount();


    if(!account.worlds){

        return;

    }


    account.worlds.forEach(

        world=>{

            const card=

            document.createElement(
                "div"
            );

            card.className=

            "worldCard";


            card.innerHTML=

            `
            <h3>${world.name}</h3>

            <p>Seed : ${world.seed}</p>

            <button onclick="openWorld('${world.id}')">

            プレイ

            </button>

            <button onclick="deleteWorld('${world.id}')">

            削除

            </button>

            `;

            list.appendChild(card);

        }

    );

}


/*=========================================
開く
=========================================*/

function openWorld(id){

    // 現在プレイするワールドIDを保存
    localStorage.setItem(
        "BitWorldCurrentWorld",
        id
    );

    // game.htmlへ移動
    window.location.href = "game.html";

}


/*=========================================
起動
=========================================*/

console.log(

"✅ world.js Part1"

);
