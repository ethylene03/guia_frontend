<script>
    import { redirect } from '@/assets/components/common/common';

    export default {
        props: {
            filteredArt: Array,
        },

        methods: {
            redirect,
        }
    }
</script>

<template>
    <div class="art-card" v-for="art in filteredArt" :key="art.id" @click="redirect('./' + art.id)">
        <!-- art image -->
        <img :src="art.img ? art.img : '/icons/image.svg'" :alt="art.title" />

        <!-- art details -->
        <div class="art-deets">
            <h2>{{ art.title }}</h2>
            <text>{{ art.artist }}, {{ art.year }}</text>
        </div>
    </div>
</template>

<style scoped>
.art-card {
    border: 2px solid var(--color-secondary);
    border-radius: 5px;
    cursor: pointer;

    display: flex;
    padding: 10px;
    margin-top: 10px;
}

.art-card:hover {
    background: var(--color-primary-darker);
}

.art-card img {
    border-radius: 5px;
    margin-right: 10px;

    height: 53px;
    width: 53px;
}

.art-deets h2 {
    font-weight: bold;
}

</style>