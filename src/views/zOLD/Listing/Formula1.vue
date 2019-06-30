<template>
  <v-container>
    <Title title="Formula 1"/>
    <F1Table :events="events"/>
  </v-container>
</template>

<script>
import F1Table from '@/components/tables/F1Table.vue'
import Title from '@/components/public/Title.vue'
export default {
    components:{
        F1Table,
        Title
    },
    data () {
        return { 
            fields: [
                { value: 'track', text: 'Pista', sortable: true, align: 'left', width: '34%' },
                { value: 'favourite', text: 'Favorito', sortable: true, align: 'center', width: '33%' },
                { value: 'challenger', text: 'Desafiante', sortable: true, align: 'center', width: '33%' },
            ],
            events: [
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
                    favourite: "Valtteri Bottas",
                    challenger: "Max Verstappen"
                },
                {
                    id: "A8",
                    type: "Formula1",
                    track: "Shanghai International Circuit",
                    favourite: "Lewis Hamilton",
                    challenger: "Max Verstappen"
                }
            ]
        }
    }
}
</script>