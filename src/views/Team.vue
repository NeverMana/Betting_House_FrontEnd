<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md6>
                    <v-card elevation-1>
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Add Sport</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field prepend-icon="mdi-soccer" v-model="team.name" name="name" label="Name" type="text"></v-text-field>
                            <v-select
                                    prepend-icon="mdi-soccer"
                                    v-model="team.sport.id"
                                    :items="sports"
                                    item-text="name"
                                    item-value="id"
                                    :rules="[v => !!v || 'Item is required']"
                                    label="Sport"
                                    required
                            ></v-select>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" flat @click.stop="goBack">Go Back</v-btn>
                            <v-btn color="primary" flat @click.stop="addTeam">Submit</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import httpService from "../api/http/http-service";

    export default {
        data() {
            return {
                sports: [],
                team: {
                    id: null,
                    name: null,
                    sport: {
                        id: null,
                        name: null
                    }
                },
            }
        },
        mounted: function () {
            this.getAllSports();
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
                    title: 'Sport',
                    message: message
                });
            },
            displayErrorMessage: function (error) {
                this.$toast.error({
                    title: error.title,
                    message: error.message
                });
            },
            addTeam: function () {
                console.log(this.team);
                httpService.post('teams/', this.team)
                    .then(() => {
                        this.displaySuccessMessage('Sport registered successfully!');
                        this.goTo('/')
                    })
                    .catch((error) => {
                        this.displayErrorMessage({title: 'Sport', message: error.message});
                    })
            },
            getAllSports: function () {
                httpService.get('sports/all')
                    .then((response) => {
                        response.forEach(sport => {
                            this.sports.push({id: sport.id, text: sport.name});
                        });
                        this.sports = response;
                    })
                    .catch((error) => {
                        this.displayErrorMessage({title: 'Sport', error: error.message});
                    });
            },
        }
    }
</script>