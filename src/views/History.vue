<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container>
        <NavBar></NavBar>
        <Title title="Bet History"></Title>
        <v-data-table
                :headers="fields"
                :items="items"
                class="elevation-1">
            <template v-slot:items="props">
                <tr>
                    <td v-for="field in fields" :key="field.value">
                        <v-layout class="text-truncate">
                            {{ props.item[field.value] }}
                        </v-layout>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    import betService from '../api/services/bet-service'
    import NavBar from "../components/public/NavBar";
    import Title from "../components/public/Title";
    
    export default {
        name: "History",
        components: {Title, NavBar},
        data() {
            return {
                history: [],
                fields: [],
                items: []
            }
        },
        mounted() {
            betService.getHistory()
                .then(response => {
                    this.history = response;
                    this.listEvents();
                })
                .catch(error => {
                    this.displayErrorMessage('History', error.message);
                })
        },
        methods: {
            listEvents: function() {
                this.items = [];
                this.fields = this.fillDatatableHeader();
                this.items.push(...this.fillDatatableItems());
            },
            fillDatatableHeader: function () {
                const header = [];
                header.push({text: 'Event Date', value: 'date'});
                header.push({text: 'Event Description', value: 'description'});
                header.push({text: 'Team Betted', value: 'team'});
                header.push({text: 'Coins', value: 'coins'});
                return header;
            },
            fillDatatableItems: function () {
                const itemsInfo = [];
                this.history.forEach(betHistory => {
                    const date = new Date(betHistory.event.startDate);
                    const day = date.getDate();
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();
                    itemsInfo.push({
                        date: day + '/' + month + '/' + year,
                        description: betHistory.event.information,
                        team: betHistory.bet.team ? betHistory.bet.team.name : 'Draw',
                        coins: betHistory.bet.won ? '+ ' + (betHistory.bet.bet * betHistory.bet.odd) : '- ' + betHistory.bet.bet
                    });
                });
                return itemsInfo;
            }
        }
    }
</script>

<style scoped>

</style>