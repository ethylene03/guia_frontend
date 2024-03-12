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
    import OpenIcon from 'icons/OpenInNew.vue'

    export default {
        components: {
            OpenIcon,
        },

        props: {
            type: {
                type: String,
                default: "images", // number, images, sections
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

            artworks: {
              type: Array,
              default: [
                { art_id: -1, image_thumbnail: '', title:'' },
              ],
            },

            sections: {
              type: Array,
              default: [
                { section_id: -1, section_name: "No Data Available", museum_id: 0 },
              ],
            },
         },

        methods: {
          // redirect to artwork view page
          handleClickImage(art_id) {
            window.location.href = "/on-cloud-nine/view/"+art_id;
          },
        }

    };
</script>

<template>
    <div class="card-container">
        <div v-if="type=='number'" class="num-display">
            <p class="number-displayed">{{ number }}</p>
        </div>

        <div v-else-if="type=='images'" class="gallery-display">
            <p v-if="artworks.length < 1" class="card-no-data">No visitors yet.</p>
            <div class="artworks" v-for="art in artworks" :key="art.art_id">
                <img :src="art.image_thumbnail" @click="handleClickImage(art.art_id)" alt="image" />
                <open-icon :size="20" class="icon" />
            </div> 
        </div>

        <div v-else-if="type == 'sections'" class="section-display">
          <p v-if="sections.length < 1" class="card-no-data">No visitors yet.</p>
          <div
            v-for="section in sections"
            :key="section.section_id"
            class="section-display-label"
          >
        {{ section.section_name }}
      </div>
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
        -webkit-text-stroke: 3px var(--color-secondary);
    }

    .gallery-display {
        width: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .artworks {
        position: relative;
        border: 1.5px solid var(--color-primary);
        background-color: var(--color-primary);
        border-radius: 5px;
        overflow: hidden;
        line-height: 0;
    }

    .artworks img {
        height: 80px;
    }

    .artworks .icon {
        position: absolute;
        bottom: 5px;
        left: 5px;
        z-index: 99;

        color: var(--color-primary);
    }

    .section-display {
      width: 100%;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }

    .section-display-label {
      height: 70px;
      min-width: 70px;
      background-color: var(--color-tertiary-darker);
      border: 1.5px solid var(--color-primary);
      color: var(--color-primary);
      border-radius: 5px;
      font-size: 15px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-no-data {
      color: var(--color-primary);
    }



    @media screen and (min-width: 650px) {
        .card-container {
            width: 90%;
            height: 200px;
            text-align: center;
        }

        .artworks img {
            cursor: pointer;
            opacity: 90%;
        }

        .artworks img:hover {
            opacity: 100%;
        }
    }
</style>