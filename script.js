const loginBtn = document.getElementById("loginBtn");

loginBtn.onclick = ()=>{

    const user=document.getElementById("username").value;

    if(user===""){

        alert("ユーザー名を入力してください");
        return;
    }

    alert("ようこそ "+user+" さん！");
}
