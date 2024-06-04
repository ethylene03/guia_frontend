<script>
    import NoContent from '@/assets/components/common/NoContent.vue';
    import Welcome from '@/assets/components/common/Welcome.vue';
    import PlusIcon from 'icons/Plus.vue';
    import Footer from '../../assets/components/common/Footer.vue';
    import Header from '../../assets/components/common/Header.vue';
    import Artworks from '../../assets/components/all-artworks/Artworks.vue';
    import MagnifyIcon from 'icons/Magnify.vue';
    import SortIcon from 'icons/SortVariant.vue';
    import FilterIcon from 'icons/FilterOutline.vue';

    import { getAllArtworks } from '@/assets/API calls/artworkAPI';
    import { redirect } from '@/assets/components/common/common';
    import { sortArt } from '@/assets/components/all-artworks/Functions';

    export default {
        components: {
            Header,
            Footer,
            PlusIcon,
            Welcome,
            NoContent,
            Artworks,
            MagnifyIcon,
            SortIcon,
            FilterIcon,
        },

        data() {
            return {
                // data for artworks
                artworks: [],

                // page loader
                pageLoad: false,

                // filter
                filterType: "All",
                searchedText: '',

                sort: false,
                filter: false,
    
                sortOpt: ["title", "artist", "year"],
                filterOpt: ["All", "Before 1900s", "1900-1950", "1950-2000", "2000-2010", "2010-2020", "2020-Present", "Unknown"],
            }
        },

        async mounted() {
            this.pageLoad = true;

            this.artworks = await getAllArtworks();

            this.pageLoad = false;
        },

        methods: {
            redirect,
            
            openDropdown(type) {
                if(type === 'sort') {
                    this.sort = !this.sort;
                    if(this.sort)
                        this.filter = false;
                } else {
                    this.filter = !this.filter;
                    if(this.filter)
                        this.sort = false;
                }
            },

            sortFilteredArt(option) {
                this.artworks = sortArt(this.filteredArt, option)
            }
        },

        computed: {
            filteredArt() {
                var filteredArtwork = this.artworks;

                // filter
                if(this.filterType === "All") {
                    filteredArtwork = this.artworks;
                } else if(this.filterType === "Before 1900s") {
                    filteredArtwork = this.artworks.filter(art => art.year < 1900);
                } else if(this.filterType === "1900-1950") {
                    filteredArtwork = this.artworks.filter(art => art.year <= 1950 && art.year >= 1900);
                } else if(this.filterType === "1950-2000") {
                    filteredArtwork = this.artworks.filter(art => art.year <= 2000 && art.year >= 1950);
                } else if(this.filterType === "2000-2010") {
                    filteredArtwork = this.artworks.filter(art => art.year <= 2010 && art.year >= 2000);
                } else if(this.filterType === "2010-2020") {
                    filteredArtwork = this.artworks.filter(art => art.year <= 2020 && art.year >= 2010);
                } else if(this.filterType === "2020-Present") {
                    filteredArtwork = this.artworks.filter(art => art.year >= 2020);
                } else if(this.filterType === "Unknown") {
                    filteredArtwork = this.artworks.filter(art => art.year.toLowerCase() === "unknown");
                }

                // search
                const searchArtworks = filteredArtwork.filter(art => {
                    for (const key in art) { // gets the key in each art in artworks
                        if (key === 'title' || key === 'artist' || key === 'year') // checks match in title, artist, or year
                            if (art[key].toLowerCase().includes(this.searchedText.toLowerCase()))
                                return true;
                    }
                    return false;
                });

                return searchArtworks;
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
            <!-- <Title :filteredArt="filteredArt" @filterType="filterType = $event" /> -->
            <div class="title">
                <h1>Artwork Directory</h1>
                <div class="filters">
                    <!-- sort -->
                    <sort-icon class="sort-filter" title="sort artworks" fillColor="var(--color-secondary)" :size="30" @click="openDropdown('sort')" />
                    <div v-if="sort" class="dropdown" v-on:mouseleave="sort = false">
                        <text style="padding-left: 10px;">Sort by</text>
                        <li v-for="option in sortOpt" @click="sortFilteredArt(option)">
                            {{ option }}
                        </li>
                    </div>

                    <!-- filter -->
                    <filter-icon class="sort-filter" title="filter artworks" fillColor="var(--color-secondary)" :size="30" @click="openDropdown('filter')" />
                    <div v-if="filter" class="dropdown" v-on:mouseleave="filter = false">
                        <text style="padding-left: 10px;">Filter by</text>
                        <li v-for="option in filterOpt" @click="filterType = option">
                            {{ option }}
                        </li>
                    </div>
                </div>
            </div>
    
            <!-- searchbar -->
            <div class="search-bar box-shadow">
                <input type="text" v-model="searchedText" placeholder="Search an Artwork" />
                <magnify-icon fillColor="var(--color-secondary)" title="search artwork" :size="20" style="display: flex;" />
            </div>

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

    .search-bar {
        background-color: var(--color-primary);
        border-radius: 10px;

        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 10px;
        margin: 10px 0 10px 0;
        border: 1px solid var(--color-secondary)
    }

    .search-bar input {
        width: 100%;
        height: 100%;
        border-radius: 10px;

        padding: 12px 10px;
        background-color: transparent;
        border: none;
        outline: none;
        color: var(--color-secondary);
        font-family: Inter, sans-serif;
    }

    .search-bar input::placeholder {
        color: var(--color-secondary);
    }

    .add-artwork {
        background: var(--color-secondary);
        color: var(--color-primary);
        cursor: pointer;

        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
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

    .sort-filter {
        cursor: pointer;
    }

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        margin-bottom: 10px;
    }

    .dropdown {
        z-index: 100;
        position: absolute;
        margin-right: 10px;
        right: 0;

        background-color: var(--color-primary);
        padding: 10px 0;
        border: 2px solid var(--color-secondary);
        border-radius: 5px;
    }

    .dropdown li {
        list-style-type: none;
        padding-left: 20px;
        width: 200px;

        text-transform: capitalize;
    }

    .dropdown li:hover {
        background-color: var(--color-primary-darker);
        cursor: pointer;
    }

    @media screen and (min-width: 650px) {
        .container {
            width: 60dvw;
        }

        .contents {
            width: 70%;
        }
    }
</style>