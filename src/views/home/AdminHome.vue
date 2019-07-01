<template>
    <v-container>
        <NavBar></NavBar>
        <v-container v-for="item in sports" :key="item.id">
            <EventsPage :id="item.id" :events="events" :isAdmin="true"/>
        </v-container>
    </v-container>
</template>

<script>
    import EventsPage from "../../components/public/EventsPage";
    import eventService from '../../api/services/event-service'
    import sportService from '../../api/services/sport-service';
    import NavBar from "../../components/public/NavBar";

    export default {
        name: "AdminHome",
        components: {
            NavBar,
            EventsPage
        },
        data() {
            return {
                events: [],
                openEvents: [],
                closedEvents: [],
                sports: []
            }
        },
        mounted: function () {
            sportService.getAllSports()
                .then(response => {
                    this.sports = response;
                })
                .catch(error => {
                    this.displayErrorMessage('Event', error.message);
                });
            eventService.getAllOpenEvents()
                .then((events) => {
                    this.events = events;
                    // this.openEvents = events.filter(event => event.open === true);
                    // this.closedEvents = events.filter(event => event.open === false);
                })
                .catch((error) => {
                    this.displayErrorMessage('Event', error.message);
                });
        }
    }
</script>

<style scoped>

</style>