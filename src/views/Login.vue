<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md6>
                    <v-card elevation-1>
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Login</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field prepend-icon="person" v-model="login" name="login" label="Login" type="text"></v-text-field>
                                <v-text-field id="password" v-model="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="goTo('/register')" color="primary">Sign Up</v-btn>
                            <v-btn @click.prevent="signIn(login, password)" color="primary">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import httpService from '../api/http/http-service'
import {environment} from "../environment";
import User from "../api/domain/user";

export default {
    data() {
        return {
            login: null,
            password: null,
            alertMessage: null
        }
    },
    methods: {
        signIn: async function(login, password){
            await httpService.post('login/', {login: login, password: password})
                .then((response) => {
                    localStorage.setItem(environment.userToken, response.token);
                    localStorage.setItem(environment.userSession, JSON.stringify(this.createUserSession(response)));
                    this.goTo('home');
                }).catch((error) => {
                    this.displayErrorMessage(error.message);
                });
        },
        createUserSession: function (response) {
            return new User(response.id, response.name, response.profile, response.login, response.email);
        },
        displaySuccessMessage: function (message) {
            this.$toast.success({
                title: 'Login',
                message: message
            });
        },
        displayErrorMessage: function (message) {
            this.$toast.error({
                title: 'Login',
                message: message
            });
        },
        goTo: function (path) {
            this.$router.push(path)
        }
    }
}
</script>

