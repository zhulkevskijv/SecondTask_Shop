let _makeEmptyModal= () => {
    $(".modal-header").append($(`<span class="modal-title big-font-cart">`).text("Cart"));
    $(".modal-body").append($(`<p class="modal-description">`).text("Your cart is empty. Choose device and add it to cart by clicking button \"Buy\"."));
};

let _makeOrder= ({
                     counterID,
                     product
                 }) => {
    let $productOrder=$(`<div class="product-order d-inline-block">`);
    $($productOrder).append($(`<img src="${product.image_url}" alt="${product.name}">`));
    $($productOrder).append($(`<span>`).text(product.name));
    $($productOrder).append($((`<span>`).text((product.special_price)==null)?`${product.price}`:`${product.special_price}`));
    $($productOrder).append($(`<button class="btn-dark d-inline-block">`).text("+"));
    $($productOrder).append($(`<span class="btn-dark d-inline-block">`).text(`${counterID}`));
    $($productOrder).append($(`<button class="btn-dark d-inline-block">`).text("-"));
    return $productOrder;
};
module.exports=[_makeEmptyModal,_makeOrder];