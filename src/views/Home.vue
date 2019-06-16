<template>
  <v-container>
    <v-container v-for="item in sports" :key="item.id">
      <SportsPage :id="item.id" :events="events"/>
    </v-container>
  </v-container>
</template>

<script>

import httpService from "../api/http/http-service";
import SportsPage from "./SportsPage";

export default {
  components: {
    SportsPage
  },
  data () {
    return {
      events: [],
      sports: []
    }
  },
  computed: {
    footballEvents: function(){
      return this.events.filter( p => p.type === 'Football')
    },
    basketballEvents: function(){
      return this.events.filter( p => p.type === 'Basketball')
    },
    f1Events: function(){
      return this.events.filter( p => p.type === 'Formula1')
    },
  },
  methods:{
    goTo: function(path, id){
      this.$router.push(path + '/' + id)
    },
    displaySuccessMessage: function (message) {
      this.$toast.success({
        title: 'Event',
        message: message
      });
    },
    displayErrorMessage: function (message) {
      this.$toast.error({
        title: 'Event',
        message: message
      });
    },
  },
  mounted: function () {
    httpService.get('sports/all')
            .then(response => {
              this.sports = response;
            })
            .catch(error => {
              this.displayErrorMessage(error.message);
            });
    httpService.get('events/find-all-open-events')
            .then((eventsResponse) => {
              this.events = eventsResponse;
            })
            .catch((error) => {
              this.displayErrorMessage(error.message);
            });
  }
}
</script>