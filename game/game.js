/*
==========================================
BitWorld
game.js
Version 0.1
==========================================
*/

"use strict";

/*==========================================
Game Manager
==========================================*/

const Game = {

    app: null,

    world: null,

    running: false,

    paused: false,

    fps: 60,

    version: "0.1"

};


/*==========================================
初期化
==========================================*/

Game.init = async function(){

    console.log("BitWorld Initializing...");

    // PixiJS
    await Renderer.init();

    // テクスチャ
    await Texture.loadAll();

    // 入力
    Input.init();

    // UI
    UI.init();

    // サウンド
    Sound.init();

    // カメラ
    Camera.init();

    // プレイヤー
    Player.init();

    // デバッグ
    Debug.init();

    console.log("Initialization Complete");

}


/*==========================================
ゲーム開始
==========================================*/

Game.start = async function(worldData){

    this.world = worldData;

    World.load(worldData);

    Renderer.renderWorld();

    Camera.follow(Player.sprite);

    this.running = true;

}


/*==========================================
停止
==========================================*/

Game.stop=function(){

    this.running=false;

}


/*==========================================
一時停止
==========================================*/

Game.pause=function(){

    this.paused=true;

}


/*==========================================
再開
==========================================*/

Game.resume=function(){

    this.paused=false;

}


/*==========================================
更新
==========================================*/

Game.update=function(delta){

    if(!this.running){

        return;

    }

    if(this.paused){

        return;

    }

    Input.update(delta);

    Player.update(delta);

    Physics.update(delta);

    Circuit.update(delta);

    Electric.update(delta);

    Machine.update(delta);

    Drone.update(delta);

    NPC.update(delta);

    Camera.update(delta);

    Renderer.update(delta);

    UI.update(delta);

}


/*==========================================
ゲーム終了
==========================================*/

Game.exit=function(){

    Save.save();

    Sound.stopAll();

    this.running=false;

}


/*==========================================
ウィンドウサイズ
==========================================*/

window.addEventListener(

"resize",

()=>{

    Renderer.resize();

}

);


/*==========================================
ロード
==========================================*/

window.addEventListener(

"load",

async()=>{

    await Game.init();

    console.log(

        "BitWorld Ready"

    );

}

);


/*==========================================
Ticker
==========================================*/

PIXI.Ticker.shared.add(

(delta)=>{

    Game.update(delta);

}

);


/*==========================================
デバッグ
==========================================*/

window.Game=Game;

console.log(

"game.js loaded"

);
