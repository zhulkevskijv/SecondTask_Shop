let _makeHtml = ({
                     id,
                     name,
                     image_url,
                     description,
                     price,
                     special_price
                 }) => {
    let $product = $(`<div class="description-toggle card bg-table card-col-xs-12 col-sm-4 col-md-4 col-lg-3 py-lg-3 py-sm-2 align-middle" 
                                    data-product-id="${id}" >`);
    $product.append($(`<div class="image-container" data-toggle="modal" data-target="#myModal" ><img src="${image_url}" alt="${name}" class="card-img bg-light product-image"></div>`));
    $product.append($(`<span class="product-title card-header" data-toggle="modal" data-target="#myModal">`).text(name));
    $product.append($(`<span class="product-price ${special_price == null ? '' : 'crossed'}" data-toggle="modal" data-target="#myModal">`).text(`${price} hrn`));
    if (special_price != null) {
        $product.append($(`<span class = "product-special-price" data-toggle="modal" data-target="#myModal">`).text(`${special_price} hrn`));
    }
    $product.append($(`<button class="btn buy" data-product-id="${id}">`).text("Buy"));

    return $product;
};

module.exports = _makeHtml;