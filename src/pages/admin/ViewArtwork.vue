<script>
    import Header from '@/assets/components/Header.vue';

    export default {
        components: {
            Header,
        }
    }
</script>

<template>
    <div class="container">
        <Header />

        <div class="content">
            <!-- insert page contents here -->
            View Artwork
        </div>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
    }

    /* CSS STYLING FOR RESPONSIVENESS */
    @media screen and (min-width: 650px) {
        .container {
            width: 60vw;
        }

        .content {
            width: 70%;
        }
    }
</style>