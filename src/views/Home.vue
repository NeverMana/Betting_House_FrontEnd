<template>
  <v-container>
    <v-container v-for="item in sports" :key="item.id">
      <Sport :id="item.id"/>
    </v-container>
  </v-container>
</template>

<script>

import Sport from '@/views/SportsPage.vue'
import httpService from '@/api/http/http-service';

export default {
  components:{
    Sport
  },
  data () {
    return { 
      sports:[]
    }
  },
  methods:{
    goTo: function(path, id){
      this.$router.push(path + '/' + id)
    },
    displayErrorMessage: function (error) {
      this.$toast.error({
          title: error.title,
          message: error.message
      });
    },
  },
  mounted: function () {
    httpService.get('sports/all').then((response) => {
        response.forEach(sport => {
          this.sports.push({id: sport.id, text: sport.name});
        });
        this.sports = response;
    }).catch((error) => {
        this.displayErrorMessage({title: 'Sport', error: error.message});
    });

  }
}
</script>