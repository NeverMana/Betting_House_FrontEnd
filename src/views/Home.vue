<template>
  <v-container>
    <Title title="Football"/>
    <FootballTable :events="footballEvents"/>
    <Title title="Basketball"/>
    <BasketballTable :events="basketballEvents"/>
    <Title title="Formula 1"/>
    <F1Table :events="f1Events"/>
  </v-container>
</template>

<script>

import FootballTable from '@/components/tables/FootballTable.vue'
import BasketballTable from '@/components/tables/BasketballTable.vue'
import F1Table from '@/components/tables/F1Table.vue'
import Title from '@/components/public/Title.vue'

export default {
  components:{
    FootballTable,
    BasketballTable,
    F1Table,
    Title
  },
  data () {
    return { 
      fields: [
        { value: 'homeTeam', text: 'Home Team', sortable: true, width: '35%' },
        { value: 'homeOdd', text: 'Odd', sortable: true, width: '10%' },
        { value: 'tie', text: 'Tie', sortable: true, width: '10%' },
        { value: 'awayOdd', text: 'Odd', sortable: true, width: '10%' },
        { value: 'awayTeam', text: 'Away Team', sortable: true, align: 'right', width: '35%' }
      ],
      events: [
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
        },
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
        },
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
      ]
    }
  },
  computed: {
    footballEvents: function(){
      return this.events.filter( p => p.type=='Football')
    },
    basketballEvents: function(){
      return this.events.filter( p => p.type=='Basketball')
    },
    f1Events: function(){
      return this.events.filter( p => p.type=='Formula1')
    },
  },
  methods:{
    goTo: function(path, id){
      this.$router.push(path + '/' + id)
    }
  },
  mounted:{
    //get list of all events
  }
}
</script>