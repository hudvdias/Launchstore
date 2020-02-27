const express = require("express")
const routes = express.Router()

const productsController = require("../app/controllers/productsController")
const searchController = require("../app/controllers/searchController")
const multer = require("../app/middlewares/multer")
const {onlyUsers} = require("../app/middlewares/session")
const validator = require("../app/validators/product")

// Search
routes.get("/search", searchController.index)

//Products
routes.get("/create", onlyUsers, productsController.create)
routes.get("/:id", productsController.show)
routes.get("/:id/edit", onlyUsers, productsController.edit)

routes.post("/", onlyUsers, multer.array("images", 6), validator.post, productsController.post)
routes.put("/", onlyUsers, multer.array("images", 6), validator.put, productsController.put)
routes.delete("/", onlyUsers, productsController.delete)

module.exports = routes