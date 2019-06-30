<template>
    <v-container>
        <Title :title="name"/>
        <EventsBySportTable v-if="!isAdmin" :events="matchingEvents"/>
        <AdminEventsBySportTable v-if="isAdmin" :events="matchingEvents"/>
    </v-container>
</template>

<script>
    import Title from '@/components/public/Title.vue'
    import EventsBySportTable from '@/components/tables/EventsBySportTable.vue'
    import AdminEventsBySportTable from '@/components/tables/AdminEventsBySportTable.vue'
    import sportService from '../../api/services/sport-service';

    export default {
        name: 'EventsPage',
        props:{
            id: Number,
            events: Array,
            openEvents: Array,
            closedEvents: Array,
            isAdmin: Boolean
        },
        data(){
            return {
                name: null
            }
        },
        components:{
            Title,
            AdminEventsBySportTable,
            EventsBySportTable
        },
        computed: {
            matchingEvents: function(){
                let events = [];
                events = this.events.filter( event => event.sport.id === this.id);
                return events;
            },
            // matchingClosedEvents: function(){
            //     let events = [];
            //     if (!this.openEvents) {
            //         events = this.openEvents.filter( event => event.sport.id === this.id);
            //     }
            //     return events;
            // }
        },
        mounted: function(){
            sportService.getSportById(this.id)
                .then((response) => {
                    this.name = response.name;
                }).catch((error) => {
                this.displayErrorMessage('Sport', error.message);
            });
        }
    }
</script>
