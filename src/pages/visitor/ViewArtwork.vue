<script>
    import Footer from '@/assets/components/common/Footer.vue';
    import Header from '@/assets/components/common/Header.vue';
    import CameraIcon from 'icons/Camera.vue';

    // pseudo image
    import { getArtwork } from '@/assets/API calls/artworkAPI';
    import { redirect } from '@/assets/components/common/common';
    import moment from 'moment';
import { format } from '@/assets/components/view-artwork/Functions';

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
            format,
        }
    };
</script>

<template>
    <div class="container">
        <Header type="user" :isMap="true" />

        <div class="content">
            <!-- image -->
            <div class="img-cont">
                <img v-if="artwork.image" class="box-shadow" :src="artwork.image" :alt="artwork.title" />
            </div>

            <!-- art title -->
            <div :class="!artwork.title ? 'placeholder' : 'subtitle'">
                <h3 style="font-weight: bolder;">
                        {{ artwork.title }} ({{ format(artwork.date_published, 'YYYY') }})
                </h3>
                
                <text>
                    by 
                    <b style="font-weight: bold;">
                        {{ artwork.artist_name }}
                    </b> 
                </text>
            </div>

            <!-- art details -->
            <div :class="!artwork.medium ? 'details placeholder' : 'details'">
                <text>Medium</text>
                <text style="font-weight: bold;">
                    {{ artwork.medium ? artwork.medium : 'loading' }}
                </text>

                <text>Dimensions</text>
                <text style="font-weight: bold;">
                    {{ this.artwork.dimen_length_cm }} x 
                    {{ this.artwork.dimen_width_cm }} 
                    {{ this.artwork.dimen_height_cm ? "x " + this.artwork.dimen_height_cm : null }} cm
                </text>
            </div>

            <!-- description -->
            <div :class="!artwork.description ? 'description placeholder' : 'description'">
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

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 30px;
    }

    .content .img-cont {
        width: 20rem;
        height: 20rem;
        border-radius: 5px;

        background-color: var(--color-primary-cont);
    }

    .img-cont img {
        height: 100%;
        width: 100%;

        border-radius: 10px;
    }

    .subtitle {
        text-align: center;
    }

    .details {
        display: flex;
        flex-direction: column;
        align-items: center;

        /* margin-bottom: 20px; */
    }

    .description {
        text-align: justify;
        padding: 5px;

        height: 10em;
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
            width: 60dvw;
        }

        .content {
            width: 70%;
        }

        .content .img-cont {
            width: 28rem;
            height: 28rem;
        }
    }
</style>