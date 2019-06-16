<!--<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">-->
    <!--<div v-for="(event, i) in eventsInfo">-->
        <!--<span :key="i">{{i}}</span>-->
        <!--&lt;!&ndash;<v-data-table&ndash;&gt;-->
                <!--&lt;!&ndash;:headers="headers"&ndash;&gt;-->
                <!--&lt;!&ndash;:items="desserts"&ndash;&gt;-->
                <!--&lt;!&ndash;class="elevation-1"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;<template v-slot:items="props">&ndash;&gt;-->
                <!--&lt;!&ndash;<td>{{ props.item.name }}</td>&ndash;&gt;-->
                <!--&lt;!&ndash;<td class="text-xs-right">{{ props.item.calories }}</td>&ndash;&gt;-->
                <!--&lt;!&ndash;<td class="text-xs-right">{{ props.item.fat }}</td>&ndash;&gt;-->
            <!--&lt;!&ndash;</template>&ndash;&gt;-->
        <!--&lt;!&ndash;</v-data-table>&ndash;&gt;-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import httpService from "../../api/http/http-service";-->

    <!--export default {-->
        <!--name: "Events",-->
        <!--data () {-->
            <!--return {-->
                <!--items: [],-->
                <!--headers: [],-->
                <!--eventsInfo: [],-->
                <!--events: [],-->
                <!--headers2: [-->
                    <!--{-->
                        <!--text: 'Dessert (100g serving)',-->
                        <!--align: 'left',-->
                        <!--sortable: false,-->
                        <!--value: 'name'-->
                    <!--},-->
                    <!--{ text: 'Calories', value: 'calories' },-->
                    <!--{ text: 'Fat (g)', value: 'fat' },-->
                    <!--{ text: 'Carbs (g)', value: 'carbs' },-->
                    <!--{ text: 'Protein (g)', value: 'protein' },-->
                    <!--{ text: 'Iron (%)', value: 'iron' }-->
                <!--],-->
                <!--desserts: [-->
                    <!--{-->
                        <!--name: 'Frozen Yogurt',-->
                        <!--calories: 159,-->
                        <!--fat: 6.0,-->
                        <!--carbs: 24,-->
                        <!--protein: 4.0,-->
                        <!--iron: '1%'-->
                    <!--},-->
                    <!--{-->
                        <!--name: 'Ice cream sandwich',-->
                        <!--calories: 237,-->
                        <!--fat: 9.0,-->
                        <!--carbs: 37,-->
                        <!--protein: 4.3,-->
                        <!--iron: '1%'-->
                    <!--},-->
                    <!--{-->
                        <!--name: 'Eclair',-->
                        <!--calories: 262,-->
                        <!--fat: 16.0,-->
                        <!--carbs: 23,-->
                        <!--protein: 6.0,-->
                        <!--iron: '7%'-->
                    <!--},-->
                    <!--{-->
                        <!--name: 'Cupcake',-->
                        <!--calories: 305,-->
                        <!--fat: 3.7,-->
                        <!--carbs: 67,-->
                        <!--protein: 4.3,-->
                        <!--iron: '8%'-->
                    <!--},-->
                    <!--{-->
                        <!--name: 'Gingerbread',-->
                        <!--calories: 356,-->
                        <!--fat: 16.0,-->
                        <!--carbs: 49,-->
                        <!--protein: 3.9,-->
                        <!--iron: '16%'-->
                    <!--},-->
                    <!--{-->
                        <!--name: 'Jelly bean',-->
                        <!--calories: 375,-->
                        <!--fat: 0.0,-->
                        <!--carbs: 94,-->
                        <!--protein: 0.0,-->
                        <!--iron: '0%'-->
                    <!--},-->
                    <!--{-->
                        <!--name: 'Lollipop',-->
                        <!--calories: 392,-->
                        <!--fat: 0.2,-->
                        <!--carbs: 98,-->
                        <!--protein: 0,-->
                        <!--iron: '2%'-->
                    <!--},-->
                    <!--{-->
                        <!--name: 'Honeycomb',-->
                        <!--calories: 408,-->
                        <!--fat: 3.2,-->
                        <!--carbs: 87,-->
                        <!--protein: 6.5,-->
                        <!--iron: '45%'-->
                    <!--},-->
                    <!--{-->
                        <!--name: 'Donut',-->
                        <!--calories: 452,-->
                        <!--fat: 25.0,-->
                        <!--carbs: 51,-->
                        <!--protein: 4.9,-->
                        <!--iron: '22%'-->
                    <!--},-->
                    <!--{-->
                        <!--name: 'KitKat',-->
                        <!--calories: 518,-->
                        <!--fat: 26.0,-->
                        <!--carbs: 65,-->
                        <!--protein: 7,-->
                        <!--iron: '6%'-->
                    <!--}-->
                <!--]-->
            <!--}-->
        <!--},-->
        <!--// computed: {-->
        <!--//     filteredEvents: function () {-->
        <!--//         let -->
        <!--//     }-->
        <!--// },-->
        <!--mounted() {-->
            <!--this.findAllOpenEvents();-->
        <!--},-->
        <!--methods: {-->
            <!--findAllOpenEvents: function () {-->
                <!--httpService.get('events/find-all-open-events')-->
                    <!--.then((eventsResponse) => {-->
                        <!---->
                        <!--eventsResponse.forEach(event => {-->
                            <!--httpService.get('events/find-all-odds/' + event.id)-->
                                <!--.then((odds) => {-->
                                    <!--const teamsSize = odds.filter(odd => odd.team != null);-->
                                    <!--let headerInfo = [];-->
                                    <!--let itemsInfo = [];-->
                                    <!--if (!this.eventsInfo[event.sport.name]) {-->
                                        <!--headerInfo = this.fillDatatableHeader(teamsSize, odds);-->
                                        <!--itemsInfo = this.fillDatatableItems(teamsSize, odds);-->
                                        <!--this.eventsInfo[event.sport.name] = {header: headerInfo, items: []};-->
                                        <!--this.eventsInfo[event.sport.name].items.push(itemsInfo);-->
                                    <!--} else {-->
                                        <!--this.eventsInfo[event.sport.name].items.push(this.fillDatatableItems(teamsSize, odds));-->
                                    <!--}-->
                                <!--})-->
                                <!--.catch(error => {-->
                                    <!--this.displayErrorMessage(error.message);-->
                                <!--});-->
                        <!--});-->
                    <!--})-->
                    <!--.catch((error) => {-->
                        <!--this.displayErrorMessage(error.message);-->
                    <!--});-->
            <!--},-->
            <!--fillDatatableHeader: function (teamsSize, odds) {-->
                <!--const header = [];-->
                <!--if (teamsSize.length === 2) {-->
                    <!--header.push({text: 'Home Team', sortable: true, value: 'homeTeam'});-->
                    <!--header.push({text: '1', sortable: false, value: 'oddHome'});-->
                    <!--if (odds.length === 3) {-->
                        <!--header.push({text: 'X', sortable: false, value: 'oddDraw'});-->
                    <!--}-->
                    <!--header.push({text: '2', sortable: false, value: 'oddAway'});-->
                    <!--header.push({text: 'Away Team', sortable: true, value: 'awayTeam'});-->
                    <!--// header.push({text: 'Close', sortable: false, value: 'close'});-->
                <!--} else {-->
                    <!--header.push({text: 'Team', value: 'team'});-->
                    <!--header.push({text: 'Odd', value: 'odd'});-->
                    <!--// header.push({text: 'Close', sortable: false, value: 'close'});-->
                <!--}-->
                <!--return header;-->
            <!--},-->
            <!--fillDatatableItems: function (teamsSize, odds) {-->
                <!--const itemsInfo = [];-->
                <!--if (teamsSize.length === 2) {-->
                    <!--if (odds.length === 3) {-->
                        <!--itemsInfo.push({-->
                            <!--homeTeam: odds[0].team ? odds[0].team.name : odds[1].team.name,-->
                            <!--oddHome: odds[0].team ? odds[0].odd : odds[1].odd,-->
                            <!--oddDraw: odds[0].team ? (odds[1].team ? odds[2].odd : odds[1].odd) : odds[0].odd,-->
                            <!--oddAway: odds[2].team ? odds[2].odd : odds[1].odd,-->
                            <!--awayTeam: odds[2].team ? odds[2].team.name : odds[1].team.name-->
                        <!--});-->
                    <!--} else {-->
                        <!--itemsInfo.push({-->
                            <!--homeTeam: odds[0].team.name,-->
                            <!--oddHome: odds[0].odd,-->
                            <!--oddAway: odds[1].odd,-->
                            <!--awayTeam: odds[1].team.name-->
                        <!--});-->
                    <!--}-->
                <!--} else {-->
                    <!--odds.forEach(odd => {-->
                        <!--itemsInfo.push({team: odd.team.name, odd: odd.odd});-->
                    <!--});-->
                <!--}-->
                <!--return itemsInfo;-->
            <!--},-->
            <!--displaySuccessMessage: function (message) {-->
                <!--this.$toast.success({-->
                    <!--title: 'Event',-->
                    <!--message: message-->
                <!--});-->
            <!--},-->
            <!--displayErrorMessage: function (message) {-->
                <!--this.$toast.error({-->
                    <!--title: 'Event',-->
                    <!--message: message-->
                <!--});-->
            <!--},-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->