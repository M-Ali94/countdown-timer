<template>
    <div>
        <select name="sorter" id="sorter" v-model="sortBy">
            <option :value="sort" v-for="sort in sortByValues">
                {{ sort.title }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sortByValues: [
                    {
                        title: 'Created At ↓',
                        value: 'createdAt',
                        how: 'desc',
                        type: 'date'
                    }, {
                        title: 'Created At ↑',
                        value: 'createdAt',
                        how: 'asc',
                        type: 'date'
                    }, {
                        title: 'Title: A-Z',
                        value: 'title',
                        how: 'desc',
                        type: 'string'
                    }, {
                        title: 'Title: Z-A',
                        value: 'title',
                        how: 'asc',
                        type: 'string'
                    }, {
                        title: 'Time Left ↓',
                        value: 'difference',
                        how: 'desc',
                        type: 'number'
                    }, {
                        title: 'Time Left ↑',
                        value: 'difference',
                        how: 'asc',
                        type: 'number'
                    }
                ]
            }
        },

        computed: {
            sortBy: {
                get() {
                    return this.$store.state.sortBy
                },
                set(sortBy) {
                    this.$store.dispatch('setSortBy', sortBy)
                }
            }
        },
        created() {
            if (this.sortBy === '') {
                this.sortBy = this.sortByValues[0]
            }
        }
    }
</script>

