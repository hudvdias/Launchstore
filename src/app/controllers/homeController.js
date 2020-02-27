const loadProductsServices = require("../services/loadProductsService")

module.exports = {
    async index(req, res) {
        try {
            const allProducts = await loadProductsServices.load("products")
            const filteredProducts = allProducts.filter((product, index) => index > 2 ? false : true)
            return res.render("home/index", {products: filteredProducts})
        } catch (err) {
            console.error(err)
        }
    }
}