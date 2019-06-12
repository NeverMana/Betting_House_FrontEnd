<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md6>
                    <v-card elevation-1>
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Register</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                            <form @submit.prevent="submit">
                                <v-text-field
                                        v-model="user.name"
                                        label="Name"
                                        :error-messages="nameErrors"
                                        required
                                        @input="$v.user.name.$touch()"
                                        @blur="$v.user.name.$touch()"
                                ></v-text-field>
                                <v-text-field
                                        v-model="user.login"
                                        label="Login"
                                        :error-messages="loginErrors"
                                        required
                                        @input="$v.user.login.$touch()"
                                        @blur="$v.user.login.$touch()"
                                ></v-text-field>
                                <v-text-field
                                        v-model="user.email"
                                        label="E-mail"
                                        :error-messages="emailErrors"
                                        required
                                        @input="$v.user.email.$touch()"
                                        @blur="$v.user.email.$touch()"
                                ></v-text-field>
                                <v-text-field
                                        v-model="user.password"
                                        label="Password"
                                        :error-messages="passwordErrors"
                                        required
                                        @input="$v.user.password.$touch()"
                                        @blur="$v.user.password.$touch()"
                                ></v-text-field>
                                <v-text-field
                                        v-model="user.confirmPassword"
                                        label="Confirm Password"
                                        :error-messages="confirmPasswordErrors"
                                        required
                                        @input="$v.user.confirmPassword.$touch()"
                                        @blur="$v.user.confirmPassword.$touch()"
                                ></v-text-field>
                            </form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="goBack" color="primary">Go Back</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn @click="clear" color="primary">Clear</v-btn>
                            <v-btn @click="submit" color="primary">Sign Up</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, email } from 'vuelidate/lib/validators'
    import sameAs from "vuelidate/src/validators/sameAs";
    import httpService from '../api/http/http-service'
    
    export default {
        mixins: [validationMixin],
        
        validations: {
            user: {
                name: { required },
                login: { required },
                email: { required, email },
                password: { required },
                confirmPassword: {
                    sameAsPassword: sameAs('password')
                }
            }
        },

        data: () => ({
            user: {
                name: '',
                login: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            submitted: false
        }),

        computed: {
            nameErrors () {
                const errors = [];
                if (!this.$v.user.name.$dirty) return errors;
                if (this.submitted) {
                    !this.$v.user.name.required && errors.push('Name is required.');
                }
                return errors;
            },
            loginErrors () {
                const errors = [];
                if (!this.$v.user.login.$dirty) return errors;
                if (this.submitted) {
                    !this.$v.user.login.required && errors.push('Login is required.');
                }
                return errors;
            },
            emailErrors () {
                const errors = [];
                if (!this.$v.user.email.$dirty) return errors;
                if (this.submitted) {
                    !this.$v.user.email.email && errors.push('Must be valid e-mail');
                    !this.$v.user.email.required && errors.push('E-mail is required');
                }
                return errors;
            },
            passwordErrors () {
                const errors = [];
                if (!this.$v.user.password.$dirty) return errors;
                if (this.submitted) {
                    !this.$v.user.password.required && errors.push('Password is required.');
                }
                return errors;
            },
            confirmPasswordErrors () {
                const errors = [];
                if (!this.$v.user.confirmPassword.$dirty) return errors;
                if (this.submitted) {
                    !this.$v.user.confirmPassword.sameAsPassword && errors.push('Passwords doesn\'t match.');
                }
                return errors;
            }
        },

        methods: {
            displaySuccessMessage: function (message) {
                this.$toast.success({
                    title: 'User',
                    message: message
                })
            },
            displayErrorMessage: function (message) {
                this.$toast.error({
                    title: 'User',
                    message: message
                })
            },
            goTo: function (path) {
                this.$router.push(path);
            },
            goBack: function () {
                this.$router.go(-1);
            },
            submit () {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return null;
                }
                httpService.post('users/', this.user)
                    .then(() => {
                        this.displaySuccessMessage("User registered successfully");
                        this.goTo('/login')
                    })
                    .catch((error) => {
                        this.displayErrorMessage(error.message);
                    });
            },
            clear () {
                this.$v.$reset();
                this.user.name = '';
                this.user.login = '';
                this.user.email = '';
                this.user.password = '';
                this.user.confirmPassword = '';
            }
        }
    }
</script>

<style scoped>

</style>