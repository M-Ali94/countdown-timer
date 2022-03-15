<template>
    <div id="app">
        <div class="container">
            <div class="row">
                <div class="col col-xs-12">
                    <create-timer/>
                </div>
                <div class="col col-xs-12 col-lg-4 col-xl-3">
                    <app-options/>
                </div>
                <div class="col col-xs-12 col-lg-8 col-xl-9" v-if="timers.length > 0">
                    <div class="row">
                        <div class="col col-xs-12 col-md-6 col-xxl-4"
                             v-for="timer in timers"
                             :key="timer.id"
                             v-if="showCompleted ? showCompleted : timer.difference > 0">
                            <count-down-timer :timer="timer"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CountDownTimer from '@/components/CountDownTimer'
    import AppOptions from '@/components/AppOptions';
    import CreateTimer from "@/components/CreateTimer";
    import {mapState} from 'vuex'

    export default {
        components: {
            CountDownTimer, AppOptions, CreateTimer
        },

        computed:{
            ...mapState(['timers', 'showCompleted']),
        }
    }
</script>
