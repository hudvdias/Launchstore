const Product = require("../models/product")
const {formatPrice, date} = require("../../utils/lib")

async function getImages(productId) {
    let files = await Product.files(productId)
    files = files.map(file => ({...file, src: `${file.path.replace("public", "")}`}))
    return files
}

async function formatProduct(product) {
    const files = await getImages(product.id)
    product.img = files[0].src
    product.files = files
    product.formattedOldPrice = formatPrice(product.old_price)
    product.formattedPrice = formatPrice(product.price)
    const {year, month, day, hour, minutes} = date(product.updated_at)
    product.published = `${day}/${month}/${year} às ${hour}h${minutes}`
    return product
}

const LoadServices = {
    load(service, filter) {
        this.filter = filter
        return this[service]()
    },
    async product(){
        try {
            const product = await Product.findOne(this.filter)
            return formatProduct(product)
        } catch (error) {
            console.error(error)
        }
    },
    async products() {
        try {
            const products = await Product.findAll(this.filter)
            const productsPromise = products.map(formatProduct)
            return Promise.all(productsPromise)
        } catch (error) {
            console.error(error)
        }
    },
    formatProduct
}

module.exports = LoadServices