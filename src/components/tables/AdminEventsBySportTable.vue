<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container>
        <v-data-table
                :headers="fields"
                :items="items"
                class="elevation-1"
        >
            <template v-slot:items="props">
                <tr>
                    <td v-for="field in fields" :key="field.value">
                        <v-layout class="text-truncate" @click="openCloseEventModal(props.item)">
                            <span v-if="field.value !== 'status'">
                                {{ props.item[field.value] }}
                            </span>
                            <span v-if="field.value === 'status'" style="margin-top: 0">
                                {{props.item['event'].open ? 'Open' : 'Closed'}}
                            </span>
                        </v-layout>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <div v-if="event">
            <CloseEventModal :event="event" :visible="showCloseEventModal" @close="showCloseEventModal = false" @eventClosed="closeEvent"></CloseEventModal>
        </div>
    </v-container>
</template>

<script>
    import eventService from "../../api/services/event-service";
    import CloseEventModal from "../../views/event/modals/CloseEventModal";
    import * as _ from 'lodash'

    export default {
        name: 'AdminEventsBySportTable',
        components: {CloseEventModal},
        props: {
            events: Array
        },
        data () {
            return {
                fields: [],
                items: [],
                event: null,
                showCloseEventModal: false,
                close: false
            }
        },
        mounted: function () {
            if (this.events) {
                this.listEvents();
            }
        },
        watch: {
            events: function () {
                this.listEvents();
            }
        },
        methods:{
            closeEvent(eventId) {
                const itemIndex = _.findIndex(this.items, (item) => {
                    return item.event.id === eventId;
                });
                this.items[itemIndex].event.open = false;
            },
            openCloseEventModal: function (item) {
                if (item.event.open) {
                    this.event = item.event;
                    this.showCloseEventModal = true;
                } else {
                    this.displayErrorMessage('Event', 'Event already closed');
                }
            },
            listEvents: function () {
                this.events.forEach(event => {
                    eventService.getEventOdds(event)
                        .then((odds) => {
                            const teamsSize = odds.filter(odd => odd.team != null);
                            this.fields = this.fillDatatableHeader(teamsSize, odds);
                            this.items = this.fillDatatableItems(teamsSize, odds, event);
                        })
                        .catch(error => {
                            this.displayErrorMessage('Sport', error.message);
                        });
                });
            },
            goTo: function(path, id){
                this.$router.push({ name: 'Events Profile', params: {id}})
            },
            fillDatatableHeader: function (teamsSize, odds) {
                const header = [];
                if (teamsSize.length === 2) {
                    header.push({text: 'Home Team', sortable: true, value: 'homeTeam'});
                    header.push({text: '1', sortable: false, value: 'oddHome'});
                    if (odds.length === 3) {
                        header.push({text: 'X', sortable: false, value: 'oddDraw'});
                    }
                    header.push({text: '2', sortable: false, value: 'oddAway'});
                    header.push({text: 'Away Team', sortable: true, value: 'awayTeam'});
                    header.push({text: 'Status', sortable: false, value: 'status'});
                } else {
                    header.push({text: 'Event', value: 'information'});
                    header.push({text: 'Status', sortable: false, value: 'status'});
                }
                return header;
            },
            fillDatatableItems: function (teamsSize, odds, event) {
                const itemsInfo = [];
                if (teamsSize.length === 2) {
                    if (odds.length === 3) {
                        itemsInfo.push({
                            homeTeam: odds[0].team ? odds[0].team.name : odds[1].team.name,
                            oddHome: odds[0].team ? odds[0].odd : odds[1].odd,
                            oddDraw: odds[0].team ? (odds[1].team ? odds[2].odd : odds[1].odd) : odds[0].odd,
                            oddAway: odds[2].team ? odds[2].odd : odds[1].odd,
                            awayTeam: odds[2].team ? odds[2].team.name : odds[1].team.name,
                            event: event
                        });
                    } else {
                        itemsInfo.push({
                            homeTeam: odds[0].team.name,
                            oddHome: odds[0].odd,
                            oddAway: odds[1].odd,
                            awayTeam: odds[1].team.name,
                            event: event
                        });
                    }
                } else {
                    this.events.forEach(event => {
                        itemsInfo.push(
                            {
                                information: event.information,
                                event: event
                            }
                        );
                    });
                }
                return itemsInfo;
            },
        }
    }
</script>
