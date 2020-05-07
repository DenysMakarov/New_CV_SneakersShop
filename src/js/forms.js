import {isLogin} from "./modules/test_login";

const loginTest = new isLogin();


let buttonShowConten = document.getElementById("show_content");
let buttonSubmit = document.getElementById("button_submit");
let logoutButton = document.getElementById("logout");
let buttonShowContenTrue = 0;


let submitHandler = (e) => {
    e.preventDefault();

    const email = document.getElementById("check_email").value;
    let emailErr = [];
    const redEmail = document.getElementById("error_email");

    const password = document.getElementById("check_password").value;
    let passErr = [];
    const redPass = document.getElementById("error_password");

    //Ex
    if (!loginTest.isSubmitDog(email)) {
        emailErr.push(" You forgot '@' or '.' ")
    }
    if (!loginTest.isWord(email)) {
        emailErr.push(" Please enter a-z A-Z, ")
    }

    if (!loginTest.isLowerWord(password)) {
        passErr.push(" Please enter a-z")
    }
    if (!loginTest.isUpperWord(password)) {
        passErr.push(" Please enter A-Z")
    }
    if (!loginTest.isNumber(password)) {
        passErr.push(" Please enter 0-9");
    }

    // email
    switch (emailErr.length > 0) {
        case true :
            redEmail.innerHTML = emailErr;
            redEmail.style.color = "red";
            break;
        case false :
            redEmail.innerHTML = "all right";
            redEmail.style.color = "green"
    }

    // password
    switch (passErr.length > 0) {
        case true :
            redPass.innerHTML = passErr;
            redPass.style.color = "red";
            break;
        case false :
            redPass.innerHTML = "all right";
            redPass.style.color = "green"
    }

    // check true login & password
    switch (passErr.length == 0 && emailErr.length == 0) {
        case true :
            loginTest.loginFalse(buttonShowConten, buttonSubmit, buttonShowContenTrue);
            buttonShowContenTrue = 1;
            break;
        case false :
            loginTest.loginTrue(buttonShowConten, buttonSubmit, buttonShowContenTrue);
            buttonShowContenTrue = 0
    }

    if (passErr.length != 0 && emailErr.length != 0) {
        buttonSubmit.addEventListener("submit", wrong_submit(buttonSubmit), false);
    }
    addShowContentEvent();
    console.log(buttonShowContenTrue)
};

export function wrong(buttonSubmit) {
    buttonSubmit.style.animationName = "wrong";
}

function wrong_submit(buttonSubmit) {
    buttonSubmit.addEventListener("click", (e) => {
        buttonSubmit.style.animationName = "submit_wrong";

        setTimeout(function () {
            buttonSubmit.style.animationName = "wrong";
        }, 500);
    })
}

// FUNCTIOUN TEST
function addShowContentEvent() {
    switch (buttonShowContenTrue) {
        case 1 :
            loginTest.BSCT_1();
            break; //// => from module
        case 0 :
            loginTest.BSCT_0()         //// => from module
    }
}


document.addEventListener("submit", submitHandler, false);
logoutButton.addEventListener("click", (e) => {
    loginTest.loginPageApear()
});


let arrBottomsOption = Array.from(document.getElementsByClassName("buttom_option"));
for (let i = 0; i < arrBottomsOption.length; i++) {
    arrBottomsOption[i].addEventListener("click", (e) => {
        for (let i = 0; i < arrBottomsOption.length; i++) {
            arrBottomsOption[i].classList.remove("button_option_untouch")
        }
        e.target.classList.add("button_option_untouch")
    });
}

