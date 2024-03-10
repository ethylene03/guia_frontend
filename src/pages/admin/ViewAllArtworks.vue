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

    export default {
        components: {
            Header,
            Footer,
            SortIcon,
            FilterIcon,
            PlusIcon,
            Welcome,
            NoContent
        },

        data() {
            return {
                // data for artworks
                artworks: [],

                // page loader
                pageLoad: false,
            }
        },

        async mounted() {
            this.pageLoad = true;

            const AllArtworks = await GET('artwork/get/all');
            // console.log(AllArtworks);

            if(AllArtworks.status === 200) {
                const arts = AllArtworks.data.artworks;
                this.artworks = arts.map(art => {
                    let artwork = {};

                    artwork.id = art.art_id;
                    artwork.img = art.images.find(img => img.is_thumbnail === true);
                    artwork.title = art.title;
                    artwork.artist = art.artist_name;
                    artwork.year = art.date_published;

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
                setTimeout(() => this.$router.back(), 1000);
            }

            this.pageLoad = false;
        },

        methods: {
            // redirect to different pages
            redirect(path) {
                window.location.href = path;
            }
        },
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
                    <sort-icon title="sort artworks" fillColor="var(--color-secondary)" :size="30" />
                    <!-- <img src="/icons/sort.svg" alt="sort artworks" title="Sort artworks" /> -->
                    <filter-icon title="filter artworks" fillColor="var(--color-secondary)" :size="30" />
                    <!-- <img src="/icons/filter.svg" alt="filter artworks" title="Filter artworks" /> -->
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
                <no-content v-if="artworks.length === 0" class="error-message" />
                <div v-else class="art-card" v-for="art in artworks" :key="art.id" @click="redirect('./' + art.id)">
                    <!-- art image -->
                    <img :src="art.img?.image_link ? art.img.image_link : '/icons/image.svg'" :alt="art.title" />
    
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