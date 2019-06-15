<template>
    <v-content>
        <v-container fluid fill-height>
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
    </v-content>
</template>

<script>
    import httpService from "../api/http/http-service";
    import {environment} from "../environment";

    export default {
        data() {
            return {
                user: null,
                coins: null
            }
        },
        mounted: function () {
            const user = JSON.parse(localStorage.getItem(environment.userSession));
            httpService.get('users/' + user._id)
                .then((response) => {
                    this.user = response;
                })
                .catch((error) => {
                    this.displayErrorMessage({title: 'User', message: error.message});
                });
        },
        methods: {
            goTo: function (path) {
                this.$router.push(path)
            },
            goBack: function(){
                this.$router.go(-1)
            },
            displaySuccessMessage: function (message) {
                this.$toast.success({
                    title: 'User',
                    message: message
                });
            },
            displayErrorMessage: function (error) {
                this.$toast.error({
                    title: error.title,
                    message: error.message
                });
            },
            becomeVIP: function () {
                if (this.user.coins < 50) {
                    this.displayErrorMessage({title: 'User', message: 'You must have 50 coins!'});
                } else {
                    httpService.get('users/become-vip')
                        .then(() => {
                            this.displaySuccessMessage("Now you're VIP!");
                            this.goTo('/');
                            this.coins = null;
                        })
                        .catch((error) => {
                            this.displayErrorMessage({title: 'User', message: error.message});
                        });
                }
            }
        }
    }
</script>