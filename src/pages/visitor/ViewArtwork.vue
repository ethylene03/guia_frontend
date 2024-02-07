<script>
    import Header from '@/assets/components/Header.vue';
    import Footer from '@/assets/components/Footer.vue';

    // pseudo image
    import artImage from '@/assets/images/artwork.png'

    export default {
        components: {
            Header, 
            Footer,
        },

        data() {
            return {
                // pseudo art details
                artwork: {
                    imgURL: artImage,
                    title: "Fruit Seller",
                    year: "1954",
                    artist: "Fernando Amorsolo",
                    medium: "Oil on Canvas",
                    width: 97,
                    height: 71.5,
                    description: "Fruit Seller is one of Amorsolo’s paintings that portrays a woman selling fruits in a basket, with a bamboo tree in the background. It reflects his style of using natural light and vibrant colors to create a realistic and idealized image of Filipino life. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex"
                },
            };
        },
    };
</script>

<template>
    <div class="container">
        <Header type="user" :isMap="true" />

        <div class="content">
            <!-- image -->
            <img :src="this.artwork.imgURL" :alt="this.artwork.title" />

            <!-- art title -->
            <div class="subtitle">
                <h3 style="font-weight: bolder;">{{ this.artwork.title }} ({{ this.artwork.year }})</h3>
                <text>by <b style="font-weight: bold;">{{ this.artwork.artist }}</b> </text>
            </div>

            <!-- art details -->
            <div class="details">
                <text>Medium</text>
                <text style="font-weight: bold;">{{ this.artwork.medium }}</text>

                <text>Dimensions</text>
                <text style="font-weight: bold;">{{ this.artwork.height }} x {{ this.artwork.width }} cm</text>
            </div>

            <!-- description -->
            <div class="description">
                <p>{{ this.artwork.description }}</p>
            </div>

            <button class="scan-again" type="button" @click="redirect('/scan')">
                <img src="/icons/scan.svg" alt="scan again" />
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