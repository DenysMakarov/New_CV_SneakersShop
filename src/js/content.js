import {Data} from "./modules/data";

let products = Data.loadProducts();

import {Builder} from "./modules/build";

let createCards = new Builder();
let createPouPup = new Builder();
let creatCart = new Builder();
let createListOfOrders = new Builder();

let per_page = 6;
let current = 0;


let boxContent = document.getElementById("range_content_box");
let paginationBox = document.getElementById("pag_box");

let changeMan = document.getElementById("buttom_man");
let changeWoman = document.getElementById("buttom_woman");
let changeChildren = document.getElementById("buttom_children");

let changeAll = document.getElementById("buttom_all");
let sex = "sex", man = "man", woman = "woman", children = "children";
let searchForm = document.getElementById("search");
let btn_search = document.getElementById("btn_search");


// console.log(products[0].nameData);
// console.dir(products[1]);


let copyProd = [];
let mainProd = copyProd.concat(products);

function shareRender(prod) {
    renderProd(prod);
    renderPag(prod);
    cheangePag(prod);
    setTimeout(e => showEmount(), 10)
}

shareRender(mainProd);
searchProd(mainProd);

///////     FUNCTIONS
function firstI() {
    return current * per_page;
};

function secondI(i, prod) {
    return i < current * per_page + per_page && i < prod.length;
};


function renderProd(prod) {
    boxContent.innerHTML = "";
    for (let i = firstI(); secondI(i, prod); i++) {
        boxContent.appendChild(createCards.createCard(prod[i]))
    }
    countPercent_AddCurrency("boxSale", "down_coast_shoe");
    setNameForPoupPup()
}

function renderPag(prod) {
    paginationBox.innerHTML = "";
    for (let i = 0; i < Math.ceil(prod.length / per_page); i++) {
        paginationBox.appendChild(Builder.createNewElement("div", "pag_item", i + 1, [{
            "name": "data-name",
            "value": i
        }]));
    }
    if (prod.length > 0) {
        paginationBox.firstChild.classList.add("active_pag")
    }
}

function cheangePag(prod) {
    let countPag = Array.from(document.getElementsByClassName("pag_item"));
    countPag.map((el) => {
        el.addEventListener("click", (e) => {
            current = el.dataset.name;
            renderProd(prod);
            console.log("current " + current);
            // searchProd(prod, paginationBox);
            for (let i = 0; i < countPag.length; i++) {
                countPag[i].classList.remove("active_pag");
            }
            e.target.classList.add("active_pag");

        })
    })
}

function optionSex(prod, sexTarget) {
    let filterProd = prod.filter(el => el.sex === sexTarget);
    return filterProd
}


changeMan.addEventListener("click", (e) => {
    current = 0;
    mainProd = optionSex(products, man);
    shareRender(mainProd);
    searchProd(mainProd);
    return mainProd
});
changeWoman.addEventListener("click", (e) => {
    current = 0;
    mainProd = optionSex(products, woman);  // from modules
    console.log(mainProd)
        shareRender(mainProd);
        searchProd(mainProd);
        return mainProd
});
changeChildren.addEventListener("click", (e) => {
    current = 0;
    mainProd = optionSex(products, children);  // from modules
    shareRender(mainProd);
    searchProd(mainProd);
    return mainProd
});
changeAll.addEventListener("click", (e) => {
    // paginationBox.innerHTML ="";
    mainProd = products;
    shareRender(mainProd);
    searchProd(mainProd);
    return mainProd
});



function search(prod) {
    current = 0;
    paginationBox.innerHTML = "";
    let searchRegExp = new RegExp(searchForm.value, ["ig"]);
    prod = prod.filter(el => searchRegExp.test(el.name));
    shareRender(prod);
    return mainProd = prod;
}

function searchProd(prod) {
    btn_search.addEventListener("click", (e) => {
        if (searchForm.value == "") {
            // boxContent.innerHTML ="hDJLHSDJKhLHJKD"
        } else {
            search(prod);
            console.log("kjjkj")
        }
        setNameForPoupPup()

    });

    searchForm.addEventListener("keypress", (e) => {
        if (e.keyCode == 13) {
            search(prod);
        }
    });
}


function showEmount() {
    document.getElementById("amountItem").innerHTML = "";
    if (mainProd.length > 0) {
        document.getElementById("amountItem").innerHTML = "AMOUNT ON THIS PAGE: " + mainProd.length
    } else {
        document.getElementById("amountItem").innerHTML = "unfortunately nothing has found"
    }
}

/////////////////////////////

