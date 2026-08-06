/*
=========================================
BitWorld
setting.js
Part1
基本設定
=========================================
*/

"use strict";

console.log("setting.js Part1 Loaded");

/*=========================================
デフォルト設定
=========================================*/

const DEFAULT_SETTINGS={

    nickname:"プレイヤー",

    icon:"😀",

    language:"ja",

    bgm:80,

    se:80,

    fps:60,

    renderDistance:8,

    showFPS:true

};

/*=========================================
現在のユーザー取得
=========================================*/

function getSettingUser(){

    return getCurrentUser();

}

/*=========================================
設定取得
=========================================*/

function getSettings(){

    const user=getSettingUser();

    if(!user){

        return structuredClone(DEFAULT_SETTINGS);

    }

    if(!user.settings){

        user.settings=
        structuredClone(DEFAULT_SETTINGS);

        saveCurrentUser(user);

    }

    return user.settings;

}

/*=========================================
設定保存
=========================================*/

function saveSettings(settings){

    const user=getSettingUser();

    if(!user){

        return;

    }

    user.settings=settings;

    saveCurrentUser(user);

}

/*=========================================
ホーム更新
=========================================*/

function updateHomeProfile(){

    const settings=getSettings();

    document.getElementById(
        "playerNickname"
    ).textContent=settings.nickname;

    document.getElementById(
        "playerIcon"
    ).textContent=settings.icon;

}

/*=========================================
起動
=========================================*/

window.addEventListener(

"load",

()=>{

    updateHomeProfile();

});
/*
=========================================
setting.js
Part2
プロフィール設定
=========================================
*/

console.log("setting.js Part2 Loaded");

/*=========================================
設定画面へ反映
=========================================*/

function loadProfileSettings(){

    const settings = getSettings();

    // ニックネーム
    const nicknameInput =
        document.getElementById("nicknameInput");

    if(nicknameInput){

        nicknameInput.value =
            settings.nickname;

    }

    // アイコン
    document
    .querySelectorAll(".iconButton")
    .forEach(button=>{

        button.classList.remove("selected");

        if(button.textContent === settings.icon){

            button.classList.add("selected");

        }

    });

}

/*=========================================
アイコン選択
=========================================*/

function selectIcon(icon){

    document
    .querySelectorAll(".iconButton")
    .forEach(button=>{

        if(button.textContent===icon){

            button.classList.add("selected");

        }else{

            button.classList.remove("selected");

        }

    });

}

/*=========================================
アイコンボタン初期化
=========================================*/

function initIconButtons(){

    document
    .querySelectorAll(".iconButton")
    .forEach(button=>{

        button.addEventListener("click",()=>{

            selectIcon(button.textContent);

        });

    });

}

/*=========================================
プロフィール保存
=========================================*/

function saveProfile(){

    const settings = getSettings();

    // ニックネーム
    const nickname =
        document
        .getElementById("nicknameInput")
        .value
        .trim();

    if(nickname.length>0){

        settings.nickname = nickname;

    }

    // アイコン
    const selected =
        document.querySelector(
            ".iconButton.selected"
        );

    if(selected){

        settings.icon =
            selected.textContent;

    }

    saveSettings(settings);

    updateHomeProfile();

    alert("プロフィールを保存しました！");

}

/*=========================================
プロフィール初期化
=========================================*/

function resetProfile(){

    const settings = getSettings();

    settings.nickname = "プレイヤー";

    settings.icon = "😀";

    saveSettings(settings);

    loadProfileSettings();

    updateHomeProfile();

}

/*=========================================
プロフィール更新
=========================================*/

function refreshProfile(){

    loadProfileSettings();

    updateHomeProfile();

}

console.log("setting.js Part2 Ready");
/*
=========================================
setting.js
Part3
ゲーム設定
=========================================
*/

console.log("setting.js Part3 Loaded");

/*=========================================
ゲーム設定読込
=========================================*/

function loadGameSettings(){

    const settings = getSettings();

    const bgm = document.getElementById("bgmVolume");
    const se = document.getElementById("seVolume");
    const fps = document.getElementById("fpsSelect");
    const render = document.getElementById("renderDistance");
    const showFPS = document.getElementById("showFPS");

    if(bgm) bgm.value = settings.bgm;
    if(se) se.value = settings.se;
    if(fps) fps.value = settings.fps;
    if(render) render.value = settings.renderDistance;
    if(showFPS) showFPS.checked = settings.showFPS;

}

/*=========================================
ゲーム設定保存
=========================================*/

function saveGameSettings(){

    const settings = getSettings();

    const bgm = document.getElementById("bgmVolume");
    const se = document.getElementById("seVolume");
    const fps = document.getElementById("fpsSelect");
    const render = document.getElementById("renderDistance");
    const showFPS = document.getElementById("showFPS");

    if(bgm)
        settings.bgm = Number(bgm.value);

    if(se)
        settings.se = Number(se.value);

    if(fps)
        settings.fps = Number(fps.value);

    if(render)
        settings.renderDistance =
            Number(render.value);

    if(showFPS)
        settings.showFPS =
            showFPS.checked;

    saveSettings(settings);

}

/*=========================================
設定をゲームへ反映
=========================================*/

function applyGameSettings(){

    const settings = getSettings();

    if(window.Game){

        Game.fps = settings.fps;

    }

    if(window.Renderer){

        Renderer.renderDistance =
            settings.renderDistance;

        Renderer.showFPS =
            settings.showFPS;

    }

    if(window.Sound){

        if(Sound.setBGMVolume){

            Sound.setBGMVolume(
                settings.bgm / 100
            );

        }

        if(Sound.setSEVolume){

            Sound.setSEVolume(
                settings.se / 100
            );

        }

    }

}

