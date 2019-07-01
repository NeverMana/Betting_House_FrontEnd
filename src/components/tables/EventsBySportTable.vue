<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container>
        <v-data-table
                :headers="fields"
                :items="items"
                class="elevation-1">
            <template v-slot:items="props">
                <tr v-on:click="openBetModal(props.item)">
                    <td v-for="field in fields" :key="field.value">
                        <v-layout class="text-truncate" v-if="field.value !== 'button'">
                            {{ props.item[field.value] }}
                        </v-layout>
                        <v-layout class="text-truncate" v-if="field.value === 'button'">
                            <v-btn color="primary">
                                {{ props.item[field.value] }}
                            </v-btn>
                        </v-layout>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <div v-if="event">
            <BetModal :event="event" :visible="showBetModal" @close="showBetModal = false" @betEvent="setEventAsBetted"/>
        </div>
    </v-container>
</template>

<script>
    import betService from "../../api/services/bet-service";
    import eventService from "../../api/services/event-service";
    import BetModal from "../../views/user/modals/BetModal";
    import {environment} from "../../environment";

    export default {
        name: 'EventsBySportTable',
        components: {BetModal},
        props: {
            events: Array
        },
        data () {
            return {
                fields: [],
                items: [],
                event: null,
                showBetModal: false,
            }
        },
        watch: {
            events: function () {
                if (this.events.length === 0) {
                    this.items = [];
                } else {
                    this.listEvents();
                }
            }
        },
        methods:{
            listEvents: function () {
                this.items = [];
                this.events.forEach(event => {
                    eventService.getEventOdds(event)
                        .then((odds) => {
                            const teamsSize = odds.filter(odd => odd.team != null);
                            betService.findBetsByEvent(event)
                                .then(bets => {
                                    const user = JSON.parse(localStorage.getItem(environment.userSession));
                                    let betted = false;
                                    bets.forEach(bet => {
                                        if (bet.user.id === user._id) {
                                            betted = true;
                                        }
                                    });
                                    this.fields = this.fillDatatableHeader(teamsSize, odds);
                                    this.items.push(...this.fillDatatableItems(teamsSize, odds, event, betted));
                                })
                                .catch(error => {
                                    this.displayErrorMessage('Event', error.message);

                                });
                        })
                        .catch(error => {
                            this.displayErrorMessage('Sport', error.message);
                        });
                });
            },
            openBetModal: function (item) {
                if (!item.betted) {
                    this.event = item.event;
                    this.showBetModal = true;
                } else {
                    this.displayErrorMessage('Event', 'Already betted!');
                }
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
                    // header.push({text: 'Close', sortable: false, value: 'close'});
                } else {
                    header.push({text: 'Event', value: 'information'});
                    // header.push({text: 'Close', sortable: false, value: 'close'});
                }
                header.push({text: 'Status', value: 'status'});
                header.push({text: 'Action', value: 'button'});
                return header;
            },
            fillDatatableItems: function (teamsSize, odds, event, betted) {
                const itemsInfo = [];
                if (teamsSize.length === 2) {
                    if (odds.length === 3) {
                        itemsInfo.push({
                            homeTeam: odds[0].team ? odds[0].team.name : odds[1].team.name,
                            oddHome: odds[0].team ? odds[0].odd : odds[1].odd,
                            oddDraw: odds[0].team ? (odds[1].team ? odds[2].odd : odds[1].odd) : odds[0].odd,
                            oddAway: odds[2].team ? odds[2].odd : odds[1].odd,
                            awayTeam: odds[2].team ? odds[2].team.name : odds[1].team.name,
                            event: event,
                            betted: betted,
                            status: betted ? 'Apostado' : 'Não apostado',
                            button: 'Bet'
                        });
                    } else {
                        itemsInfo.push({
                            homeTeam: odds[0].team.name,
                            oddHome: odds[0].odd,
                            oddAway: odds[1].odd,
                            awayTeam: odds[1].team.name,
                            event: event,
                            betted: betted,
                            status: betted ? 'Apostado' : 'Não apostado',
                            button: 'Bet'
                        });
                    }
                } else {
                    this.events.forEach(event => {
                        itemsInfo.push(
                            {
                                information: event.information,
                                status: betted ? 'Apostado' : 'Não apostado',
                                betted: betted,
                                event: event,
                                button: 'Bet'
                            }
                        );
                    });
                }
                return itemsInfo;
            },
            setEventAsBetted: function (response) {
                this.$emit('betEvent', response.betValue);
                const itemIndex = _.findIndex(this.items, (item) => {
                    return item.event.id === response.eventId;
                });
                this.items[itemIndex].betted = true;
                this.items[itemIndex].status = 'Apostado';
            }
        }
    }
</script>
