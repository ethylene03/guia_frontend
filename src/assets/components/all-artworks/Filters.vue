<script>
    import { sortArt } from "./Functions.js";

    export default {
        props: {
            filter: String,
            type: Boolean,
            options: Array,
            artworks: Array,
        },

        methods: {
            sortArt,
            updateFilterType(option) {
                this.$emit('filterType', option);
            }
        }
    }
</script>

<template>
    <div v-if="type" class="dropdown" v-on:mouseleave="type = false">
        <text style="padding-left: 10px;">{{filter === 'sort' ? 'Sort' : 'Filter'}} by</text>
        <li v-for="option in options" @click="filter === 'sort' ? sortArt(artworks, option) : updateFilterType(option)">
            {{ option }}
        </li>
    </div>
</template>

<style scoped>
.dropdown {
    z-index: 100;
    position: absolute;
    margin-right: 10px;
    right: 0;

    background-color: var(--color-primary);
    padding: 10px 0;
    border: 2px solid var(--color-secondary);
    border-radius: 5px;
}

.dropdown li {
    list-style-type: none;
    padding-left: 20px;
    width: 200px;

    text-transform: capitalize;
}

.dropdown li:hover {
    background-color: var(--color-primary-darker);
    cursor: pointer;
}

</style>