let _makeHtml = ({
                     id,
                     name,
                     image_url,
                     description,
                     price,
                     special_price
                 }) => {
    let $product = $(`<div class="text-center card bg-table col-xs-12 col-sm-6 col-md-4 col-lg-3 py-3 " 
                                    data-product-id="${id}" >`);
    let $body=$(`<div class="my-auto">`);
    $body.append($(`<div class="image-container"><img src="${image_url}" alt="${name}" class="center-product-image product-image card-img bg-white"></div>`));
    $body.append($(`<span class="text-white d-block py-1 name-border">`).text(name));
    $body.append($(`<span class="text-white d-block ${special_price == null ? '' : 'crossed'}">`).text(`${price} hrn`));
    if (special_price != null) {
        $body.append($(`<span class = "product-special-price d-block">`).text(`${special_price} hrn`));
    }
    $product.append($body);
    let $buttons=$(`<div class="mt-auto">`);
    $buttons.append($(`<button class="description-toggle btn more mx-1 px-3" data-toggle="modal" data-target="#my-modal" data-product-id="${id}">`).text("More"));
    $buttons.append($(`<button class="btn buy mx-1 px-3" data-product-id="${id}">`).text("Buy"));
    $product.append($buttons);
    return $product;
};

module.exports = _makeHtml;