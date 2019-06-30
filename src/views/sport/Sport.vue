<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card elevation-1>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Add Sport</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field prepend-icon="mdi-soccer"
                                      v-model="sport.name"
                                      name="name"
                                      label="Name"
                                      type="text"
                                      required
                                      :error-messages="nameErrors"
                                      @input="$v.sport.name.$touch()"
                                      @blur="$v.sport.name.$touch()">
                        </v-text-field>
                        <v-checkbox v-model="sport.hasDraw"
                                    label="Has Draw?"
                                    color="blue darken-1"
                        ></v-checkbox>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click.stop="goBack">Go Back</v-btn>
                        <v-btn color="primary" flat @click.stop="addSport">Submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import httpService from "../../api/http/http-service";
    import { required } from 'vuelidate/lib/validators'
    import {validationMixin} from "vuelidate";

    export default {
        mixins: [validationMixin],

        validations: {
            sport: {
                name: { required }
            }
        },

        data() {
            return {
                sport: {
                    name: null,
                    hasDraw: false
                },
                submitted: false,
            }
        },
        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.sport.name.$dirty) return errors;
                if (this.submitted) {
                    !this.$v.sport.name.required && errors.push('Name is required.');
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
            addSport: function () {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return null;
                }
                httpService.post('sports/save', this.sport)
                    .then(() => {
                        this.displaySuccessMessage('Sport', 'Sport registered successfully!');
                        this.goTo('/')
                    })
                    .catch((error) => {
                        this.displayErrorMessage('Sport', error.message);
                    })
            }
        }
    }
</script>