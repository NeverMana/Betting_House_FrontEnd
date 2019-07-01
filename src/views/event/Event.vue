<template>
    <v-container fluid fill-height>
        <NavBar></NavBar>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card elevation-1>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Add Event</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-select
                                prepend-icon="mdi-soccer"
                                v-model="eventDTO.sport.id"
                                :items="sports"
                                item-text="name"
                                item-value="id"
                                :rules="[v => !!v || 'Team is required']"
                                label="Sport"
                                @change="changeTeams"
                                required
                        ></v-select>
                        <v-text-field v-if="teams"
                                      prepend-icon="mdi-soccer"
                                      v-model="eventDTO.information"
                                      name="information"
                                      label="Information"
                                      type="text"
                                      required
                                      :error-messages="nameErrors"
                                      @input="$v.eventDTO.information.$touch()"
                                      @blur="$v.eventDTO.information.$touch()">
                        </v-text-field>
                        <v-select v-if="teams"
                                  v-model="selectedTeamsId"
                                  :items="teams"
                                  item-text="text"
                                  item-value="id"
                                  attach
                                  chips
                                  label="Teams"
                                  no-data-text="No Teams registered for the selected sport"
                                  multiple
                                  required
                                  :rules="[v => !!v || 'Team is required']"
                        ></v-select>
                        <v-checkbox v-if="teams"
                                    v-model="eventDTO.isRestricted"
                                    label="Is Restricted?"
                                    color="blue darken-1"
                        ></v-checkbox>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click.stop="goBack">Go Back</v-btn>
                        <v-btn color="primary" flat @click.stop="proceedToNextStep">Proceed</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <OddsModal v-if="eventDTO.oddDTOs.length > 0"
                   :visible="showOddsModal"
                   :eventDTO="eventDTO"
                   @close="showOddsModal = false"
                   @updateEvent="updateEvent"
                   :hasDraw="hasDraw"/>
    </v-container>
</template>

<script>
    import httpService from "../../api/http/http-service";
    import { required } from 'vuelidate/lib/validators'
    import {validationMixin} from "vuelidate";
    import OddsModal from "./modals/OddsModal";
    import NavBar from "../../components/public/NavBar";
    import {environment} from "../../environment";

    export default {
        components: {NavBar, OddsModal},
        mixins: [validationMixin],

        validations: {
            eventDTO: {
                information: { required }
            }
        },
        data() {
            return {
                teams: null,
                sports: [],
                hasDraw: false,
                selectedTeamsId: [],
                submitted: false,
                showOddsModal: false,
                eventDTO: {
                    information: '',
                    isRestricted: false,
                    sport: {
                        id: null,
                        name: null
                    },
                    oddDTOs: [],
                }
            }
        },
        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.eventDTO.information.$dirty) return errors;
                if (this.submitted) {
                    !this.$v.eventDTO.information.required && errors.push('Information is required.');
                }
                return errors;
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
            getAllSports: function () {
                httpService.get('sports/all')
                    .then((response) => {
                        response.forEach(sport => {
                            this.sports.push({id: sport.id, text: sport.name, hasDraw: sport.hasDraw});
                        });
                        this.sports = response;
                    })
                    .catch((error) => {
                        this.displayErrorMessage('Sport', error.message);
                    });
            },
            changeTeams: function (sportId) {
                httpService.get('teams/find-teams-by-sport-id/' + sportId)
                    .then((response) => {
                        this.teams = [];
                        response.forEach(team => {
                            this.teams.push({id: team.id, text: team.name, sport: team.sport});
                        });
                    })
                    .catch((error) => {
                        this.displayErrorMessage('Event', error.message);
                    });
            },
            proceedToNextStep: function () {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return null;
                }
                const selectedSport = this.sports.find(sport => sport.id === this.eventDTO.sport.id);
                this.hasDraw = selectedSport.hasDraw;

                this.eventDTO.oddDTOs = [];
                const teamsToPersist = this.teams.filter(team => this.selectedTeamsId.includes(team.id));
                teamsToPersist.forEach(team => {
                    this.eventDTO.oddDTOs.push({odd: null, team: team});
                });
                if (teamsToPersist.length !== 2 && this.hasDraw) {
                    this.displayErrorMessage('Event', 'Two teams is required to has a draw');
                    return null;
                }
                this.showOddsModal = true;
            },
            updateEvent: function () {
                const user = JSON.parse(localStorage.getItem(environment.userSession));
                if (user._profile.name === 'ADMINISTRATOR') {
                    this.goTo('/admin');
                } else {
                    this.goTo('/');
                }
            }
        }
    }
</script>