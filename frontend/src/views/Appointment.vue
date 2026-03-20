<template>
  <div class="card">
    <h2 class="title">Novo Agendamento</h2>

    <div class="form-group">
      <input v-model="date" class="input" type="date" />
    </div>

    <div class="form-group">
      <input v-model="time" class="input" type="time" />
    </div>

    <div class="form-group">
      <input v-model="doctor" class="input" placeholder="Médico" />
    </div>

    <div class="form-group">
      <input v-model="cep" class="input" placeholder="CEP" />
    </div>

    <div class="form-group">
      <input v-model="address" class="input" placeholder="Endereço" readonly />
    </div>

    <button class="button" @click="createAppointment">Agendar</button>

    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
import api from "../services/api"
import axios from "axios"

export default {
  data() {
    return {
      date: "",
      time: "",
      doctor: "",
      cep: "",
      address: "",
      message: ""
    }
  },

  methods: {
    async buscarCep() {
      try {
        if (!this.cep || this.cep.length < 8) return

        const response = await axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)

        if (response.data.erro) {
          this.address = ""
          this.message = "CEP inválido"
          return
        }

        this.address = `${response.data.localidade} - ${response.data.uf}`
        this.message = ""
      } catch (error) {
        this.address = ""
        this.message = "Erro ao buscar CEP"
      }
    },

    async createAppointment() {
      try {
        if (!this.date || !this.time || !this.doctor || !this.cep || !this.address) {
          this.message = "Preencha todos os campos"
          return
        }

        await api.post("/appointments", {
          date: this.date,
          time: this.time,
          doctor: this.doctor,
          cep: this.cep,
          address: this.address
        })

        this.message = "Consulta agendada com sucesso"
        this.date = ""
        this.time = ""
        this.doctor = ""
        this.cep = ""
        this.address = ""
      } catch (error) {
        this.message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Erro ao agendar"
      }
    }
  },

  watch: {
    cep(newValue) {
      const cepLimpo = newValue.replace(/\D/g, "")
      if (cepLimpo.length === 8) {
        this.cep = cepLimpo
        this.buscarCep()
      }
    }
  }
}
</script>