const express = require("express")
const { LoginRouter } = require("./LoginRouter")
const { RegisterRouter } = require("./RegisterRouter")
const { UserRouter } = require("./UserRouter")


const indexRouter = express.Router()

indexRouter.use(LoginRouter)
indexRouter.use(RegisterRouter)
indexRouter.use(UserRouter)

module.exports = indexRouter