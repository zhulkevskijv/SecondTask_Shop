import './scss/main.scss';

import $ from 'jquery';

window.jQuery = $;
window.$ = $;

import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';

let _makeProduct = require('./modules/product-html');
let _makeCategory = require('./modules/product-categories');
let _makeModal = require('./modules/modal-description');
let _arrayCartFunctions = require('./modules/cart');
let _makeEmptyCart = _arrayCartFunctions[0];
let _makeOrder = _arrayCartFunctions[1];
let _makeForm = _arrayCartFunctions[2];
let productArray = [];
let $totalPrice = 0;

//functions
//adds all products to product grid
jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/product/list',
    method: 'get',
    dataType: 'json',
    success: function (json) {
        if (JSON.parse(sessionStorage.getItem("productArray")) != null)
        productArray=JSON.parse(sessionStorage.getItem("productArray"));
        json.forEach(product => $('.product-grid').append(_makeProduct(product)));
        $("footer").removeClass("d-none");
    },
    error: function (xhr) {
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});

//adds categories to button "categories"
jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/category/list',
    method: 'get',
    dataType: 'json',
    success: function (json) {
        json.forEach(category => $('.categories').append(_makeCategory(category)).append($(`<div class="dropdown-divider my-0"></div>`)));
        $(" .dropdown-divider:last-child").remove();
    },
    error: function (xhr) {
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});

