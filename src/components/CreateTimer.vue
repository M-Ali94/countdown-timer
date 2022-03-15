<template>
    <form @submit.prevent="addNewTimer" class="create-new-timer-form">
        <h2>Start New Timer</h2>
        <div class="row">
            <div class="col col-xs-12 col-sm-6 col-md-5">
                <label for="newTimerTitle">Title</label>
                <input type="text" v-model="newTimer.title" id="newTimerTitle" required>
            </div>
            <div class="col col-xs-12 col-sm-6 col-md-5">
                <label for="newTimerDate">Count To</label>
                <input type="datetime-local" v-model="newTimer.dateTime" step="1" id="newTimerDate" required>
            </div>
            <div class="col col-xs-12 col-md-2">
                <button type="submit">Start!</button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                newTimer: {
                    title: '',
                    dateTime: ''
                }
            }
        },

        methods: {
            addNewTimer() {
                this.$store.dispatch('addNewTimer', this.newTimer)
                this.newTimer = {
                    title: '',
                    dateTime: ''
                }
            }
        }
    }
</script>

