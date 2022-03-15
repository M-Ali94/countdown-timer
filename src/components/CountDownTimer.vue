<template>
    <div class="timer-container" v-if="showIfCompleted">
        <span class="remove-timer" @click="removeTimer(timer)">&times;</span>
        <p class="timer-title">{{ timer.title }}</p>
        <div class="time-countdown">
            <div class="time-value-unit">
                <span class="countdown-days time-value">
                    <span class="many-days" v-if="days > 99">+</span>
                    <span class="time-value-shadow">88</span>
                    {{ days > 99 ? 99 : days | addZero }}
                </span>
                <span class="time-unit">{{ Number(days) === 1 ? 'DAY' : 'DAYS' }}</span>
            </div>

            <div class="time-value-unit">
                <span class="countdown-hours time-value">
                    <span class="time-value-shadow">88</span>
                    {{ hours | addZero }}
                </span>
                <span class="time-unit">{{ Number(hours) === 1 ? 'HR' : 'HRS' }}</span>
            </div>

            <div class="time-value-unit">
                <span class="countdown-minutes time-value">
                    <span class="time-value-shadow">88</span>
                    {{ minutes | addZero }}
                </span>
                <span class="time-unit">MIN</span>
            </div>

            <div class="time-value-unit" v-if="showSeconds">
                <span class="countdown-seconds time-value">
                    <span class="time-value-shadow">88</span>
                    {{ seconds | addZero }}
                </span>
                <span class="time-unit">SEC</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'


    export default {
        data() {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                interval: ''
            }
        },
        computed: {
            ...mapState(['showSeconds', 'showCompleted']),
            showIfCompleted() {
                if (this.showCompleted) return true
                return this.timer.difference > 0
            }
        },

        filters: {
            addZero(number) {
                if (number < 10) {
                    return '0' + number
                }
                return number
            }
        },

        methods: {
            ...mapActions(['removeTimer']),

            timeCounter(timer) {
                setTimeout(() => {
                    this.interval = setInterval(() => {
                        timer = timer - 1

                        this.days = Math.floor((timer % (60 * 60 * 24 * 9999)) / (60 * 60 * 24))
                        this.hours = Math.floor((timer % (60 * 60 * 24)) / (60 * 60))
                        this.minutes = Math.floor((timer % (60 * 60)) / 60)
                        this.seconds = Math.floor(timer % 60)

                        if (timer < 1) {
                            clearInterval(this.interval)
                        }
                    }, 1000)
                }, 1000 - new Date().getMilliseconds())
            }
        },

        props: ['timer'],

        created() {
            if (this.timer.difference > 0) {
                this.timeCounter(this.timer.difference)
            }
        }
    }
</script>
