<template>
    <v-container>
        <Title title="Basketball"/>
        <BasketballTable :events="events"/>
    </v-container>
</template>

<script>
import BasketballTable from '@/components/tables/BasketballTable.vue'
import Title from '@/components/public/Title.vue'
export default {
    components:{
        BasketballTable,
        Title
    },
    data () {
        return { 
            fields: [
                { value: 'homeTeam', text: 'Home Team', sortable: true, align: 'center', width: '35%' },
                { value: 'homeOdd', text: 'Odd', sortable: true, align: 'center', width: '10%' },
                { value: 'tie', text: 'Tie', sortable: true, align: 'center', width: '10%' },
                { value: 'awayOdd', text: 'Odd', sortable: true, align: 'center', width: '10%' },
                { value: 'awayTeam', text: 'Away Team', sortable: true, align: 'center', width: '35%' }
            ],
            events: [
                {
                    id: "A4",
                    type: "Basketball",
                    homeTeam: "Golden State warriors",
                    homeOdd: 1.1,
                    awayTeam: "Philadelphia 76ers",
                    awayOdd: 1.9,
                    tie: 1.4
                },
                {
                    id: "A5",
                    type: "Basketball",
                    homeTeam: "Los Angeles Lakers",
                    homeOdd: 1.3,
                    awayTeam: "Houston Rockets",
                    awayOdd: 1.7,
                    tie: 1.5
                }
            ]
        }
    },
    methods:{
        goTo: function(path, id){
            this.$router.push(path + '/' + id)
        }
    }
}
</script>