// add currency and percent !!!!!!
function countPercent_AddCurrency(boxSale, down_coast_shoe) {
    let saleForBlock = Array.from(document.getElementsByClassName(boxSale));
    for (let i = 0; i < saleForBlock.length; i++) {
        if (saleForBlock[i].innerHTML == -Infinity) {
            saleForBlock[i].style.display = "none"
        } else {
            saleForBlock[i].innerHTML = "-" + saleForBlock[i].innerHTML + "%"
        }
    }
    let firstPriceAdd = Array.from(document.getElementsByClassName(down_coast_shoe));
    for (let i = 0; i < firstPriceAdd.length; i++) {
        if (firstPriceAdd[i].innerHTML != " ") {
            firstPriceAdd[i].innerHTML = "$" + firstPriceAdd[i].innerHTML
        }
    }
}

// function => count common sum in cart   => ??? did not succeeded only use reduce ???
export function sumCartPrice(cartCount) {
    let x = [];
    if (cartCount != 0) {
        let y = cartCount.map((el) => {
            x.push(el.price)
        });
        x = x.reduce(function (a, b) {
            return a + b
        });
    }
    return x
}


////////////////////////
//      //      //      // => about how CAN USE Event through ","

// let buttom_test = document.getElementById("buttom_test");
// buttom_test,addEventListener("click", (e) => {
//     let y = Array.from(document.getElementsByClassName("show_more"));
//     console.log(y[2].dataset.name)
// })

let cartCount = [];

function setNameForPoupPup() {
    let buttonsShowMore = Array.from(document.getElementsByClassName("show_more"));
    buttonsShowMore = buttonsShowMore.map((el) => {
        el.addEventListener("click", (e) => {
            for (let i = 0; i < products.length; i++) {
                if (products[i].nameData == el.dataset.name) {
                    createPouPup.createPouPup(products[i]);
                    // build Poupup =>
                    countPercent_AddCurrency(" sale_price_shoe_pou_pup", "first_price_shoe_pou_pup")
                    document.getElementById("PouPap").style.display = "block";
                    (function () {
                        document.getElementById("exit_button").addEventListener("click", (e) => {
                            document.getElementById("PouPap").style.display = "none";
                        });
                    })();

                    // build Cart =>
                    createCartList()

                }
            }
        })
    })
}

creatCart.createCartFixed(cartCount)

function createCartList() {
    let buttonsBuy = document.getElementById("buton_buy");
    buttonsBuy.addEventListener("click", (e) => {
        for (let i = 0; i < products.length; i++) {
            if (products[i].nameData == buttonsBuy.dataset.name) {

                cartCount.push(products[i]);
                creatCart.createBoxWish(cartCount);
                creatCart.createCartFixed(cartCount)//???
                cartEmpty()


                document.getElementById("cart_summarise_prise").innerHTML = "$" + sumCartPrice(cartCount); // => top cart;
                document.getElementById("cart_summarise_prise425").innerHTML = "$" + sumCartPrice(cartCount) // => top cart;
            }
        }
    });
}

function openCartList(cartEl) {

    let cart = document.getElementById(cartEl);
    let cartList = document.getElementById("cart_list");
    cartList.innerHTML = ""

    createListOfOrders.createTableOfOrders(cartCount, cartCount);

    let removeArr = Array.from(document.getElementsByClassName("remove_item_card"))
    removeArr = removeArr.map((el) => {
        for (let i = 0; i < cartCount.length; i++) {
            removeArr[i].setAttribute("data-remove", i);
        }
    });

    cart.addEventListener("click", (e) => {
        cartList.style.display = "block";
        openCartList("fixed_cart")
    });


    let btnRemove = Array.from(document.getElementsByClassName("remove_item_card"));
    btnRemove.map((el) => {
        el.addEventListener("click", (e) => {
            let x = +e.target.dataset.remove;

            cartCount.splice(x, 1)

            cartList.style.display = "block";
            openCartList("fixed_cart");

            document.getElementById("cart_summarise_prise").innerHTML = "$" + sumCartPrice(cartCount); // => top cart;
            document.getElementById("cart_summarise_prise425").innerHTML = "$" + sumCartPrice(cartCount) //

            creatCart.createBoxWish(cartCount);
            creatCart.createCartFixed(cartCount)//???
            cartEmpty()
        })
    })


    let exit = document.getElementById("exit_cart")
    exit.addEventListener("click", (e) => {
        cartList.innerHTML = "";
        cartList.style.display = "none"
    })

}

openCartList("fixed_cart");
openCartList("nav_item_cart");
openCartList("basket425");




function cartEmpty(){
    if (cartCount.length == 0) {
        document.getElementById("cordCount").innerHTML = "Empty";
        document.getElementById("fixed_cart").style.width = "130px";

        document.getElementById("cart_summarise_prise").innerHTML = "$0"
    }else if(cartCount.length != 0){
        document.getElementById("fixed_cart").style.width = "60px";
    }
}
cartEmpty()

// document.getElementById("cartBox").innerHTML = "0"
