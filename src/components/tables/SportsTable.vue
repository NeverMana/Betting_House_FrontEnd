<template>
    <v-container>
    <v-data-table
      :headers="fields"
      :items="events"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr v-on:click="goTo('/football', props.item.id)">
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
        events:Array,
        name: String
    },
    data () {
    return { 
      fields: []
    }
  },
  methods:{
    goTo: function(path, id){
      this.$router.push({ name: 'Sports Profile', params: {id}})
    }
  }
}
</script>
