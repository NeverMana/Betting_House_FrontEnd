<template>
  <v-container>
    <Title title="Football"/>
    <FootballTable :events="events"/>
  </v-container>
</template>

<script>
import FootballTable from '@/components/_home/FootballTable.vue'
import Title from '@/components/_public/Title.vue'
export default {
    components:{
        FootballTable,
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
                }
            ]
        }
    }
}
</script>