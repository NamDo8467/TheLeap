const express = require("express")
const route = express.Router()
const { loginController, registerController, logoutController } = require("../controllers/controller")

route.post("/register", registerController)
route.post("/login", loginController)

route.post("/logout", logoutController)
module.exports.router = route
