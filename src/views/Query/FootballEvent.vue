<template>
    <v-container>
        <Title :title='event.homeTeam + " vs " + event.awayTeam'/>
    </v-container>
</template>

<script>
import Title from '@/components/public/Title.vue'

export default {
    props: ['id'],
    components: {
        Title
    },
    data(){
        return {
            events:[
                {
                    id: "A1",
                    type: "Football",
                    homeTeam: "Vizela FC",
                    homeOdd: 2.5,
                    awayTeam: "Famalicao FC",
                    awayOdd: 1.5,
                    tie: 2
                },
                {
                    id: "A2",
                    type: "Football",
                    homeTeam: "FC Porto",
                    homeOdd: 1.3,
                    awayTeam: "Sporting CP",
                    awayOdd: 1.5,
                    tie: 1.4
                },
                {
                    id: "A3",
                    type: "Football",
                    homeTeam: "SL Benfica",
                    homeOdd: 1.1,
                    awayTeam: "SC Braga",
                    awayOdd: 1.9,
                    tie: 1.4
                }
            ]
        }
    },
    computed:{
        event: function(){
            return this.events.find( p => p.id==this.id)
        }
    },
    mounted:{
        //get event by eventid
    }
    
}
</script>
