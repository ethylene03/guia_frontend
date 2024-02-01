<script>
    import Header from '@/assets/components/Header.vue';
    import Footer from '@/assets/components/Footer.vue';

    export default {
        components: {
            Header,
            Footer,
        }
    }
</script>

<template>
    <div class="container">
        <Header type="user" :isMap="false" />

        <div class="content">
            <!-- insert page contents here -->
            Museum Map
        </div>

        <Footer />
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