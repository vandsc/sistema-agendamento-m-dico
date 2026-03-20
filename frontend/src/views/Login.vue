<template>
  <div class="card">
    <h2 class="title">Login</h2>

    <div class="form-group">
      <input v-model="email" class="input" placeholder="Email" />
    </div>

    <div class="form-group">
      <input v-model="password" class="input" type="password" placeholder="Senha" />
    </div>

    <button class="button" @click="login">Entrar</button>

    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
import api from "../services/api"

export default {
  data() {
    return {
      email: "",
      password: "",
      message: ""
    }
  },

  methods: {
    async login() {
      try {
        const response = await api.post("/auth/login", {
          email: this.email,
          password: this.password
        })

        localStorage.setItem("token", response.data.token)
        this.message = "Login realizado com sucesso"
        this.$router.push("/dashboard")
      } catch (error) {
        this.message = error.response?.data?.message || "Erro no login"
      }
    }
  },

  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.push("/dashboard")
    }
  }
}
</script>