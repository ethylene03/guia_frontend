<script>
    import Footer from '@/assets/components/common/Footer.vue';
    import Header from '@/assets/components/common/Header.vue';
    import NoContent from '@/assets/components/common/NoContent.vue';
    import MagnifyIcon from 'icons/Magnify.vue';

    import { redirect } from '@/assets/components/common/common';
    import { getAllArtworks } from '@/assets/API calls/artworkAPI.js';

    export default {
        components: {
            Header,
            Footer,
            NoContent,
            MagnifyIcon
        },

        data() {
            return {
                // pseudo data for artworks
                artworks: [],
                // model for the search bar
                searchedText: '',
                isReady: false,
            };
        },

        async mounted() {
            const arts = await getAllArtworks('visitor');
            // console.log(arts);
            this.artworks = arts;

            this.isReady = true;
        },

        methods: {
            redirect,
        },

        computed: {
            // returns the artworks filtered on every change found in the search bar
            filteredArts() {
                const filteredArtworks = this.artworks.filter(art => {
                    for (const key in art) { // gets the key in each art in artworks
                        if (key === 'title' || key === 'artist' || key === 'year') // checks match in title, artist, or year
                            if (art[key].toLowerCase().includes(this.searchedText.toLowerCase()))
                                return true;
                    }
                    return false;
                });

                return filteredArtworks;
            }
        }
    };
</script>

<template>
    <Welcome v-if="!isReady" :start="!isReady" />
    <div v-else class="container">
        <Header type="user" :isMap="true" />

        <div class="screen-body">
            <h1>Search Artwork</h1>

            <!-- searchbar -->
            <div class="search-bar">
                <input type="text" v-model="searchedText" placeholder="Search an Artwork" />
                <magnify-icon fillColor="var(--color-primary)" title="search artwork" :size="20" style="display: flex;" />
                <!-- <img src="/icons/search-light.svg" alt="search artwork" /> -->
            </div>

            <!-- filtered content -->
            <ul class="content">
                <no-content v-if="filteredArts.length === 0" class="error-message" />
                <li v-else class="art" v-for="art in filteredArts" :key="art.id" @click="redirect('/view/' + art.id)">
                    {{ art.title }} ({{ art.year }}) by {{ art.artist }}
                </li>
            </ul>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
    .screen-body {
        width: 90%;

        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 3.2rem;
    }

    .search-bar {
        background-color: var(--color-surface);
        border: 2px solid var(--color-secondary);
        border-radius: 10px;

        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 10px;
        margin: 10px 0 10px 0;
    }

    .search-bar input {
        width: 100%;
        height: 100%;
        border-radius: 10px;

        padding: 5px 10px;
        background-color: transparent;
        border: none;
        outline: none;
        color: var(--color-primary);
        font-family: Inter, sans-serif;
    }

    .search-bar input::placeholder {
        color: var(--color-primary);
    }
    .content {
        list-style-type: none;
        border: 1px solid black;
        border-radius: 10px;

        width: 100%;
        height: 65dvh;
        margin-top: 10px;
        padding: 0px;

        overflow-y: auto;
    }

    .content:has(.error-message) {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .art {
        border-bottom: 1px solid #00000087;
        padding: 5px 10px;
        cursor: pointer;
        text-transform: capitalize;
    }

    .art:hover {
        background-color: var(--color-primary-darker);
    }

    @media screen and (min-width: 650px) {
        .container {
            width: 60dvw;
        }

        .screen-body {
            width: 70%;
        }
    }
</style>