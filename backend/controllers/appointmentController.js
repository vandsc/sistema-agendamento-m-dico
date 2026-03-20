const Appointment = require("../models/Appointment")

exports.createAppointment = async (req, res) => {
  try {
    const { date, time, doctor, cep, address } = req.body

    if (!date || !time || !doctor || !cep || !address) {
      return res.status(400).json({
        message: "Preencha todos os campos do agendamento"
      })
    }

    const appointmentExists = await Appointment.findOne({
      date,
      time,
      doctor
    })

    if (appointmentExists) {
      return res.status(400).json({
        message: "Já existe uma consulta agendada para esse médico nesse dia e horário"
      })
    }

    const appointment = await Appointment.create({
      user: req.userId,
      date,
      time,
      doctor,
      cep,
      address
    })

    res.status(201).json(appointment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.userId })
      .populate("user", "name email")
      .sort({ createdAt: -1 })

    res.status(200).json(appointments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params

    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, user: req.userId },
      req.body,
      { new: true }
    )

    if (!appointment) {
      return res.status(404).json({ message: "Agendamento não encontrado" })
    }

    res.status(200).json(appointment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params

    const appointment = await Appointment.findOneAndDelete({
      _id: id,
      user: req.userId
    })

    if (!appointment) {
      return res.status(404).json({ message: "Agendamento não encontrado" })
    }

    res.status(200).json({ message: "Agendamento cancelado com sucesso" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}