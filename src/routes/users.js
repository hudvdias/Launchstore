const express = require("express")
const routes = express.Router()
const sessionController = require("../app/controllers/sessionController")
const userController = require("../app/controllers/userController")
const orderController = require("../app/controllers/orderController")
const userValidator = require("../app/validators/user")
const sessionValidator = require("../app/validators/session")
const {onlyUsers, ifLogged} = require("../app/middlewares/session")

// login/logout
routes.get("/login", ifLogged, sessionController.loginForm)
routes.post("/login", sessionValidator.login, sessionController.login)
routes.post("/logout", sessionController.logout)

// reset password
routes.get("/forgot-password", sessionController.forgotForm) // forgot password page
routes.get("/password-reset", sessionController.resetForm) // change password page
routes.post("/forgot-password", sessionValidator.forgot, sessionController.forgot) // Send email with token
routes.post("/password-reset", sessionValidator.reset, sessionController.reset) // change password in database

// user register
routes.get("/register", ifLogged, userController.register)
routes.post("/register", userValidator.post, userController.post)

// user update and delete
routes.get("/", onlyUsers, userValidator.show, userController.show)
routes.put("/", userValidator.update, userController.update)
routes.delete("/", userController.delete)

// user ads list
routes.get("/ads", userController.ads)

// orders
routes.post("/orders", onlyUsers, orderController.post)

module.exports = routes