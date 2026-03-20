<template>
  <nav class="navbar">
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Cadastro</router-link>
    <router-link to="/appointments">Agendar</router-link>
    <router-link to="/dashboard">Painel</router-link>

    <button class="logout" @click="logout">Sair</button>
  </nav>

  <router-view />
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token")
      this.$router.push("/login")
    }
  }
}
</script>

<style>
.navbar {
  display: flex;
  justify-content: center;
  gap: 25px;
  padding: 15px;
  background: #2c3e50;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.navbar a:hover {
  color: #1abc9c;
}

.logout {
  margin-left: 20px;
  background: #e74c3c;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
</style>