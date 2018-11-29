import './scss/main.scss';

//import 'bootstrap';	// with JS!!
//import 'bootstrap/dist/css/bootstrap.min.css';	// only minified CSS
console.log("Hello deadlines");
console.log(`The time is ${new Date()}`);

import $ from 'jquery';

window.jQuery = $;
window.$ = $;

import 'bootstrap/js/dist/dropdown';

let _makeProduct = require('./modules/product-html');
let _makeCategories = require('./modules/product-categories');
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
        json.forEach(category => $('.categories').append(_makeCategories(category)).append($(`<div class="dropdown-divider my-0"></div>`)));
        $(" .dropdown-divider:last-child").remove();
    },
    error: function (xhr) {
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});