console.log("arquivo testRoutes carregado")
const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Rota protegida acessada com sucesso",
    userId: req.userId,
    role: req.userRole
  })
})

module.exports = router