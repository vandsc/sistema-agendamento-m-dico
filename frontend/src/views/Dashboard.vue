<template>
  <div class="container">
    <h1>Dashboard</h1>

    <div v-if="appointments.length === 0" class="empty">
      Nenhum agendamento encontrado.
    </div>

    <div
      v-for="appointment in appointments"
      :key="appointment._id"
      class="card dashboard-card"
    >
      <div class="info">
        <p>
          <strong>Paciente:</strong>
          {{ appointment.user?.name || "Não informado" }}
        </p>

        <p>
          <strong>Data:</strong>
          {{ formatarData(appointment.date) }}
        </p>

        <p>
          <strong>Endereço:</strong>
          {{ appointment.address || "Não informado" }}
        </p>

        <p>
          <strong>Clima:</strong>
          {{ weather[appointment._id] || "Carregando..." }}
        </p>

        <p>
          <strong>Status:</strong>
          <span :class="['status', appointment.status]">
            {{ statusMap[appointment.status] || appointment.status }}
          </span>
        </p>
      </div>

      <div class="actions">
        <button
          class="complete"
          :disabled="appointment.status === 'completed'"
          @click="completeAppointment(appointment._id)"
        >
          {{ appointment.status === "completed" ? "Concluído" : "Concluir" }}
        </button>

        <button class="delete" @click="deleteAppointment(appointment._id)">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api"

export default {
  data() {
    return {
      appointments: [],
      weather: {},
      statusMap: {
        scheduled: "Agendado",
        completed: "Concluído",
        cancelled: "Cancelado"
      }
    }
  },

  methods: {
    async getAppointments() {
      try {
        const response = await api.get("/appointments")
        this.appointments = response.data

        for (const appointment of this.appointments) {
          const city = this.getCityFromAddress(appointment.address)

          if (city) {
            const clima = await this.getWeather(city)
            this.weather[appointment._id] = clima
          } else {
            this.weather[appointment._id] = "Clima indisponível"
          }
        }
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error)
      }
    },

    async deleteAppointment(id) {
      try {
        await api.delete(`/appointments/${id}`)
        this.getAppointments()
      } catch (error) {
        console.error("Erro ao cancelar agendamento:", error)
      }
    },

    async completeAppointment(id) {
      try {
        await api.put(`/appointments/${id}`, {
          status: "completed"
        })

        this.getAppointments()
      } catch (error) {
        console.error("Erro ao concluir:", error)
      }
    },

    formatarData(data) {
      if (!data) return "Não informada"

      const date = new Date(data)

      if (isNaN(date.getTime())) {
        return data
      }

      return date.toLocaleDateString("pt-BR")
    },

    getCityFromAddress(address) {
      if (!address) return ""

      const parts = address.split("-")
      return parts[0]?.trim() || ""
    },

    traduzirClima(desc) {
      const mapa = {
        Sunny: "Ensolarado",
        Clear: "Céu limpo",
        Cloudy: "Nublado",
        Overcast: "Encoberto",
        Rain: "Chuva",
        "Patchy rain possible": "Possível chuva",
        "Partly cloudy": "Parcialmente nublado",
        Mist: "Névoa",
        Fog: "Nevoeiro",
        Thunderstorm: "Tempestade",
        Snow: "Neve"
      }

      return mapa[desc] || desc
    },

    async getWeather(city) {
      try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`)
        const data = await response.json()

        const temp = data.current_condition[0].temp_C
        const desc = data.current_condition[0].weatherDesc[0].value

        return `${temp}°C - ${this.traduzirClima(desc)}`
      } catch (error) {
        return "Clima indisponível"
      }
    }
  },

  mounted() {
    this.getAppointments()
  }
}
</script>

<style scoped>
.container {
  max-width: 950px;
  margin: 50px auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #1f2937;
  font-size: 48px;
  font-weight: 700;
}

.empty {
  text-align: center;
  font-size: 18px;
  color: #6b7280;
  margin-top: 30px;
}

.dashboard-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info p {
  margin: 0;
  font-size: 18px;
  color: #111827;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.status {
  display: inline-block;
  margin-left: 8px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
}

.scheduled {
  background-color: #3498db;
  color: white;
}

.completed {
  background-color: #2ecc71;
  color: white;
}

.cancelled {
  background-color: #e74c3c;
  color: white;
}

.complete {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.complete:hover {
  opacity: 0.9;
}

.complete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.delete {
  background: linear-gradient(135deg, #ff4d4d, #c0392b);
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.delete:hover {
  opacity: 0.9;
}

@media (max-width: 700px) {
  .dashboard-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions {
    width: 100%;
    flex-direction: column;
  }

  .complete,
  .delete {
    width: 100%;
  }
}
</style>