<template>
    <v-container>
    <v-data-table
      :headers="fields"
      :items="events"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr v-on:click="goTo('/football',props.item.id, props.item)">
          <td v-for="field in fields" :key="field.value">
            <v-layout justify-center class="text-truncate">
              {{ props.item[field.value] }}
            </v-layout>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
    props: {
        events:{type: Array}
    },
    data () {
    return { 
      fields: [
        { value: 'homeTeam', text: 'Home Team', sortable: true, align: 'center', width: '35%' },
        { value: 'homeOdd', text: 'Odd', sortable: true, align: 'center', width: '10%' },
        { value: 'tie', text: 'Tie', sortable: true, align: 'center', width: '10%' },
        { value: 'awayOdd', text: 'Odd', sortable: true, align: 'center', width: '10%' },
        { value: 'awayTeam', text: 'Away Team', sortable: true, align: 'center', width: '35%' }
      ]
    }
  },
  methods:{
    goTo: function(path, id, item){
      this.$router.push({ path: path + '/' + id, params: {event: item }})
    }
  }
}
</script>
