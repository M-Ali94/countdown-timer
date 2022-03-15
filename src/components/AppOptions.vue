<template>
    <div class="sidebar">
        <sorter/>
        <label for="showSeconds" :class="['checkbox-label', {selected: showSeconds}]">
            <input type="checkbox" v-model="showSeconds" id="showSeconds">
            Show Seconds
        </label>
        <label for="showCompleted" :class="['checkbox-label', {selected: showCompleted}]">
            <input type="checkbox" v-model="showCompleted" id="showCompleted">
            Show Completed
        </label>
        <button @click="removeAllCompleted">
            Remove All Completed
        </button>
        <button @click="removeAllTimers">
            Remove All Timers
        </button>
    </div>
</template>
<script>
    import Sorter from '@/components/Sorter'
    import {mapActions} from 'vuex'


    export default {
        methods: {
            ...mapActions(['removeAllCompleted', 'removeAllTimers'])
        },

        components: {Sorter},

        computed: {
            showSeconds: {
                get() {
                    return this.$store.state.showSeconds
                },
                set(newValue) {
                    this.$store.commit('setShowSeconds', newValue)
                }
            },

            showCompleted: {
                get() {
                    return this.$store.state.showCompleted
                },
                set(newValue) {
                    this.$store.commit('setShowCompleted', newValue)
                }
            }
        }
    }
</script>
