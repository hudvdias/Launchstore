const loadProductsService = require("../services/loadProductsService")
const User = require("../models/user")
const mailer = require("../../utils/mailer")

const emailBody = function(seller, product, buyer) {
    return `<h1>Olá, ${seller.name}!</h1>
    <h2>Você tem um novo pedido de compra do seu produto!</h2>
    <p>Produto: ${product.name}</p>
    <p>Preço: ${product.formattedPrice}</p>
    <p><br><br></p>
    <h3>Dados do Comprador:</h3>
    <p>Nome: ${buyer.name}</p>
    <p>E-mail: ${buyer.email}</p>
    <p>Endereço: ${buyer.address}</p>
    <p>Cep: ${buyer.cep}</p>
    <p><br><br></p>
    <p><strong>Entre em contato com o Comprador para finalizar a sua venda!</strong></p>
    <p><br><br></p>
    <p>Atenciosamente, Equipe Launchstore.</p>`
}

module.exports = {
    async post(req, res) {
        try {
            const product = await loadProductsService.load("product", {where: {id: req.body.id}})
            const seller = await User.findOne({where: {id: product.user_id}})
            const buyer = await User.findOne({where: {id: req.session.userId}})
            await mailer.sendMail({
                to: seller.email,
                from: "no-reply@launchstore.com.br",
                subject: "Novo pedido de compra",
                html: emailBody(seller, product, buyer)
            })
            return res.render("orders/success")
        } catch (error) {
            console.log(error)
            return res.render("orders/error")
        }
    } 
}