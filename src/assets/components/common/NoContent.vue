<script>
    export default {
        props: {
            item: 'artworks',
        }
    }
</script>

<template>
    <div class="no-content">
        <img src="/icons/no-art.png" />
        <text>Oops! No {{ item }} found.</text>
    </div>
</template>

<style scoped>
    .no-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 200px;
    }
</style>