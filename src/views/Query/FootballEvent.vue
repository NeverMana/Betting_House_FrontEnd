<template>
    <v-container>
        <Title :title='event.homeTeam + " vs " + event.awayTeam'/>
        <v-container>
            <v-layout row wrap>
                <v-flex xs6>
                    <v-card>
                        <v-card-title> <h3>{{event.homeTeam}}</h3> </v-card-title>
                        <v-card-text><!--Informações --></v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs6>
                    <v-card>
                        <v-card-title> <h3>{{event.awayTeam}}</h3> </v-card-title>
                        <v-card-text><!--Informações --></v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
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
