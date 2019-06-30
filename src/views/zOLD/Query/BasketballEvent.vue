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
                    id: "A4",
                    type: "Basketball",
                    homeTeam: "Golden State Warriors",
                    homeOdd: 1.1,
                    awayTeam: "Philadelphia 76ers",
                    awayOdd: 1.9
                },
                {
                    id: "A5",
                    type: "Basketball",
                    homeTeam: "Los Angeles Lakers",
                    homeOdd: 1.3,
                    awayTeam: "Houston Rockets",
                    awayOdd: 1.7
                }
            ]
        }
    },
    computed:{
        event: function(){
            return this.events.find( p => p.id === this.id)
        }
    },
    mounted: function () {
        //get event by eventid
    }
}
</script>
