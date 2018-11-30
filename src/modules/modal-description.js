let _makeModal= ({
    id,
    name,
    image_url,
    description,
    price,
    special_price
}) => {
    $(".modal-header ").append($(`<div class="modal-title" data-product-id="${id}">`).text(name));
    $(".modal-body").append($(`<img src="${image_url}" class="modal-img product-image"> `));
    $(".modal-body").append($(`<p class="modal-description">`).text(description));
    $(".modal-body").append($(`<span class="d-block product-price ${special_price == null ? '' : 'crossed'}">`).text(`${price} hrn`));
    if (special_price != null) {
        $(".modal-body").append($(`<span class = "d-block product-special-price">`).text("${special_price} hrn"));
    }
    $(".modal-footer").append($(`<button type="button" class="btn btn-success buy" data-product-id="${id}">`).text("Buy"));
    $(".modal-footer").append($(`<button type="button" class="btn btn-secondary" data-dismiss="modal">`).text("Close"));
};
module.exports = _makeModal;
