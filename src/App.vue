<template>
  <v-app>
    <NavBar v-if="!((this.$route.name === 'Login') || this.$route.name === 'Register')" />
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from './components/public/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

  div.toast-title {
    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,
    Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif !important;
  }
  
  div.toast-message {
    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,
    Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif !important;
  }
  
</style>
