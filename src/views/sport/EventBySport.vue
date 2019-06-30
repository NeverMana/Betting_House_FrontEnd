<template>
    <v-container>
        <v-container>
            <EventsPage :id="Number(id)" :events="events"/>
        </v-container>
    </v-container>
</template>
<script>
    import EventsPage from "../../components/public/EventsPage";
    import eventService from '../../api/services/event-service';

    export default {
        name: "EventBySport",
        props: {
            id: String
        },
        components: {
            EventsPage
        },
        data() {
            return {
                events: []
            }
        },
        mounted: function () {
            console.log(this.id);
            eventService.getEventsBySportId(this.id)
                .then((eventsResponse) => {
                    this.events = eventsResponse;
                })
                .catch((error) => {
                    this.displayErrorMessage('Event', error.message);
                });
        }
    }
</script>

<style scoped>

</style>