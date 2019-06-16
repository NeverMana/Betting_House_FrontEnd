<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container>
        <v-data-table
                :headers="fields"
                :items="items"
                class="elevation-1"
        >
            <template v-slot:items="props">
                <tr v-on:click="openBetModal(props.item)">
                    <td v-for="field in fields" :key="field.value">
                        <v-layout class="text-truncate">
                            {{ props.item[field.value] }}
                        </v-layout>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <div v-if="event">
            <BetModal :event="event" :visible="showBetModal" @close="showBetModal = false"/>
        </div>
    </v-container>
</template>

<script>
    import httpService from "../../api/http/http-service";
    import BetModal from "../public/BetModal";

    export default {
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
                this.events.forEach(event => {
                    httpService.get('events/find-all-odds/' + event.id)
                        .then((odds) => {
                            const teamsSize = odds.filter(odd => odd.team != null);
                            // let itemsInfo = [];
                            this.fields = this.fillDatatableHeader(teamsSize, odds);
                            this.items = this.fillDatatableItems(teamsSize, odds, event);
                        })
                        .catch(error => {
                            this.displayErrorMessage(error.message);
                        });
                });
            }
        },
        methods:{
            openBetModal: function (item) {
                this.event = item.event;
                this.showBetModal = true;
            },
            displayErrorMessage: function (message) {
                this.$toast.error({
                    title: 'Event',
                    message: message
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
                    // header.push({text: 'Close', sortable: false, value: 'close'});
                } else {
                    header.push({text: 'Event', value: 'information'});
                    // header.push({text: 'Close', sortable: false, value: 'close'});
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
                        itemsInfo.push({information: event.information});
                    });
                }
                return itemsInfo;
            },
        }
    }
</script>
