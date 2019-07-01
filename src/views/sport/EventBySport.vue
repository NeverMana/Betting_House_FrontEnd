<template>
    <v-container>
        <NavBar></NavBar>
        <v-container>
            <EventsPage :id="Number(id)" :events="events"/>
        </v-container>
    </v-container>
</template>
<script>
    import EventsPage from "../../components/public/EventsPage";
    import eventService from '../../api/services/event-service';
    import NavBar from "../../components/public/NavBar";

    export default {
        name: "EventBySport",
        props: {
            id: String
        },
        components: {
            NavBar,
            EventsPage
        },
        data() {
            return {
                events: []
            }
        },
        watch: {
            id: function () {
                this.getEventsBySport();
            }
        },
        mounted: function () {
            this.getEventsBySport();
        },
        methods: {
            getEventsBySport: function () {
                eventService.getEventsBySportId(this.id)
                    .then((eventsResponse) => {
                        this.events = eventsResponse;
                    })
                    .catch((error) => {
                        this.displayErrorMessage('Event', error.message);
                    });
            }
        }
    }
</script>

<style scoped>

</style>