//adds products by clicking button "All products"
$(document).on('click', '.button-all-products', function () {
    $(".product-grid").children("*").remove();
    $(".dropdown-toggle").text("Categories");
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/list',
        method: 'get',
        dataType: 'json',
        success: function (json) {
            json.forEach(product => $('.product-grid').append(_makeProduct(product)));
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
});

//adds products of chosen category
//the category is chosen in dropdown menu "Categories"
$(document).on('click', '.category', function () {
    let $idCategory = $(this).attr("data-category-id");
    $(".product-grid").empty();
    $(".dropdown-toggle").text($(this).text());
    jQuery.ajax({
        url: `https://nit.tron.net.ua/api/product/list/category/${$idCategory}`,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            json.forEach(product => $('.product-grid').append(_makeProduct(product)));
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
});
// shows pop-up window when clicking on any information of the product
$(document).on('click', '.description-toggle', function () {
    let $idProduct = $(this).attr("data-product-id");
    $(".modal-body").empty();
    $(".modal-header").empty();
    $(".modal-footer").empty();
    jQuery.ajax({
        url: `https://nit.tron.net.ua/api/product/${$idProduct}`,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            _makeModal(json);
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
});

//add product to order array
$(document).on('click', '.buy', function () {
    let $idProduct = $(this).attr("data-product-id");
    jQuery.ajax({
        url: `https://nit.tron.net.ua/api/product/${$idProduct}`,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            let fl = true;
            for (let i = 0; i < productArray.length; i++) {
                if ($idProduct === productArray[i].product.id) {
                    productArray[i].counterID++;
                    fl = false;
                    break;
                }
            }
            if (fl)
                productArray.push({counterID: 1, product: json});
            sessionStorage.setItem("productArray",JSON.stringify(productArray));
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
});
// if the client didn't buy anything, the cart is empty
// else make a menu to place an order
$(document).on('click', '.cart', function () {
    $(".modal-body").empty();
    $(".modal-header").empty();
    $(".modal-footer").empty();
    if (productArray.length === 0) {
        _makeEmptyCart();
    } else {
        productArray.sort(function compare(a, b) {
            return a.product.id - b.product.id;
        });
        $(".modal-header").append($(`<span class="modal-title big-font-modal">`).text("Cart"));
        productArray.forEach(product => $(".modal-body").append(_makeOrder(product)));
        productArray.forEach(product => $totalPrice += Number(product.counterID) * Number(product.product.special_price == null ? product.product.price : product.product.special_price));
        $(".modal-body").append($(`<div class="total-price bg-dark d-inline-block p-1 text-white">`).text(`Total price: ${Number.parseFloat($totalPrice).toFixed(2)} hrn`));
        $(".modal-body").append(_makeForm());
        $(".modal-footer").append($(`<button class="btn btn-success btn-order">`).text("Make an order"));
        $(".modal-footer").append($(`<button type="button" class="btn btn-secondary close-btn" data-dismiss="modal">`).text("Close"));
    }
});
//clears price when exiting from the cart
$(document).on('click', '.close-btn', function () {
    $totalPrice = 0;
    $("#my-modal").modal('hide');
});

//increase quantity of products
$(document).on('click', '.plus', function () {
    let $counter = $(this).parent().children('.count').first().attr("data-quantity");
    $(this).parent().children(".count").first().attr("data-quantity", Number($counter) + 1);
    $(this).parent().children(".count").first().text(Number($counter) + 1);
    let $idProduct = $(this).parent().attr("data-product-id");
    for (let i = 0; i < productArray.length; i++)
        if (productArray[i].product.id === $idProduct) {
            productArray[i].counterID += 1;
            $totalPrice += Number(productArray[i].product.special_price == null ? productArray[i].product.price : productArray[i].product.special_price);
            $(".total-price").text(`Total price: ${Number.parseFloat($totalPrice).toFixed(2)} hrn`);
            break;
        }
    sessionStorage.setItem("productArray",JSON.stringify(productArray));
});

//reduce quantity of product
$(document).on('click', '.minus', function () {
    let $counter = $(this).parent().children('.count').first().attr("data-quantity");
    let $idProduct = $(this).parent().attr("data-product-id");
    if (Number($counter) === 1) {
        $(this).parent().remove();
        if ($(".modal-body").children(".product-order").length === 0) {
            $(".modal-body").empty();
            $(".modal-body").append($(`<p class="modal-description">`).text("Your cart is now empty. Choose device and add it to cart."));
        }
        for (let i = 0; i < productArray.length; i++)
            if (productArray[i].product.id === $idProduct) {
                $totalPrice -= Number(productArray[i].product.special_price == null ? productArray[i].product.price * Number(productArray[i].counterID) : productArray[i].product.special_price * Number(productArray[i].counterID));
                $(".total-price").text(`Total price: ${Number.parseFloat($totalPrice).toFixed(2)} hrn`);
                productArray.splice(i, 1);
                break;
            }
    }
    else {
        $(this).parent().children(".count").first().attr("data-quantity", Number($counter) - 1);
        $(this).parent().children(".count").first().text(Number($counter) - 1);
        for (let i = 0; i < productArray.length; i++)
            if (productArray[i].product.id === $idProduct) {
                productArray[i].counterID -= 1;
                $totalPrice -= Number(productArray[i].product.special_price == null ? productArray[i].product.price : productArray[i].product.special_price);
                $(".total-price").text(`Total price: ${Number.parseFloat($totalPrice).toFixed(2)} hrn`);
                break;
            }
    }
    sessionStorage.setItem("productArray",JSON.stringify(productArray));
});

//Removes product from cart
$(document).on('click', '.remove', function () {
    let $idProduct = $(this).parent().attr("data-product-id");
    $(this).parent().remove();
    if ($(".modal-body").children(".product-order").length === 0) {
        $(".modal-body").empty();
        $(".modal-body").append($(`<p class="modal-description">`).text("Your cart is now empty. Choose device and add it to cart."));
    }
    for (let i = 0; i < productArray.length; i++)
        if (productArray[i].product.id === $idProduct) {
            $totalPrice -= Number(Number(productArray[i].product.special_price == null ? productArray[i].product.price : productArray[i].product.special_price) * Number(productArray[i].counterID));
            $(".total-price").text(`Total price: ${Number.parseFloat($totalPrice).toFixed(2)} hrn`);
            productArray.splice(i, 1);
            break;
        }
    sessionStorage.setItem("productArray",JSON.stringify(productArray));
});

//makes a post request
$(document).on('click', '.btn-order', function () {
    let $name = $(".name").val();
    let $email = $(".email").val();
    let $tel = $(".tel").val();
    let $data = {
        token: 'YXUk1QPN7A_85mC3BhDm',
        name: $name,
        phone: $tel,
        email: $email,
    };
    productArray.forEach(product => {
        $data[`products[${product.product.id}]`] = product.counterID;
    });
    jQuery.ajax({
        url: "https://nit.tron.net.ua/api/order/add",
        method: 'post',
        data: $data,
        dataType: 'json',
        success: function (json) {
            $("#my-modal").modal('hide');
            $(`.modal-body-2`).empty();
            $(".mfoot-2").empty();
            $(".mfoot-2").append($(`<button class="btn btn-secondary back-cart" data-dismiss="modal">`).text("Close"));
            if (json.status === "success") {
                productArray.splice(0, productArray.length);
                $totalPrice = Number(0);
                $(".total-price").text(`Total price: ${Number.parseFloat($totalPrice).toFixed(2)} hrn`);
                $(`.modal-body-2`).append($(`<span class="d-block big-font-modal my-2 green">`).text("Success"));
                $(`.modal-body-2`).append($(`<span class="d-block my-2">`).text("We recieved your order!"));
            }
            else {
                $(`.modal-body-2`).append($(`<span class="d-block big-font-modal red">`).text("Errors"));
                for (let key in json.errors) {
                    json.errors[key].forEach(err => $(`.modal-body-2`).append($(`<span class="d-block my-2">`).text(err)));
                }

            }
            $("#result-modal").modal('show');
        },
        error:
            function (xhr) {
                alert("An error occured: " + xhr.status + json);
            },
    });
    sessionStorage.setItem("productArray",JSON.stringify(productArray));
});




