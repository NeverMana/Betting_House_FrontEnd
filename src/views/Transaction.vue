<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container>
        <NavBar></NavBar>
        <Title title="Transactions"></Title>
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
    import userService from '../api/services/user-service'
    import NavBar from "../components/public/NavBar";
    import Title from "../components/public/Title";

    export default {
        name: "History",
        components: {Title, NavBar},
        data() {
            return {
                transactions: [],
                fields: [],
                items: []
            }
        },
        mounted() {
            userService.getTransactions()
                .then(response => {
                    this.transactions = response;
                    this.listEvents();
                })
                .catch(error => {
                    this.displayErrorMessage('Transaction', error.message);
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
                header.push({text: 'Transaction Date', value: 'startDate'});
                header.push({text: 'Transactions', value: 'coins'});
                return header;
            },
            fillDatatableItems: function () {
                const itemsInfo = [];
                this.transactions.forEach(transaction => {
                    const date = new Date(transaction.startDate);
                    const day = date.getDate();
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();
                    itemsInfo.push({
                        startDate: day + '/' + month + '/' + year,
                        coins: transaction.coins > 0 ? '+ ' + transaction.coins : transaction.coins
                    });
                });
                return itemsInfo;
            }
        }
    }
</script>

<style scoped>

</style>