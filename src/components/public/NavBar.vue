<template>
    <nav>
        <v-navigation-drawer
                v-model="drawer"
                clipped
                class="grey lighten-4"
                app
        >
            <v-list
                    dense
                    class="grey lighten-4"
            >
                <template v-for="(item, i) in items">
                    <v-layout
                            v-if="item.heading"
                            :key="i"
                            row
                            align-center
                    >
                        <v-flex xs6>
                            <v-subheader>
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                    </v-layout>

                    <v-divider
                            v-else-if="item.divider"
                            :key="i"
                            dark
                            class="my-3"
                    ></v-divider>

                    <v-list-tile
                            v-else
                            :key="i"
                            :to="item.path"
                    >
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar
                dark
                fixed
                clipped-left
                app
                color="primary"
        >
            <v-toolbar-side-icon
                    @click="drawer = !drawer"
            >
            </v-toolbar-side-icon>

            <!--v-img #quando quisermos por um logo
                src="https://cdn1.iconfinder.com/data/icons/dotted-charts/512/links_diagram-128.png"
                max-height="38px"
                max-width="38px"
                v-on:click="goTo('/')"
                :style="{ cursor: 'pointer'}"
            >
            </v-img-->

            <v-toolbar-title>
                <span>
                    <template v-for="(menu, i) in navBarTop">
                        <v-btn @click="goTo(menu.path)" flat :key="i">
                        <v-icon dark left> {{menu.icon}} </v-icon>
                        {{menu.text}}
                    </v-btn>
                    </template>
                </span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-icon dark left>mdi-account</v-icon>
                <!--<v-btn @click="goTo('/login')" flat>-->
                <!--Login-->
                <!--</v-btn>-->
                <!--<v-btn @click="goTo('/register')" flat>-->
                <!--Register-->
                <!--</v-btn>-->
                <v-btn @click="signOut()" flat>
                    Sign Out
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </nav>
</template>

<script>
    import httpService from '../../api/http/http-service'

    import {Profile} from "../../api/domain/profile";
    import {environment} from "../../environment";

    export default {
        name: 'NavBar',
        data() {
            return {
                navBarTop: [],
                drawer: false, // this.$vuetify.breakpoint.lgAndUp,
                navBarTopAdmin: [
                    { text: 'Betting House', path: '/', icon: 'mdi-home' },
                    { text: 'Event', path: '/', icon: 'fas fa-calendar-plus' },
                    // { text: 'Sport', path: '/sport', icon: 'mdi-soccer' },
                    // { text: 'Team', path: '/sport', icon: 'fas fa-users' }
                ],
                navBarTopVip: [
                    { text: 'Betting House', path: '/', icon: 'mdi-home' },
                    { text: 'VIP Events', path: '/vip', icon: 'fas fa-medal' }
                ],
                navBarTopRegular: [
                    { text: 'Betting House', path: '/', icon: 'mdi-home' },
                    { text: 'Events', path: '/vip', icon: 'fas fa-calendar-day' }
                ],
                sports: null,
                items: [
                    { heading: 'My account' },
                    { text: 'Account', path: '/conta', icon: 'mdi-account' },
                    { text: 'Definitions', path: '/conta', icon: 'mdi-settings' },
                    { divider: true },
                    // { heading: 'Sports'},
                    // { text: 'Futebol', path: '/football', icon: 'mdi-soccer' },
                    // { text: 'Basquetebol', path: '/basketball', icon: 'mdi-basketball' },
                    // { text: 'Formula 1', path: '/formula1', icon: 'mdi-speedometer' },

                ],
                adminItems: [
                    { heading: 'Operations' },
                    { text: 'Event', path: '/#', icon: 'fas fa-plus'},
                    { text: 'Sport', path: '/#', icon: 'fas fa-plus'},
                    { text: 'Team', path: '/#', icon: 'fas fa-plus'}
                ]
            }
        },
        mounted: function () {
            const user = JSON.parse(localStorage.getItem(environment.userSession));
            if (user._profile.name === Profile.ADMINISTRATOR) {
                this.navBarTop = this.navBarTopAdmin;
                this.items.push(...this.adminItems);
            } else if (user._profile.name === Profile.VIP) {
                this.navBarTop = this.navBarTopVip;
            } else if (user._profile.name === Profile.REGULAR) {
                this.navBarTop = this.navBarTopRegular;
            }
            httpService.get('sports/all')
                .then((response) => {
                    if (response) {
                        response.forEach((sport) => {
                            this.items.push({ text: sport.name, path: '/sport/' + sport.id, icon: 'mdi-soccer'});
                        });
                    }
                })
                .catch((error) => {
                    this.displayErrorMessage({title: 'Sport', error: error.message});
                });
        },
        methods:{
            goBack: function(){
                this.$router.go(-1)
            },
            goTo: function (path) {
                this.$router.push(path)
            },
            signOut: function () {
                localStorage.clear();
                this.$router.push('/login');
            },
            displayErrorMessage: function (error) {
                this.$toast.error({
                    title: error.title,
                    message: error.message
                })
            },
        }
    }
</script>
