<template>
  <v-container>
    <div class="display-1">Football</div>
    <v-divider class="my-3"></v-divider>
    <v-data-table
      :headers="fields"
      :items="events"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr v-on:click="goTo('/event',props.item.id)">
          <td v-for="field in fields" :key="field.value">
            <div v-if="field.value=='awayTeam'" class="right text-truncate">
              {{ props.item[field.value] }}
            </div>
            <div v-else class="text-truncate">
              {{ props.item[field.value] }}
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>

  </v-container>
</template>

<script>
export default {
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
      ]
    }
  },
  methods:{
    goTo: function(path, id){
      this.$router.push(path + '/' + id)
    }
  },
  mounted() {
    
  }
  
}
</script>