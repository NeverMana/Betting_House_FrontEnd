<template>
    <v-container>
        <Title :title="name"/>
        <EventsBySportTable v-if="!isAdmin" :events="matchingEvents" @betEvent="changeCoins"/>
        <AdminEventsBySportTable v-if="isAdmin" :events="matchingEvents"/>
    </v-container>
</template>

<script>
    import Title from '@/components/public/Title.vue'
    import EventsBySportTable from '@/components/tables/EventsBySportTable.vue'
    import AdminEventsBySportTable from '@/components/tables/AdminEventsBySportTable.vue'
    import sportService from '../../api/services/sport-service';
    import {environment} from "../../environment";

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
        watch: {
            id: function () {
                this.getSportById();
            }
        },
        mounted: function(){
            this.getSportById();
        },
        methods: {
            getSportById: function () {
                sportService.getSportById(this.id)
                    .then((response) => {
                        this.name = response.name;
                    }).catch((error) => {
                    this.displayErrorMessage('Sport', error.message);
                });
            },
            changeCoins: function (betValue) {
                this.$emit('changeCoins', betValue);
            }
        },
        computed: {
            matchingEvents: function() {
                let events = [];
                const user = JSON.parse(localStorage.getItem(environment.userSession));
                if (user._profile.name === 'REGULAR') {
                    events = this.events.filter( event => event.sport.id === this.id);
                    events = events.filter(event => event.restricted === false);
                } else {
                    events = this.events.filter( event => event.sport.id === this.id);
                }
                return events;
            },
            // matchingClosedEvents: function(){
            //     let events = [];
            //     if (!this.openEvents) {
            //         events = this.openEvents.filter( event => event.sport.id === this.id);
            //     }
            //     return events;
            // }
        }
    }
</script>
