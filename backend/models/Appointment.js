const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    doctor: {
      type: String,
      required: true
    },
    cep: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "scheduled"
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Appointment", appointmentSchema)