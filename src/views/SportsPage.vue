<template>
    <v-container>
        <Title :title="name"/>
        <SportsTable :events="matchingEvents"/>
    </v-container>
</template>

<script>
import Title from '@/components/public/Title.vue'
import SportsTable from '@/components/tables/SportsTable.vue'
import httpService from '../api/http/http-service';
export default {
    props:{
        id: Number,
        events: Array
    },
    data(){
        return {
            name: null
        }  
    },
    methods: {
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
        }
    },
    components:{
        Title,
        SportsTable
    },
    computed: {
        matchingEvents: function(){
            return this.events.filter( event => event.sport.id === this.id);
        }
    },
    mounted: function(){
        httpService.get('sports/' + this.id).then((response) => {
            this.name = response.name;
        }).catch((error) => {
            this.displayErrorMessage(error.message);
        });
    }
}
</script>
