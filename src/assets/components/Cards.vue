<!-- CARDS for dashboard
    Summary:
        used for repeated card frames for dashboard.
        Needed Attributes:
            1. isNum - if number will be displayed
            2. number - the number to be displayed
            3. 
            4. label - label of each card
        
    To Use:
        in script tags:
            import Cards from "../../assets/components/Cards.vue"

            export default {
                components: {
                    ...,
                    Cards,
                },
            };

        in template tags:
            <Cards :isNum="true" :number="103" label="Artworks in the Directory"/>
            <Cards :isNum="false" label="Most Popular Artworks"/>

-->
<script>
    export default {
        props: {
            isNum: {
                type: Boolean,
                default: false,
            },

            number: {
                type: Number,
                default: 0,
            },

            label: {
                type: String,
                default: 'label',
            },

            image1: {
                type: String,
                default: '/icons/guia.svg',
            },

            image2: {
                type: String,
                default: '/icons/guia.svg',
            },

            image3: {
                type: String,
                default: '/icons/guia.svg',
            },
        },
    };
</script>

<template>
    <div class="card-container">
        <div v-if="isNum" class="num-display">
            <p class="number-displayed">{{ number }}</p>
        </div>

        <div v-else class="gallery-display">
            <img :src="image1" @click="handleClickImage(image1)" alt="artwork" /> 
            <img :src="image2" @click="handleClickImage(image2)" alt="artwork" /> 
            <img :src="image3" @click="handleClickImage(image3)" alt="artwork" /> 
        </div>

        <div class="card-label">
            <h2>{{ label }}</h2>
        </div>
    </div>
</template>

<style scoped>
    .card-container {
        background-color: var(--color-surface);
        border: 2px solid var(--color-secondary);
        border-radius: 5px;

        width: 100%;
        height: 140px;
        margin-top: 10px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .card-label {
        background-color: var(--color-tertiary);
        width: 99%;
        margin: 2px;

        border-radius: 5px;
        color: var(--color-primary);
        text-align: center;
        padding: 3px 0;
    }

    .num-display {
        margin: auto;
    }

    .number-displayed {
        font-family: Inter, sans-serif;
        font-size: 60px;
        font-weight: 700;
        color: var(--color-primary);
        -webkit-text-stroke: 4px var(--color-secondary);
    }

    .gallery-display {
        width: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .gallery-display img {
        height: 70px;
        background-color: var(--color-primary);
        border: 1.5px solid var(--color-primary);
        border-radius: 5px;
    }

    @media screen and (min-width: 650px) {
        .card-container {
            width: 90%;
            height: 200px;
            text-align: center;
        }

        .gallery-display img {
            height: 60px;
            padding: 10px;
        }
    }
</style>