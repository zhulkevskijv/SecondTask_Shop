import './scss/main.scss';
//import 'bootstrap/dist/css/bootstrap.min.css';	// only minified CSS
console.log(`The time is ${new Date()}`);

import $ from 'jquery';

window.jQuery = $;
window.$ = $;

import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';

let _makeProduct = require('./modules/product-html');
let _makeCategory = require('./modules/product-categories');
let _makeModal = require('./modules/modal-description');
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

$(document).on('click', '.button-all-products', function () {
    $(".product-grid").children("*").remove();
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

$(document).on('click', '.category', function () {
    let idCategory=$(this).attr("data-category-id");
    $(".product-grid").empty();
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

$(document).on('click', '.description-toggle', function () {
    let idProduct=$(this).attr("data-product-id");
    $(".modal-body").empty();
    $(".modal-header").empty();
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