/*=========================================
ゲーム設定更新
=========================================*/

function refreshGameSettings(){

    loadGameSettings();

    applyGameSettings();

}

/*=========================================
ゲーム設定初期化
=========================================*/

function resetGameSettings(){

    const settings = getSettings();

    settings.bgm = 80;
    settings.se = 80;
    settings.fps = 60;
    settings.renderDistance = 8;
    settings.showFPS = true;

    saveSettings(settings);

    refreshGameSettings();

}

/*=========================================
スライダー表示更新
=========================================*/

function initSettingPreview(){

    const bgm =
        document.getElementById("bgmVolume");

    const se =
        document.getElementById("seVolume");

    if(bgm){

        bgm.addEventListener("input",()=>{

            console.log(
                "BGM :",
                bgm.value
            );

        });

    }

    if(se){

        se.addEventListener("input",()=>{

            console.log(
                "SE :",
                se.value
            );

        });

    }

}

console.log("setting.js Part3 Ready");
/*
=========================================
setting.js
Part4
データ管理
=========================================
*/

console.log("setting.js Part4 Loaded");

/*=========================================
設定エクスポート
=========================================*/

function exportSettings(){

    const settings = getSettings();

    const json = JSON.stringify(
        settings,
        null,
        4
    );

    const blob = new Blob(
        [json],
        {
            type:"application/json"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "BitWorld_Settings.json";

    a.click();

    URL.revokeObjectURL(url);

}

/*=========================================
設定インポート
=========================================*/

function importSettings(file){

    const reader =
        new FileReader();

    reader.onload = ()=>{

        try{

            const settings =
                JSON.parse(
                    reader.result
                );

            saveSettings(settings);

            refreshProfile();

            refreshGameSettings();

            alert(
                "設定を読み込みました"
            );

        }catch(e){

            alert(
                "設定ファイルが壊れています"
            );

        }

    };

    reader.readAsText(file);

}

/*=========================================
設定初期化
=========================================*/

function resetAllSettings(){

    if(
        !confirm(
            "設定を初期化しますか？"
        )
    ){

        return;

    }

    saveSettings(
        structuredClone(
            DEFAULT_SETTINGS
        )
    );

    refreshProfile();

    refreshGameSettings();

    alert(
        "初期化しました"
    );

}

/*=========================================
キャッシュ削除
=========================================*/

function clearCache(){

    if(
        !confirm(
            "キャッシュを削除しますか？"
        )
    ){

        return;

    }

    localStorage.removeItem(
        "BitWorldCache"
    );

    alert(
        "キャッシュを削除しました"
    );

}

/*=========================================
WorldCode設定
=========================================*/

const WorldCodeSettings={

    enabled:true,

    compress:true,

    version:1,

    autoBackup:true

};

function getWorldCodeSettings(){

    return WorldCodeSettings;

}

function saveWorldCodeSettings(){

    localStorage.setItem(

        "BitWorldWorldCode",

        JSON.stringify(
            WorldCodeSettings
        )

    );

}

function loadWorldCodeSettings(){

    const data =
        localStorage.getItem(
            "BitWorldWorldCode"
        );

    if(!data){

        return;

    }

    Object.assign(

        WorldCodeSettings,

        JSON.parse(data)

    );

}

/*=========================================
自動保存
=========================================*/

setInterval(()=>{

    saveWorldCodeSettings();

},30000);

console.log(
    "setting.js Part4 Ready"
);
/*
=========================================
setting.js
Part5
イベント登録
=========================================
*/

console.log("setting.js Part5 Loaded");

/*=========================================
設定画面を開く
=========================================*/

function openSettingScreen(){

    document
        .querySelectorAll(".screen")
        .forEach(screen=>{

            screen.classList.add("hidden");

        });

    document
        .getElementById("settingScreen")
        .classList.remove("hidden");

    loadProfileSettings();

    loadGameSettings();

}

/*=========================================
ホームへ戻る
=========================================*/

function closeSettingScreen(){

    document
        .querySelectorAll(".screen")
        .forEach(screen=>{

            screen.classList.add("hidden");

        });

    document
        .getElementById("homeScreen")
        .classList.remove("hidden");

}

/*=========================================
イベント登録
=========================================*/

window.addEventListener("load",()=>{

    // 設定画面
    document
        .getElementById("settingButton")
        ?.addEventListener(
            "click",
            openSettingScreen
        );

    // 戻る
    document
        .getElementById("settingBackButton")
        ?.addEventListener(
            "click",
            closeSettingScreen
        );

    // 保存
    document
        .getElementById("saveProfileButton")
        ?.addEventListener(
            "click",
            ()=>{

                saveProfile();

                saveGameSettings();

                applyGameSettings();

                alert("設定を保存しました！");

            }
        );

    // 初期化
    document
        .getElementById("resetSettingButton")
        ?.addEventListener(
            "click",
            resetAllSettings
        );

    // エクスポート
    document
        .getElementById("exportSettingButton")
        ?.addEventListener(
            "click",
            exportSettings
        );

    // インポート
    document
        .getElementById("importSettingFile")
        ?.addEventListener(
            "change",
            event=>{

                const file =
                    event.target.files[0];

                if(file){

                    importSettings(file);

                }

            }
        );

    // キャッシュ削除
    document
        .getElementById("clearCacheButton")
        ?.addEventListener(
            "click",
            clearCache
        );

    // アイコンボタン
    initIconButtons();

    // スライダー
    initSettingPreview();

    // WorldCode設定
    loadWorldCodeSettings();

    // ホーム更新
    updateHomeProfile();

});

console.log("setting.js Part5 Ready");
