let _makeCategories = ({
                     id,
                     name,
                 }) => {
    let $category = $(`<button class="btn dropdown-item py-2 category" data-category-id="${id}"></button>`).text(name);
    return $category;
};

module.exports = _makeCategories;