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
let productArray = [];

//functions
//adds all products to product grid
jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/product/list',
    method: 'get',
    dataType: 'json',
    success: function (json) {
        console.log('Loaded via AJAX!');
        console.table(json);
        json.forEach(product => $('.product-grid').append(_makeProduct(product)));
        $("footer").removeClass("d-none");
        console.log('Added to grid');
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
        console.log('Loaded via AJAX!');
        // console.log(json);
        console.table(json);
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
            console.log('Loaded via AJAX!');
            // console.log(json);
            console.table(json);

            json.forEach(product => $('.product-grid').append(_makeProduct(product)));
            console.log('Added to grid');
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
});

//adds products of chosen category
//the category is chosen in dropdown menu "Categories"
$(document).on('click', '.category', function () {
    let idCategory = $(this).attr("data-category-id");
    $(".product-grid").empty();
    $(".dropdown-toggle").text($(this).text());
    jQuery.ajax({
        url: `https://nit.tron.net.ua/api/product/list/category/${idCategory}`,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            console.log('Loaded via AJAX!');
            console.table(json);
            json.forEach(product => $('.product-grid').append(_makeProduct(product)));
            console.log('Added to grid');
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
});
// shows pop-up window when clicking on any information of the product
$(document).on('click', '.description-toggle', function () {
    let idProduct = $(this).attr("data-product-id");
    $(".modal-body").empty();
    $(".modal-header").empty();
    $(".modal-footer").empty();
    jQuery.ajax({
        url: `https://nit.tron.net.ua/api/product/${idProduct}`,
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
    let idProduct = $(this).attr("data-product-id");
    jQuery.ajax({
        url: `https://nit.tron.net.ua/api/product/${idProduct}`,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            let fl = true;
            for (let i = 0; i < productArray.length; i++) {
                if (idProduct === productArray[i].product.id) {
                    productArray[i].counterID++;
                    fl = false;
                    break;
                }
            }
            if (fl)
                productArray.push({counterID: 1, product: json});
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
    console.log(productArray);
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
        $(".modal-header").append($(`<span class="modal-title big-font-cart">`).text("Cart"));
        //productArray.forEach(product => $('.modal-body').append(_makeOrder(product)));
        $(".modal-footer").append($(`<button class="btn-success">`).text("Make an order"));
        $(".modal-footer").append($(`<button class="btn-primary" data-dismiss="modal">`).text("Close"));
    }
});

