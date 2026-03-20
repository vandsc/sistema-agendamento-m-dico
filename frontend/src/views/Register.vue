<template>
  <div class="card">
    <h2 class="title">Cadastro</h2>

    <div class="form-group">
      <input v-model="name" class="input" placeholder="Nome" />
    </div>

    <div class="form-group">
      <input v-model="email" class="input" placeholder="Email" />
    </div>

    <div class="form-group">
      <input v-model="password" class="input" type="password" placeholder="Senha" />
    </div>

    <button class="button" @click="register">Cadastrar</button>

    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
import api from "../services/api"

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      message: ""
    }
  },
  methods: {
    async register() {
      try {
        await api.post("/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })

        this.message = "Cadastro realizado com sucesso"
        this.$router.push("/login")
      } catch (error) {
        this.message = error.response?.data?.message || "Erro ao cadastrar"
      }
    }
  }
}
</script>