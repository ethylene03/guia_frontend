<script>
    import Header from '../../assets/components/Header.vue'
    import Footer from '../../assets/components/Footer.vue'
    import SortIcon from 'icons/SortVariant.vue';
    import FilterIcon from 'icons/FilterOutline.vue';
    import PlusIcon from 'icons/Plus.vue';
    import Toast from '@/assets/components/Toast.vue';
    import Welcome from '@/assets/components/Welcome.vue';
    import NoContent from '@/assets/components/NoContent.vue';

    import { GET } from '@/assets/API calls/api';
    import { useModal } from 'vue-final-modal';
import { getAdminId } from '@/assets/components/common';
import moment from 'moment';

    export default {
        components: {
            Header,
            Footer,
            SortIcon,
            FilterIcon,
            PlusIcon,
            Welcome,
            NoContent,
        },

        data() {
            return {
                // data for artworks
                artworks: [],

                // page loader
                pageLoad: false,

                // sort
                sort: false,
                sortOpt: ["title", "artist", "year"],

                // filter
                filter: false,
                filterOpt: ["All", "Before 1900s", "1900-1950", "1950-2000", "2000-2010", "2010-2020", "2020-Present"],
                filterType: "All",
            }
        },

        async mounted() {
            this.pageLoad = true;

            const AllArtworks = await GET('artwork/get/all', {admin_id: getAdminId()});
            // console.log(AllArtworks);

            if(AllArtworks.status === 200) {
                const arts = AllArtworks.data.artworks;
                this.artworks = arts.map(art => {
                    let artwork = {};

                    artwork.id = art.art_id;
                    artwork.img = art.image_thumbnail;
                    artwork.title = art.title;
                    artwork.artist = art.artist_name;
                    artwork.year = moment(art.date_published).format('YYYY');

                    return artwork;
                })

                // console.log(this.artworks)
            } else {
                const {open, close} = useModal({
                    component: Toast,
                    attrs: {
                        type: 'error',
                        message: 'Error loading the artworks',
                        subtext: 'Please try again later.'
                    }
                })

                open();
                // setTimeout(() => this.$router.back(), 1000);
            }

            this.pageLoad = false;
        },

        methods: {
            // redirect to different pages
            redirect(path) {
                window.location.href = path;
            },

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

            closeDropdown() {
                this.sort = false;
                this.filter = false;
            },

            isAscending(arr, type) {
                for(let i = 1; i < arr.length;i++) {
                    if(arr[i][type].toLowerCase() < arr[i - 1][type].toLowerCase())
                        return false
                }

                return true;
            },

            sortArt(type) {
                if(this.isAscending(this.artworks, type)) {
                    this.artworks.sort((a, b) => {
                        const typeA = a[type].toLowerCase();
                        const typeB = b[type].toLowerCase();

                        if(typeA < typeB)
                            return 1;

                        if(typeA > typeB)
                            return -1;
                        
                        return 0;
                    })
                } else {
                    this.artworks.sort((a, b) => {
                        const typeA = a[type].toLowerCase();
                        const typeB = b[type].toLowerCase();

                        if(typeA < typeB)
                            return -1;

                        if(typeA > typeB)
                            return 1;
                        
                        return 0;
                    })
                }
            },

            filterArtworks(type) {
                this.filterType = type;
            }
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
            <div class="title">
                <h1>Artwork Directory</h1>
                <div class="filters">
                    <sort-icon class="sort-filter" title="sort artworks" fillColor="var(--color-secondary)" :size="30" @click="openDropdown('sort')" />

                    <!-- dropdown for sort -->
                    <div v-if="sort" class="dropdown" v-on:mouseleave="closeDropdown">
                        <text style="padding-left: 10px;">Sort by:</text>
                        <li v-for="options in sortOpt" @click="sortArt(options)">
                            {{ options }}
                        </li>
                    </div>

                    <filter-icon class="sort-filter" title="filter artworks" fillColor="var(--color-secondary)" :size="30" @click="openDropdown('filter')" />
                    
                    <!-- dropdown for filter -->
                    <div v-if="filter" class="dropdown" v-on:mouseleave="closeDropdown">
                        <text style="padding-left: 10px;">Filter by:</text>
                        <li v-for="options in filterOpt" @click="filterArtworks(options)">
                            {{ options }}
                        </li>
                    </div>
                </div>
            </div>
    
            <!-- add artwork button -->
            <button class="add-artwork" @click="redirect('../add')" title="Add new artwork" >
                <plus-icon fillColor="var(--color-primary)" :size="20" style="display: flex; margin-right: 10px;" />
                <!-- <img src="/icons/add.svg" alt="add artwork" /> -->
                Add Artwork
            </button>
    
            <!-- list of artworks -->
            <div class="artworks-cont">
                <no-content v-if="filteredArt.length === 0" class="error-message" />
                <div v-else class="art-card" v-for="art in filteredArt" :key="art.id" @click="redirect('./' + art.id)">
                    <!-- art image -->
                    <img :src="art.img ? art.img : '/icons/image.svg'" :alt="art.title" />
    
                    <!-- art details -->
                    <div class="art-deets">
                        <h2>{{ art.title }}</h2>
                        <text>{{ art.artist }}, {{ art.year }}</text>
                    </div>
                </div>
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

    .sort-filter {
        cursor: pointer;
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

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        margin-bottom: 10px;
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

    .art-card {
        border: 2px solid var(--color-secondary);
        border-radius: 5px;
        cursor: pointer;

        display: flex;
        padding: 10px;
        margin-top: 10px;
    }

    .art-card:hover {
        background: var(--color-primary-darker);
    }

    .art-card img {
        border-radius: 5px;
        margin-right: 10px;

        height: 53px;
        width: 53px;
    }

    .art-deets h2 {
        font-weight: bold;
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