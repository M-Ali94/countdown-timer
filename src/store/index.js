import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
let timersArray = JSON.parse(localStorage.getItem('timers')) ?? []
let sortBy = JSON.parse(localStorage.getItem('sortBy')) ?? ''
let lastId = localStorage.getItem('lastId') ? Number(localStorage.getItem('lastId')) : -1
let showSeconds = JSON.parse(localStorage.getItem('showSeconds')) ?? true
let showCompleted = JSON.parse(localStorage.getItem('showCompleted')) ?? true
let currentTime = Number(Math.round(new Date().getTime() / 1000))

timersArray.forEach(timer => {
    timer.difference = (new Date(timer.dateTime).getTime() / 1000) - currentTime
})


export default new Vuex.Store({
    state: {
        timers: timersArray,
        text: '',
        date: new Date(),
        lastId,
        sortBy,
        showSeconds,
        showCompleted
    },

    mutations: {
        setTimers(state, timers) {
            state.timers = timers
            localStorage.setItem('timers', JSON.stringify(timers))
        },

        setShowSeconds(state, value) {
            state.showSeconds = value
            localStorage.setItem('showSeconds', JSON.stringify(value))
        },

        setShowCompleted(state, value) {
            state.showCompleted = value
            localStorage.setItem('showCompleted', JSON.stringify(value))
        },

        setSortBy(state, sort) {
            state.sortBy = sort
            localStorage.setItem('sortBy', JSON.stringify(sort))
        },

        setLastId(state) {
            state.lastId++
            localStorage.setItem('lastId', String(state.lastId))
        }
    },

    actions: {
        addNewTimer({commit, state, dispatch}, newTimer) {
            let timers = [...state.timers]

            commit('setLastId')
            newTimer.id = state.lastId

            newTimer.createdAt = new Date()
            let now = Number(Math.round(newTimer.createdAt.getTime() / 1000))
            newTimer.difference = (new Date(newTimer.dateTime).getTime() / 1000) - now

            timers.push(newTimer)

            commit('setTimers', timers)
        },

        removeAllTimers({commit}) {
            if (confirm('Are you sure you want to remove all timers?')) {
                commit('setTimers', [])
            }
        },

        removeAllCompleted({commit, state}) {
            let timers = [...state.timers]

            timers = timers.filter(el => {
                return el.difference > 0
            })

            if (confirm('Are you sure you want to remove all completed timers?')) {
                commit('setTimers', timers)
            }

        },

        removeTimer({commit, state}, timer) {
            let timers = [...state.timers]

            timers = timers.filter(obj => {
                return obj.id !== timer.id
            })
            if (confirm(`Are you sure you want to remove ${timer.title} timer?`)) {
                commit('setTimers', timers)
            }
        },

        setSortBy({commit, state}, sort) {
            let timers = [...state.timers]

            switch (sort.type) {
                case 'date':
                    timers.sort((a, b) => {
                        if (sort.how === 'asc') {
                            return new Date(b[sort.value]) - new Date(a[sort.value])
                        }
                        return new Date(a[sort.value]) - new Date(b[sort.value])
                    })
                    break
                case 'number':
                    timers.sort((a, b) => {
                        if (sort.how === 'asc') {
                            return b[sort.value] - a[sort.value]
                        }
                        return a[sort.value] - b[sort.value]
                    })
                    break
                case 'string':
                    timers.sort((a, b) => {
                        if (sort.how === 'asc') {
                            return b[sort.value].localeCompare(a[sort.value])
                        }
                        return a[sort.value].localeCompare(b[sort.value])
                    })
                    break
            }

            commit('setTimers', timers)
            commit('setSortBy', sort)
        }
    }
})
