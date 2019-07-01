<template>
    <v-layout row justify-center>
        <v-dialog v-model="show" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">Set Result</v-card-title>
                <v-card-text>
                    <v-radio-group v-model="odd">
                        <v-radio v-for="(odd, i) in odds" :key="i"
                                 :label="(odd.team ? (odd.team.name + ' | ') : 'Draw | ') + 'Odd: ' + odd.odd "
                                 :value="odd.odd"
                        ></v-radio>
                    </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click.stop="show = false">Close</v-btn>
                    <v-btn color="primary" flat @click.stop="closeEvent">End Event</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>

    import {environment} from "../../../environment";
    import httpService from "../../../api/http/http-service";
    import {Profile} from "../../../api/domain/profile";

    export default {
        props: {
            visible: {
                type: Boolean
            },
            event: {
                type: Object
            },
        },
        data() {
            return {
                user: null,
                odds: [],
                odd: null,
                betDTO: {
                    bet: null,
                    odd: null,
                    event: null
                }
            }
        },
        mounted: function () {
            this.findAllOddsByEvent();
            const user = JSON.parse(localStorage.getItem(environment.userSession));
            httpService.get('users/' + user._id)
                .then((response) => {
                    this.user = response;
                })
                .catch((error) => {
                    this.displayErrorMessage('User', error.message);
                });
        },
        computed: {
            show: {
                get() {
                    return this.visible;
                },
                set (value) {
                    if (!value) {
                        this.$emit('close')
                    }
                }
            }
        },
        methods: {
            findAllOddsByEvent: function () {
                httpService.get('events/find-all-odds/' + this.event.id)
                    .then((odds) => {
                        this.odds = odds;
                    })
                    .catch(error => {
                        this.displayErrorMessage('Bet', error.message);
                    });
            },
            closeEvent: function () {
                if (this.user.profile.name !== Profile.ADMINISTRATOR) {
                    this.displayErrorMessage('User', 'Can\'t close event, only administrators');
                    return null;
                }
                const closeEventDTO = {odd: this.odd, eventId: this.event.id};
                httpService.post('events/close-event', closeEventDTO)
                    .then(() => {
                        this.$emit('eventClosed', this.event.id);
                        this.displaySuccessMessage('Event', 'Close event successfully!');
                        this.$emit('close');
                    })
                    .catch(error => {
                        this.displayErrorMessage('Bet', error.message);
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    $link-color: #0288d1;
    $gray-light: #e9ecef;
    $gray-medium: #adb5bd;
    $gray-dark: #343d46;
    $bg-color: #afccff;

    body,
    html {
        height: 100%;
    }

    #app {
        background-color: $bg-color;
        font-size: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .control.number {
        display: inline-flex;
        margin-bottom: 1rem;
        position: relative;
        width: 100%;
        max-width: calc(180 / 16 * 1rem);

        input {
            border: 1px solid $gray-light;
            border-radius: 3px;
            font-size: .875rem;
            flex: 1 0;
            line-height: 1.65;
            height: 2.5em;
            margin: 0 auto;
            padding-left: .5rem;
            padding-right: calc(82 / 16 * 1rem);
            text-align: left;
            width: 100%;
            max-width: 100%;
            vertical-align: top;
            // Firefox-specific hack
            -moz-appearance: textfield;

            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            &:focus {
                outline: 0;
                box-shadow: 0 0 0 0.2rem $link-color;
            }
        }

        button {
            background-color: #fff;
            border: 0px solid $gray-light;
            border-left-width: 1px;
            border-radius: 0;
            color: $gray-dark;
            cursor: pointer;
            flex: 0 1;
            font-family: sans-serif;
            font-size: .875rem;
            font-weight: bold;
            line-height: 1.7;
            position: absolute;
            top: .0625rem;
            text-align: center;
            width: 2.5rem;
            height: 2.375rem;
            user-select: none;
            z-index: 5;

            &:hover,
            &:active,
            &:focus {
                border-color: $link-color;
                color: $link-color;
                outline: none;
            }

            &:hover {
                & ~ .input {
                    border: 1px solid $link-color;
                }
            }
            &:active,
            &:focus {
                & ~ .input {
                    border: 0;
                    box-shadow: 0 0 0 0.2rem $link-color;
                }
            }
            &:disabled,
            &.is-disabled {
                color: $gray-medium;
                opacity: 1;
            }
        }

        .increment-button {
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            right: calc(1.5 / 14 * 1rem);
        }

        .decrement-button {
            right: calc(41.5 / 14 * 1rem);
        }
    }

    p {
        font-family: Impact, sans-serif;
        font-size: 2em;
        margin-bottom: .5em;
        text-align: center;
    }
</style>