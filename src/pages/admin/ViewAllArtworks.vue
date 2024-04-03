<script>
    import NoContent from '@/assets/components/common/NoContent.vue';
    import Welcome from '@/assets/components/common/Welcome.vue';
    import PlusIcon from 'icons/Plus.vue';
    import Footer from '../../assets/components/common/Footer.vue';
    import Header from '../../assets/components/common/Header.vue';
    import Title from '../../assets/components/all-artworks/Title.vue';
    import Artworks from '../../assets/components/all-artworks/Artworks.vue';

    import { getAllArtworks } from '@/assets/API calls/artworkAPI';
    import { redirect } from '@/assets/components/common/common';

    export default {
        components: {
            Header,
            Footer,
            PlusIcon,
            Welcome,
            NoContent,
            Title,
            Artworks
        },

        data() {
            return {
                // data for artworks
                artworks: [],

                // page loader
                pageLoad: false,

                // filter
                filterType: "All",
            }
        },

        async mounted() {
            this.pageLoad = true;

            this.artworks = await getAllArtworks();
            console.log(this.artworks);

            this.pageLoad = false;
        },

        methods: {
            redirect,
        },

        computed: {
            filteredArt() {
                if(this.filterType === "All") {
                    return this.artworks;
                } else if(this.filterType === "Before 1900s") {
                    return this.artworks.filter(art => art.year < 1900);
                } else if(this.filterType === "1900-1950") {
                    return this.artworks.filter(art => art.year <= 1950 && art.year >= 1900);
                } else if(this.filterType === "1950-2000") {
                    return this.artworks.filter(art => art.year <= 2000 && art.year >= 1950);
                } else if(this.filterType === "2000-2010") {
                    return this.artworks.filter(art => art.year <= 2010 && art.year >= 2000);
                } else if(this.filterType === "2010-2020") {
                    return this.artworks.filter(art => art.year <= 2020 && art.year >= 2010);
                } else if(this.filterType === "2020-Present") {
                    return this.artworks.filter(art => art.year >= 2020);
                }
            }
        }
    };
</script>

<template>
    <Welcome v-if="pageLoad" :start="pageLoad" />
    <div v-else class="container">
        <!-- header -->
        <Header />
        <div class="contents">
            <!-- Title and Filters -->
            <Title :filteredArt="filteredArt" @filterType="filterType = $event" />
    
            <!-- add artwork button -->
            <button class="add-artwork" @click="redirect('../add')" title="Add new artwork" >
                <plus-icon fillColor="var(--color-primary)" :size="20" style="display: flex; margin-right: 10px;" />
                Add Artwork
            </button>
    
            <!-- list of artworks -->
            <div class="artworks-cont">
                <no-content v-if="filteredArt.length === 0" class="error-message" />
                <Artworks v-else :filteredArt="filteredArt" />
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
    .container {
        justify-content: flex-start;
    }

    .contents {
        width: 100%;
    }

    .add-artwork {
        background: var(--color-secondary);
        color: var(--color-primary);
        cursor: pointer;

        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }

    .add-artwork:hover {
        background-color: var(--color-secondary-darker);
    }

    .add-artwork img {
        margin-right: 10px;
        height: 1.1em;
    }

    .artworks-cont {
        width: 100%;
        margin-bottom: 3.2rem;
        text-transform: capitalize;
    }

    @media screen and (min-width: 650px) {
        .container {
            width: 60vw;
        }

        .contents {
            width: 70%;
        }
    }
</style>