<script>
    import Header from '../../assets/components/Header.vue'

    import art1 from '../../assets/images/art1.png'
    import art2 from '../../assets/images/art2.png'
    import art3 from '../../assets/images/art3.png'

    export default {
        components: {
            Header,
        },

        data() {
            return {
                artworks: [
                    {id: 1, img: art1, title: "Spolarium", artist: "Juan Luna", year: "1884"},
                    {id: 2, img: art2, title: "Fruit Seller", artist: "Fernando Amorsolo", year: "1954"},
                    {id: 3, img: art3, title: "Bayanihan sa Bukid", artist: "Carlos Francisco", year: "1964"},
                    {id: 4, img: art2, title: "Lorem Ipsum", artist: "Name", year: "Year"},
                    {id: 5, img: art1, title: "Lorem Ipsum", artist: "Name", year: "Year"},
                    {id: 6, img: art3, title: "Lorem Ipsum", artist: "Name", year: "Year"},
                    {id: 7, title: "Lorem Ipsum", artist: "Name", year: "Year"},
                    {id: 8, title: "Lorem Ipsum", artist: "Name", year: "Year"},
                    {id: 9, title: "Lorem Ipsum", artist: "Name", year: "Year"},
                    {id: 10, title: "Lorem Ipsum", artist: "Name", year: "Year"},
                    {id: 11, title: "Lorem Ipsum", artist: "Name", year: "Year"},
                    {id: 12, title: "Lorem Ipsum", artist: "Name", year: "Year"},
                    {id: 13, title: "Lorem Ipsum", artist: "Name", year: "Year"},
                ],
            }
        },

        methods: {
            redirect(path) {
                this.$router.push(path);
            }
        },
    };
</script>

<template>
    <div class="container">
        <Header />
        <div class="contents">
            <!-- Title and Filters -->
            <div class="title">
                <h1>Artwork Directory</h1>
                <div class="filters">
                    <img src="/icons/filter.svg" alt="filter artworks" />
                    <img src="/icons/sort.svg" alt="sort artworks" />
                </div>
            </div>
    
            <!-- add artwork button -->
            <button class="add-artwork" @click="redirect('../add')">
                <img src="/icons/add.svg" alt="add artwork" />
                Add Artwork
            </button>
    
            <!-- list of artworks -->
            <div class="artworks-cont">
                <div class="art-card" v-for="art in artworks" :key="art.id" @click="redirect('./' + art.id)">
                    <img :src="art.img ? art.img : '/icons/image.svg'" :alt="art.title" />
    
                    <div class="art-deets">
                        <h2>{{ art.title }}</h2>
                        <text>{{ art.artist }}, {{ art.year }}</text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        justify-content: flex-start;
    }

    .contents {
        width: 100%;
        padding-bottom: 50px;
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