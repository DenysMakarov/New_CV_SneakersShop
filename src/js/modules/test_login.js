import {wrong} from "../forms";

export class isLogin {

    constructor(buttonShowContenTrue) {
        this.logout = document.getElementById("logout");
        this.emailBox = document.getElementById("email_box");
        this.buttonShowConten = document.getElementById("show_content");
        this.buttonSubmit = document.getElementById("button_submit");
        this.jsItem_box = document.getElementById("jsItem_box");
        this.buttonShowContenTrue = buttonShowContenTrue;
    }

    // test email //
    isSubmitDog(pass) {
        return /[\.]/.test(pass) && /[\@]/.test(pass);
    }

    isWord(pass) {
        return /[a-z]/i.test(pass);
    }

    // test password //
    isLowerWord(pass) {
        return /[a-z]/.test(pass)
    }

    isUpperWord(pass) {
        return /[A-Z]/.test(pass)
    }

    isNumber(pass) {
        return /[1-9]/.test(pass)
    }

    // remove / add class:
    loginTrue(buttonShowConten, buttonSubmit) {
        buttonShowConten.classList.remove("button_submit_untouch");
        buttonSubmit.classList.remove("button_submit_touch");

        buttonShowConten.classList.add("button_submit_touch");
        buttonSubmit.classList.add("button_submit_untouch");

        buttonShowConten.innerHTML = "You will see main content after registration";
    }

    loginFalse(buttonShowConten, buttonSubmit) {
        buttonShowConten.classList.remove("button_submit_touch");
        buttonSubmit.classList.remove("button_submit_untouch");

        buttonShowConten.classList.add("button_submit_untouch");
        buttonSubmit.classList.add("button_submit_touch");

        buttonSubmit.addEventListener("click", wrong(buttonSubmit), false);
        buttonShowConten.innerHTML = "Push button to see all range";
    }



     BSCT_1() {
        this.buttonShowConten.addEventListener("click", (e)=>{

            this.emailBox.style.animationName = "ep_disapear";
            this.buttonShowConten.classList.remove("button_submit_untouch");
            this.buttonShowConten.classList.add("button_submit_touch");

            setTimeout(function () {
                document.getElementById("password_box").style.animationName = "ep_disapear";
            },150);
            setTimeout(function () {
                document.getElementById("button_submit").style.animationName = "submit_disapear";
            },250);
            setTimeout(function () {
                document.getElementById("show_content").style.animationName = "show_content_disapear";
            },350);
            setTimeout(function () {
                this.jsItem_box.style.zIndex = "1111111111";
                document.getElementById("js_content_box_wrap").classList.add("js_content_box_change");
                document.getElementById("jsItem_box_wrap").style.bottom = "115px";
                document.getElementById("js_range_title").style.opacity = "1";
                document.getElementById("js_login_title").style.opacity = "0";

            },700);
            ///// ADD KEYFRAMES APPEAR RANGE

        })
    }
    BSCT_0() {
        setTimeout(function () {
            // jsItem_box.style.backgroundColor = "blue"
        },1000)
    }
    loginPageApear(){
        this.emailBox.style.animationName = "ep_apear";

        this.buttonShowConten.classList.add("button_submit_untouch");
        // this.buttonShowConten.classList.add("button_submit_touch");

        setTimeout(function () {
            document.getElementById("password_box").style.animationName = "ep_apear";
        },150);
        setTimeout(function () {
            document.getElementById("button_submit").style.animationName = "submit_apear";
        },250);
        setTimeout(function () {
            document.getElementById("show_content").style.animationName = "show_content_apear";
        },350);
        setTimeout(function () {
            this.jsItem_box.style.zIndex = "1";
            document.getElementById("js_content_box_wrap").classList.remove("js_content_box_change");
            document.getElementById("js_range_title").style.opacity = "0";
            document.getElementById("js_login_title").style.opacity = "1";
        },10);

        ///// ADD KEYFRAMES DISAPPEAR RANGE

    }
}