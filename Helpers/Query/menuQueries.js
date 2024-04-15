const { findFilteredMenuItems } = require("../../Modals/Methods/menuMethodQueries")

exports.menuFilterOptions = async (req) => {
    const {page,limits,sortBy, order, minPrice,maxPrice,category,search } = req.query
    const products = await findFilteredMenuItems(page, limits, sortBy, order, minPrice, maxPrice,category,search)
    return products
}