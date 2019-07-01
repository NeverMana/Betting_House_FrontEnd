<template>
    <v-container fluid fill-height>
        <NavBar :coins="userCoins"></NavBar>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card elevation-1>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Become VIP</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        Wish to become VIP? It's a 50 coins investment. You will win access to restricted events.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click.stop="goBack">Voltar</v-btn>
                        <v-btn color="primary" flat @click.stop="becomeVIP">Become VIP</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import httpService from "../../api/http/http-service";
    import {environment} from "../../environment";
    import NavBar from "../../components/public/NavBar";

    export default {
        components: {NavBar},
        data() {
            return {
                user: null,
                coins: null,
                userCoins: null
            }
        },
        mounted: function () {
            const user = JSON.parse(localStorage.getItem(environment.userSession));
            httpService.get('users/' + user._id)
                .then((response) => {
                    this.user = response;
                })
                .catch((error) => {
                    this.displayErrorMessage('User', error.message);
                });
        },
        methods: {
            goTo: function (path) {
                this.$router.push(path)
            },
            goBack: function(){
                this.$router.go(-1)
            },
            becomeVIP: function () {
                if (this.user.coins < 50) {
                    this.displayErrorMessage('User', 'You must have 50 coins!');
                } else {
                    httpService.get('users/become-vip')
                        .then(() => {
                            this.displaySuccessMessage('User', "Now you're VIP!");
                            const user = JSON.parse(localStorage.getItem(environment.userSession));
                            if (user._profile.name === 'ADMINISTRATOR') {
                                this.goTo('/admin');
                            } else {
                                this.goTo('/');
                            }
                            this.userCoins = this.coins;
                            this.coins = null;
                        })
                        .catch((error) => {
                            this.displayErrorMessage('User', error.message);
                        });
                }
            }
        }
    }
</script>