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
                            <v-text-field prepend-icon="mdi-soccer" 
                                          v-model="name"
                                          name="name"
                                          label="Name"
                                          type="text"
                                          required
                                          :error-messages="nameErrors"
                                          @input="$v.name.$touch()"
                                          @blur="$v.name.$touch()">
                            </v-text-field>
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
    </v-content>
</template>

<script>
    import httpService from "../api/http/http-service";
    import { required } from 'vuelidate/lib/validators'
    import {validationMixin} from "vuelidate";

    export default {
        mixins: [validationMixin],

        validations: {
            name: { required }
        },
        
        data() {
            return {
                name: null,
                submitted: false
            }
        },
        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.name.$dirty) return errors;
                if (this.submitted) {
                    !this.$v.name.required && errors.push('Name is required.');
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
            addSport: function () {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return null;
                }
                httpService.post('sports/save', this.name)
                    .then(() => {
                        this.displaySuccessMessage('Sport registered successfully!');
                        this.goTo('/')
                    })
                    .catch((error) => {
                        this.displayErrorMessage({title: 'Sport', message: error.message});
                    })
            }
        }
    }
</script>