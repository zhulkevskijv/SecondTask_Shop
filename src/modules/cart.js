let _makeEmptyModal= () => {
    $(".modal-header").append($(`<span class="modal-title big-font-modal">`).text("Cart"));
    $(".modal-body").append($(`<p class="modal-description">`).text("Your cart is empty. Choose device and add it to cart by clicking button \"Buy\"."));
    $(".modal-footer").append($(`<button type="button" class="btn btn-secondary" data-dismiss="modal">`).text("Close"));
};

let _makeOrder= ({
                     counterID,
                     product
                 }) => {
    let $productOrder=$(`<div class="product-order d-block my-1 border-dark text-center col-12 " data-product-id="${product.id}">`);
    $productOrder.append($(`<img src="${product.image_url}" alt="${product.name}" class="order-image">`));
    $productOrder.append($(`<span class="d-block">`).text(product.name));
    $productOrder.append($(`<span class="d-inline-block bg-dark price-order m-1 p-1 text-light font-cart">`).text(`Price: ${product.special_price == null ? product.price : product.special_price} hrn`));
    $productOrder.append($(`<div>`));
    $productOrder.append($(`<button class="btn btn-dark  minus mx-1 px-1 font-cart">`).text("-"));
    $productOrder.append($(`<span class="bg-light px-2 count font-cart" data-quantity="${counterID}">`).text(counterID));
    $productOrder.append($(`<button class="btn btn-dark  plus mx-1 px-1 font-cart">`).text("+"));
    $productOrder.append($(`<button class="btn btn-dark remove d-block mx-auto mt-1 font-cart">`).text("Remove"));
    return $productOrder;
};
let _makeForm=() => {
    let $logForm=$(`<form class="my-2">`);
    let $name=$(`<div class="form-group">`);
    $name.append($(`<label>`).text("Your name"));
    $name.append($(`<input type="text"  class="form-control name" placeholder="Enter your name...">`));
    let $mail=$(`<div class="form-group">`);
    $mail.append($(`<label>`).text("Email"));
    $mail.append($(`<input type="email"  class="form-control email" placeholder="Enter email...">`));
    let $tel=$(`<div class="form-group">`);
    $tel.append($(`<label>`).text("Your telephone"));
    $tel.append($(`<input type="tel"  class="form-control tel" placeholder="+380...">`));
    $logForm.append($($name));
    $logForm.append($($mail));
    $logForm.append($($tel));
    return $logForm;
};
module.exports=[_makeEmptyModal,_makeOrder, _makeForm];