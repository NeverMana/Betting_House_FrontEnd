<template>
    <v-container>
        <Title :title="name"/>
        <SportsTable :sport="name" :events="matchingEvents"/>
    </v-container>
</template>

<script>
import Title from '@/components/public/Title.vue'
import SportsTable from '@/components/tables/SportsTable.vue'
import httpService from '../api/http/http-service';
export default {
    props:{
        id: String
    },
    data(){
        return {
            events: null,
            name: null
        }  
    },
    components:{
        Title,
        SportsTable
    },
    computed: {
        matchingEvents: function(){
            return this.events.filter( p => p.type === this.name)
        }
    },
    mounted: function(){
        httpService.get('events/all').then((response) => {
            response.forEach(event => {
                this.events.push({event});
            });
            this.events = response;
        }).catch((error) => {
            this.displayErrorMessage({title: 'Sport', error: error.message});
        });
        httpService.get('sports/' + this.id).then((response) => {
            this.name = response.name;
        }).catch((error) => {
            this.displayErrorMessage({title: 'Sport', error: error.message});
        });
    }
}
</script>
