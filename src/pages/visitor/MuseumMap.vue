<script>
    import Header from '@/assets/components/Header.vue';
    import Footer from '@/assets/components/Footer.vue';

    // pseudo map
    import JoseJoya from '../map/JoseJoya.vue';

    export default {
        components: {
            Header,
            Footer,
            JoseJoya,
        }
    }
</script>

<template>
    <div class="container">
        <Header type="user" :isMap="false" />

        <div class="content">
            <h1>Museum Map</h1>
            <text class="italic">Click the section to view your Artwork Checklist</text>

            <!-- map -->
            <div class="map">
                <!-- import map here -->
                <jose-joya />
            </div>

            <div class="traffic-code">
                <text style="font-weight: bold;">Museum Traffic Code:</text>
                <div class="code">
                    <div class="code-red"></div>
                    <text>More than 20 visitors</text>
                </div>
                <div class="code">
                    <div class="code-orange"></div>
                    <text>11 to 20 visitors</text>
                </div>
                <div class="code">
                    <div class="code-yellow"></div>
                    <text>6 to 10 visitors</text>
                </div>
                <div class="code">
                    <div class="code-white"></div>
                    <text>Less than 6 visitors</text>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        text-align: center;
        margin-bottom: 3.2rem; /* add space for footer */
    }

    .content .italic {
        font-style: italic;
    }

    .map {
        border: 2px solid var(--color-secondary);
        border-radius: 5px;

        padding: 10px;
        margin: 20px 0;
        min-height: 45vh;
        width: 100%;

        display: flex;
        justify-content: center;
    }

    .traffic-code {
        text-align: left;
    }

    .code {
        display: flex;
        align-items: center;
    }

    .code-red,
    .code-orange,
    .code-yellow,
    .code-white {
        width: 15px;
        height: 15px;
        border: 2px solid;

        margin-right: 15px;
    }

    .code-red {
        background-color: var(--color-error);
        border-color: var(--color-error);
    }

    .code-orange {
        background-color: #D97738;
        border-color: #D97738;
    }

    .code-yellow {
        background-color: #E3CC62;
        border-color: #E3CC62;
    }

    .code-white {
        background-color: #F4EBBF;
        border-color: #F4EBBF;
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