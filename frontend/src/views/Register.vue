<template>
  <div class="container">
    <h2>Cadastro</h2>

    <form @submit.prevent="register">
      <input v-model="name" placeholder="Nome" />
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Senha" />

      <button type="submit">Cadastrar</button>
    </form>

    <p>{{ message }}</p>
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
        const response = await api.post("/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })

        console.log(response.data)

        this.message = "Cadastro realizado com sucesso"
        this.$router.push("/login")
      } catch (error) {
        console.log(error.response?.data)
        this.message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Erro ao cadastrar"
      }
    }
  }
}
</script>

<style>
.container {
  max-width: 400px;
  margin: auto;
}

input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
}

button {
  padding: 10px;
}
</style>