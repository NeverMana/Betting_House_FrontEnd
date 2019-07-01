<template>
    <v-container fluid fill-height>
        <NavBar></NavBar>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card elevation-1>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Add Team</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-select
                                prepend-icon="mdi-soccer"
                                v-model="team.sport.id"
                                :items="sports"
                                item-text="name"
                                item-value="id"
                                :rules="[v => !!v || 'Sport is required']"
                                label="Sport"
                                required
                        ></v-select>
                        <v-text-field prepend-icon="mdi-soccer"
                                      v-model="team.name"
                                      name="name"
                                      label="Name"
                                      type="text"
                                      required
                                      :error-messages="nameErrors"
                                      @input="$v.team.name.$touch()"
                                      @blur="$v.team.name.$touch()">
                        </v-text-field>
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
</template>

<script>
    import httpService from "../api/http/http-service";
    import { required } from 'vuelidate/lib/validators'
    import {validationMixin} from "vuelidate";
    import NavBar from "../components/public/NavBar";
    import {environment} from "../environment";

    export default {
        components: {NavBar},
        mixins: [validationMixin],

        validations: {
            team: {
                name: { required }
            }
        },

        data() {
            return {
                sports: [],
                submitted: false,
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
        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.team.name.$dirty) return errors;
                if (this.submitted) {
                    !this.$v.team.name.required && errors.push('Name is required.');
                }
                return errors;
            }
        },
        methods: {
            goTo: function (path) {
                this.$router.push(path)
            },
            goBack: function(){
                this.$router.go(-1)
            },
            addTeam: function () {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return null;
                }
                httpService.post('teams/save', this.team)
                    .then(() => {
                        this.displaySuccessMessage('Team', 'Team registered successfully!');
                        const user = JSON.parse(localStorage.getItem(environment.userSession));
                        if (user._profile.name === 'ADMINISTRATOR') {
                            this.goTo('/admin');
                        } else {
                            this.goTo('/');
                        }
                    })
                    .catch((error) => {
                        this.displayErrorMessage('Team', error.message);
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
                        this.displayErrorMessage('Team', error.message);
                    });
            },
        }
    }
</script>