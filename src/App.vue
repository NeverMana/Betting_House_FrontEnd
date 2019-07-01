<template>
  <v-app>
    <v-content style="margin-bottom: 40px">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
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

  .v-input--selection-controls__ripple .accent--text {
    color: #1976d2 !important;
  }

  .accent--text {
    color: #1976d2 !important;
  }

  .theme--light.v-label {
    color: #000 !important;
  }
  
</style>
