const express = require("express")
const { LoginRouter } = require("./LoginRouter")
const { RegisterRouter } = require("./RegisterRouter")
const { UserRouter } = require("./UserRouter")
const { VerificarChaveRouter } = require("./VerificarChaveRouter")
const { BalanceRouter } = require("./BalanceRouter")
const { PerfilRouter } = require("./PerfilRouter")
const { RecuperarRouter } = require("./RecuperarRouter")

const indexRouter = express.Router()

indexRouter.use(LoginRouter)
indexRouter.use(RegisterRouter)
indexRouter.use(UserRouter)
indexRouter.use(VerificarChaveRouter)
indexRouter.use(BalanceRouter)
indexRouter.use(PerfilRouter)
indexRouter.use(RecuperarRouter)

module.exports = indexRouter