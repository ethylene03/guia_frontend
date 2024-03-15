<script>
    import Header from '@/assets/components/common/Header.vue';
    import Footer from '@/assets/components/common/Footer.vue';

    // pseudo image
    import artImage from '@/assets/images/artwork.png'

    export default {
        components: {
            Header,
            Footer,
        },

        data() {
            return {
                artworks: [
                    {id: 1, name: 'Lorem Ipsum1', year: '1967', artist: 'Ellenmarie'},
                    {id: 2, name: 'Lorem Ipsum2', year: '1967', artist: 'Ellenmarie'},
                    {id: 3, name: 'Lorem Ipsum3', year: '1967', artist: 'Ellenmarie'},
                    {id: 4, name: 'Lorem Ipsum4', year: '1967', artist: 'Ellenmarie'},
                    {id: 5, name: 'Lorem Ipsum5', year: '1967', artist: 'Ellenmarie'},
                    {id: 6, name: 'Lorem Ipsum6', year: '1967', artist: 'Ellenmarie'},
                    {id: 7, name: 'Lorem Ipsum7', year: '1967', artist: 'Ellenmarie'},
                ]
            }
        }
    }
</script>

<template>
    <div class="container">
        <Header type="user" :isMap="false" />

        <div class="content">
            <!-- subheader -->
            <h1>Artwork Checklist</h1>
            <h1>Section II</h1>

            <!-- checklist -->
            <div class="checklist">
                <div class="list" v-for="art in artworks">
                    <input :id="art.id" type="checkbox" />
                    <text style="font-weight: bold;">{{ art.name }} ({{ art.year }}) by {{ art.artist }}</text>
                </div>
            </div>
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
        margin-bottom: 3.2rem;
    }

    .checklist {
        border-radius: 5px;
        border: 2px solid var(--color-secondary);
        width: 100%;
        height: 65vh;
        margin-top: 20px;

        overflow-y: auto;
    }

    .list {
        border-bottom: 1px solid rgba(0, 0, 0, 0.53);
        padding: 10px 0 10px 20px;

        display: flex;
        align-items: center;
    }

    .list input {
        margin-right: 10px;
    }
    
    .list input:checked {
        accent-color: var(--color-secondary);
    }

    /* CSS STYLING FOR RESPONSIVENESS */
    @media screen and (min-width: 650px) {
        .container {
            width: 60vw;
        }

        .content {
            width: 70%;
        }
    }
</style>