<script>
    import Header from '@/assets/components/common/Header.vue';
    import Footer from '@/assets/components/common/Footer.vue';
    import TrafficCode from '@/assets/components/museum-map/TrafficCode.vue';
    import { getMuseumId } from '@/assets/components/common/common';
    import Welcome from '@/assets/components/common/Welcome.vue';
    
    // museum maps
    import Joya from '../map/Joya.vue';

    export default {
        components: {
            Header,
            Footer,
            Joya,
            TrafficCode,
            Welcome
        },
        data() {
            return {
                museums: [
                    {museum_id: 1, museum: "joya"},
                    {museum_id: 2, museum: "princess-ethel"},
                    {museum_id: 3, museum: "jade-zahyen"},
                    {museum_id: 4, museum: "jhoanna rica"},
                    {museum_id: 5, museum: "pinky-grace"},
                    {museum_id: 6, museum: "daughpane-museum"},
                    {museum_id: 7, museum: "ellenmarie-gallery"},
                ],
                isReady: false,
                museumComponent: "",
            }
        },

        mounted() {
            const comp = this.museums.find(museum => museum.museum_id === parseInt(getMuseumId("visitor")));

            this.museumComponent = comp.museum;
            this.isReady = true;
        }
    }
</script>

<template>
    <Welcome v-if="!isReady" :start="!isReady" />
    <div v-else class="container">
        <Header type="user" :isMap="false" />

        <div class="content">
            <h1>Museum Map</h1>
            <text class="italic">Click the section to view your Artwork Checklist</text>

            <!-- map -->
            <div class="map">
                <!-- import map here -->
                <component :is="museumComponent" />
            </div>

            <traffic-code />
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
        overflow: auto
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