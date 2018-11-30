let _makeEmptyModal= () => {
    $(".modal-header").append($(`<span class="modal-title big-font-cart">`).text("Cart"));
    $(".modal-body").append($(`<p class="modal-description">`).text("Your cart is empty. Choose device and add it to cart by clicking button \"Buy\"."));
};

let _makeCart= () => {
    $(".modal-header").append($(`<span class="modal-title big-font-cart">`).text("Cart"));

};
module.exports=[_makeEmptyModal,_makeCart];