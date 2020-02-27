const {hash} = require("bcryptjs")
const {unlinkSync} = require("fs")
const User = require("../models/user")
const Product = require("../models/product")
const {formatCpfCnpj, formatCep} = require("../../utils/lib")
const loadProductsService = require("../services/loadProductsService")


module.exports = {
    register(req, res) {
        return res.render("user/register")
    },
    async show(req, res) {
        try {
            const {user} = req
            user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
            user.cep = formatCep(user.cep)
            return res.render("user/index", {user})    
        } catch (error) {
            console.error(error)
        }
    },
    async post(req, res) {
        try {
            let {name, email, password, cpf_cnpj, cep, address} = req.body
            password = await hash(password, 8)
            cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            cep = cep.replace(/\D/g, "")
            const userId = await User.create({name, email, password, cpf_cnpj, cep, address})
            req.session.userId = userId
            return res.redirect("/users")    
        } catch (error) {
            console.error(error)
        }
    },
    async update(req, res) {
        try {
            let {user} = req
            let {name, email, cpf_cnpj, cep, address} = req.body
            cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            cep = cep.replace(/\D/g, "")
            await User.update(user.id, {name, email, cpf_cnpj, cep, address})
            return res.render("user/index", {user: req.body, success: "Conta atualizada com sucesso!"})    
        } catch (err) {
            console.error(err)
            return res.render("user/index", {error: "Erro ao atualizar conta."})
        }
    },
    async delete(req, res) {
        try {
            const products = await Product.findAll({where: {user_id: req.body.id}})
            const allFilesPromise = products.map(product => Product.files(product.id))
            let promiseResults = await Promise.all(allFilesPromise)
            await User.delete(req.body.id)
            req.session.destroy()
            promiseResults.map(results => {
                results.rows.map(file => {
                    try {
                        unlinkSync(file.path)
                    } catch (error) {
                        console.error(error)
                    }
                })
            })
            return res.render("session/index", {success: "Conta deletada com sucesso."})
        } catch (err) {
            console.error(err)
            return res.render("user/index", {user: req.body, error: "Erro ao deletar conta."})
        }
    },
    async ads(req, res) {
        const products = await loadProductsService.load("products", {where: {user_id: req.session.userId}})
        return res.render("user/ads", {products})
    }
}