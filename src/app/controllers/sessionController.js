const User = require("../models/user")
const crypto = require("crypto")
const mailer = require("../../utils/mailer")
const {hash} = require("bcryptjs")

module.exports = {
    loginForm(req, res) {
        return res.render("session/index")
    },
    login(req, res) {
        req.session.userId = req.user.id
        return res.redirect("/users")
    },
    logout(req, res) {
        req.session.destroy()
        return res.redirect("/")
    },
    forgotForm(req, res) {
        return res.render("session/forgot-password")
    },
    async forgot(req, res) {
        try {
            const user = req.user
            const token = crypto.randomBytes(20).toString("hex")
            let now = new Date()
            now = now.setHours(now.getHours() + 1)
            await User.update(user.id, {reset_token: token, reset_token_expires: now})
            await mailer.sendMail({
                to: user.email, 
                from:"no-reply@launchstore.com.br", 
                subject: "Recuperação de senha", 
                html: `<h2>Recuperar Senha</h2>
                    <p>Clique no link a seguir para redefinir a senha.</p>
                    <p><a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">REDEFINIR</a></p>`
            })
            return res.render("session/index", {success: "E-mail enviado!"})
        } catch (err) {
            console.log(err)
            return res.render("session/forgot-password", {error: "Erro. Tente novamente mais tarde."})
        }
    },
    resetForm(req, res) {
        return res.render("session/password-reset", {token: req.query.token})
    },
    async reset(req, res) {
        const {password, token} = req.body
        try {
            const newPassword = await hash(password, 8)
            const user = req.user
            await User.update (user.id, {password: newPassword, reset_token: "", reset_token_expires: ""})
            return res.render("session/index", {success: "Senha atualizada!"})
        } catch (err) {
            console.log(err)
            return res.render("session/password-reset", {user: req.body, token, error: "Erro. Tente novamente mais tarde."})
        }
    }
}