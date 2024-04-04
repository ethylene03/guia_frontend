<script>
    import Footer from '@/assets/components/common/Footer.vue';
    import Header from '@/assets/components/common/Header.vue';
    import CameraIcon from 'icons/Camera.vue';

    // pseudo image
    import { getArtwork } from '@/assets/API calls/artworkAPI';
    import { redirect } from '@/assets/components/common/common';
    import moment from 'moment';

    export default {
        components: {
            Header, 
            Footer,
            CameraIcon
        },

        data() {
            return {
                artwork: {},
                isReady: false,
            };
        },

        async mounted() {
            this.artwork = await getArtwork(this.$route.params.id, 'visitor');
            
            this.artwork.image = this.artwork.images.find(art => art.is_thumbnail === true).image_link;
            console.log(this.artwork);
        },
 
        methods: {
            redirect,
            moment,
        }
    };
</script>

<template>
    <div class="container">
        <Header type="user" :isMap="true" />

        <div class="content">
            <!-- image -->
            <img :src="this.artwork.image" :alt="this.artwork.title" />

            <!-- art title -->
            <div class="subtitle">
                <h3 style="font-weight: bolder;">{{ this.artwork.title }} ({{ moment(new Date(this.artwork.date_published)).format('YYYY') }})</h3>
                <text>by <b style="font-weight: bold;">{{ this.artwork.artist_name }}</b> </text>
            </div>

            <!-- art details -->
            <div class="details">
                <text>Medium</text>
                <text style="font-weight: bold;">{{ this.artwork.medium }}</text>

                <text>Dimensions</text>
                <text style="font-weight: bold;">{{ this.artwork.dimen_length_cm }} x {{ this.artwork.dimen_width_cm }} {{ this.artwork.dimen_height_cm ? "x " + this.artwork.dimen_height_cm : null }} cm</text>
            </div>

            <!-- description -->
            <div class="description">
                <p>{{ this.artwork.description }}</p>
            </div>

            <button class="scan-again" type="button" @click="redirect('/scan')">
                <camera-icon title="scan again" fillColor="var(--color-primary)" :size="20" style="display: flex; margin-right: 10px;" />
                <!-- <img src="/icons/scan.svg" alt="scan again" /> -->
                Scan Again
            </button>
        </div>

        <Footer />
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
    }

    .content img {
        width: 100%;
        margin-bottom: 20px;
        border-radius: 5px;
    }

    .subtitle {
        text-align: center;
        margin-bottom: 20px;
    }

    .details {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-bottom: 20px;
    }

    .description {
        text-align: justify;
        padding: 5px;

        height: 12em;
        overflow-y: auto;
    }

    .scan-again {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: var(--color-accent);
        color: var(--color-primary);

        margin: 20px 0 -30px 0;
        margin-bottom: 3.2rem;
    }

    .scan-again:hover {
        background-color: var(--color-accent-darker);
        cursor: pointer;
    }

    .scan-again img {
        height: 20px;
        width: auto;
        margin: 0 10px 0 0;
    }

    @media screen and (min-width: 650px) {
        .container {
            width: 60vw;
        }

        .content {
            width: 70%;
        }
    }
</style>