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
    console.log(error.response?.data || error)
    this.message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Erro ao cadastrar"
  }
}