<template>
    <v-container>
        <Title :title='event.track'/>
        <v-card>
            <v-card-text>
                <v-item-group v-model="selectedPilot">
                    <v-layout align-start row wrap v-for="item in pilots" :key="item.name">
                        <v-btn block>  {{ item.name + " | ODD : " + item.odd}}  </v-btn>
                    </v-layout>
                </v-item-group>
                </v-card-text>
        </v-card>
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
                    id: "A6",
                    type: "Formula1",
                    track: "Albert Park Circuit",
                    favourite: "Lewis Hamilton",
                    challenger: "Valtteri Bottas"
                },
                {
                    id: "A7",
                    type: "Formula1",
                    track: "Bahrain International Circuit",
                    favourite: "Lewis Hamilton",
                    challenger: "Max Verstappen"
                },
                {
                    id: "A8",
                    type: "Formula1",
                    track: "Shanghai International Circuit",
                    favourite: "Valtteri Bottas",
                    challenger: "Max Verstappen"
                }
            ],
            pilots: [
                {
                    name: 'Lewis Hamilton',
                    odd: 1.1 
                },
                {
                    name: 'Valtteri Bottas',
                    odd: 1.2
                }, 
                {
                    name: 'Sebastian Vettel',
                    odd: 1.3
                },
                {
                    name: 'Max Verstappen',
                    odd: 1.4 
                }, 
                
                {
                    name: 'Charles Leclerc',
                    odd: 1.4 
                }, 
                {
                    name: 'Pierre Gasly',
                    odd: 1.5 
                }, 
                {
                    name: 'Carlos Sainz',
                    odd: 1.6 
                }, 
                {
                    name: 'Daniel Ricciardo',
                    odd: 1.7 
                }, 
                {
                    name: 'Kevin Magnussen',
                    odd: 1.8 
                }, 
                {
                    name: 'Sergio Perez',
                    odd: 2 
                }, 
                {
                    name: 'Kimi Räikkönen',
                    odd: 2.5 
                }, 
                {
                    name: 'Lando Norris',
                    odd: 3 
                }, 
                {
                    name: 'Nico Hulkenberg',
                    odd: 3 
                }, 
                {
                    name: 'Daniil Kvyat',
                    odd: 3.5 
                }, 
                {
                    name: 'Alexander Albon',
                    odd: 3.5 
                }, 
                {
                    name: 'Lance Stroll',
                    odd: 4 
                }, 
                {
                    name: 'Romain Grosjean',
                    odd: 4 
                }, 
                
                {
                    name: 'Antonio Giovinazzi',
                    odd: 5 
                }, 
                {
                    name: 'George Russell',
                    odd: 6 
                }, 
                {
                    name: 'Robert Kubica',
                    odd: 6.5 
                }
            ]
        }
    },
    computed:{
        event: function(){
            return this.events.find( p => p.id === this.id)
        },
        pilotoAposta: function(selectedPilot){
            return selectedPilot.name
        }
    },
    mounted: function () {
        //get event by eventid
        //get pilotos f1 e odds de ganhar a pista
    }
}
</script>

