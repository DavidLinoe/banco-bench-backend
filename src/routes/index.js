const express = require("express")
const { LoginRouter } = require("./LoginRouter")
const { RegisterRouter } = require("./RegisterRouter")
const indexRouter = express.Router()

indexRouter.use(LoginRouter)
indexRouter.use(RegisterRouter)

module.exports = indexRouter