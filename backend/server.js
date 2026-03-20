require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const authRoutes = require("./routes/authRoutes")
const appointmentRoutes = require("./routes/appointmentRoutes")

const app = express()

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())

connectDB()

app.use("/api/auth", authRoutes)
app.use("/api/appointments", appointmentRoutes)

app.get("/", (req, res) => {
  res.send("API da clínica funcionando")
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})