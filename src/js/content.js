import {Data} from "./modules/data";
import {Builder} from "./modules/build";

let builder = new Builder();
let products = Data.loadProducts();

let per_page = 6;
let current = 0;

let boxContent = document.getElementById("range_content_box");
let paginationBox = document.getElementById("pag_box");

let changeMan = document.getElementById("button_man");
let changeWoman = document.getElementById("button_woman");
let changeChildren = document.getElementById("button_children");

let changeAll = document.getElementById("button_all");
let searchForm = document.getElementById("search");
let btn_search = document.getElementById("btn_search");
let mainProd = products;

function mainRender(prod) {
    renderProd(prod);
    renderPag(prod);
    changePag(prod);
    setTimeout(e => showAmount(), 10)
}

mainRender(mainProd);
searchProd(mainProd);

///////     build amount items on the page
function firstI() {
    return current * per_page;
};

function secondI(i, prod) {
    return i < current * per_page + per_page && i < prod.length;
};


function renderProd(prod) {
    boxContent.innerHTML = "";
    for (let i = firstI(); secondI(i, prod); i++) {
        console.log(secondI(i, prod))
        boxContent.appendChild(builder.createCard(prod[i]))
    }
    countPercentAndAddCurrency("boxSale", "down_coast_shoe");
    pageItemInformation()
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

function changePag(prod) {
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

let arrOptionSex = [changeMan, changeWoman, changeChildren]
let arrIndex = ["man", "woman", "children"]
// let sex = "sex", man = "man", woman = "woman", children = "children";

arrOptionSex.map((el, index)=>{
    el.addEventListener("click", (e) => {
        current = 0;
        mainProd = optionSex(products, arrIndex[index]);
        mainRender(mainProd);
        searchProd(mainProd);
        return mainProd
    });
})

changeAll.addEventListener("click", (e) => {
    // paginationBox.innerHTML ="";
    mainProd = products;
    mainRender(mainProd);
    searchProd(mainProd);
    return mainProd
});


function search(prod) {
    current = 0;
    paginationBox.innerHTML = "";
    let searchRegExp = new RegExp(searchForm.value, ["i"]);
    prod = prod.filter(el => searchRegExp.test(el.name));
    mainRender(prod);
    return mainProd = prod;

}

function searchProd(prod) {
    btn_search.addEventListener("click", (e) => {
        search(prod);
        pageItemInformation()
    });

    searchForm.addEventListener("keypress", (e) => {
        if (e.keyCode == 13) {
            search(prod);
        }
    });
}


function showAmount() {
    document.getElementById("amountItem").innerHTML = "";
    if (mainProd.length > 0) {
        document.getElementById("amountItem").innerHTML = "AMOUNT ON THIS PAGE: " + mainProd.length
    } else {
        document.getElementById("amountItem").innerHTML = "unfortunately nothing has been found"
    }
}

/////////////////////////////

// add currency and percent !!!!!!
function countPercentAndAddCurrency(boxSale, down_coast_shoe) {
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

let cartCount = [];
function pageItemInformation() {
    let buttonsShowMore = Array.from(document.getElementsByClassName("show_more"));
    buttonsShowMore.map((el) => {
        el.addEventListener("click", (e) => {
            for (let i = 0; i < products.length; i++) {
                if (products[i].nameData == el.dataset.name) {
                    builder.createPageInformation(products[i]);
                    // build information page =>
                    countPercentAndAddCurrency(" sale_price_shoe_page_info", "first_price_shoe_page_info")
                    document.getElementById("page_item_info").style.display = "block";
                    (function () {
                        document.getElementById("exit_button").addEventListener("click", (e) => {
                            document.getElementById("page_item_info").style.display = "none";
                        });
                    })();

                    // build Cart =>
                    createCartList()
                }
            }
        })
    })
}

builder.createCartFixed(cartCount)

function createCartList() {
    let buttonsBuy = document.getElementById("button_buy");
    buttonsBuy.addEventListener("click", (e) => {
        for (let i = 0; i < products.length; i++) {
            if (products[i].nameData == buttonsBuy.dataset.name) {

                cartCount.push(products[i]);
                builder.createBoxWish(cartCount);
                builder.createCartFixed(cartCount)//???
                cartSummarize();

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

    builder.createTableOfOrders(cartCount);

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

            builder.createBoxWish(cartCount);
            builder.createCartFixed(cartCount)//???
            cartSummarize()
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

function cartSummarize() {
    let cordCount = document.getElementById("cordCount")
    if (cartCount.length == 0) {
        cordCount.innerHTML = "Empty";
        document.getElementById("fixed_cart").style.width = "130px";
        document.getElementById("cart_summarise_prise").innerHTML = "$0"
    } else if (cartCount.length != 0) {
        document.getElementById("fixed_cart").style.width = "165px";
        cordCount.innerHTML = cartCount.length + " = " + "$" +sumCartPrice(cartCount)
    }
}
cartSummarize();

