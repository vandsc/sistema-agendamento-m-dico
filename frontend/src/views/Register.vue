<template>
  <div>
    <h2>Cadastro</h2>

    <input v-model="name" placeholder="Nome" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Senha" />

    <button @click="register">Cadastrar</button>

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
        await api.post("/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })

        this.message = "Cadastro realizado com sucesso"
        this.$router.push("/login")
      } catch (error) {
        console.error(error)
        this.message = "Erro ao cadastrar"
      }
    }
  }
}
</script>