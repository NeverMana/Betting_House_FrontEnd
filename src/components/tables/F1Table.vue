<template>
    <v-container>
    <v-data-table
      :headers="fields"
      :items="events"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr v-on:click="goTo('/formula1',props.item.id)">
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
                { value: 'track', text: 'Pista', sortable: true, align: 'left', width: '34%' },
                { value: 'favourite', text: 'Favorito', sortable: true, align: 'center', width: '33%' },
                { value: 'challenger', text: 'Desafiante', sortable: true, align: 'center', width: '33%' },
            ]
        }
    },
  methods:{
    goTo: function(path, id){
        this.$router.push({ name:'Formula 1 Profile', params: {id}})
    }
  }
}
</script>
