<template>
    <v-container>
        <Title v-bind:title='this.event.homeTeam + " vs " + this.event.awayTeam'/>
        <v-card>
            <v-card-text> melone </v-card-text>
            <!--v-card-text>{{this.event.homeTeam}} vs {{this.event.awayTeam}}</v-card-text-->
        </v-card>
    </v-container>
</template>

<script>
import Title from '@/components/public/Title.vue'

export default {
    props: {
        event: {type: Object}
    },
    components: {
        Title
    }
}
</script>
