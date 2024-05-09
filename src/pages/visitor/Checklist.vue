<script>
    import Footer from '@/assets/components/common/Footer.vue';
    import Header from '@/assets/components/common/Header.vue';
    import { getToken } from '@/assets/components/common/common';
    import { getSection, getChecklist, editChecklist } from '@/assets/API calls/sectionAPI';
    import { redirect } from '@/assets/components/common/common';
    import NoContent from '@/assets/components/common/NoContent.vue';
    import Welcome from '@/assets/components/common/Welcome.vue';

    // pseudo image
    
    export default {
        components: {
            Header,
            Footer,
            NoContent,
            Welcome
        },

        data() {
            return {
                artworks: [],
                section_id: this.$route.params.section_id,
                section_name: "",
                isReady: false,
            }
        },

        async mounted() {
            // get section name
            const getSectionName = await getSection(this.section_id, "visitor");
            this.section_name = getSectionName.section[0].section_name;

            // get artworks
            this.artworks = await getChecklist(this.section_id, getToken('visitor'));

            this.isReady = true;
        },
        
        methods: {
            redirect,

            async updateChecklist(id) {
                const art = this.artworks.find(art => art.art_id === id);
                art.visit_type = "manual";
                art.is_visited = art.is_visited === null ? true : !art.is_visited;
                const res = await editChecklist(art);

                if(res) {
                    this.artworks = await getChecklist(this.section_id, getToken('visitor'));
                }
            }
        }
    }
</script>

<template>
    <Welcome v-if="!isReady" :start="!isReady" />
    <div v-else class="container">
        <Header type="user" :isMap="false" />

        <div class="content">
            <!-- subheader -->
            <h1>Artwork Checklist</h1>
            <h1 style="color: var(--color-accent)">{{ section_name }}</h1>

            <!-- checklist -->
            <div class="checklist">
                <no-content v-if="!artworks.length" class="no-art" />
                <div class="list" v-else v-for="art in artworks" :key="art.art_id">
                    <div className="checkbox-cont" @click="updateChecklist(art.art_id)">
                        <input :id="art.art_id" type="checkbox" v-model="art.is_visited" />
                    </div>
                    <text class="details"  @click="redirect('/view/' + art.art_id)">
                        {{ art.title }} ({{ art.date_published }}) by {{ art.artist_name }}
                    </text>
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
        height: 65dvh;
        margin-top: 20px;

        overflow-y: auto;
    }

    .no-art {
        margin-top: 10dvh;
    }

    .list {
        border-bottom: 1px solid rgba(0, 0, 0, 0.53);
        /* padding: 10px 0; */

        display: flex;
        align-items: center;
        cursor: default;
    }

    .details {
        cursor: pointer;
        font-weight: bold;
    }

    .list:hover {
        background-color: var(--color-primary-darker);
    }

    .list .checkbox-cont {
        cursor: pointer;
        padding: 20px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .list input:checked {
        accent-color: var(--color-secondary);
    }

    /* CSS STYLING FOR RESPONSIVENESS */
    @media screen and (min-width: 650px) {
        .container {
            width: 60dvw;
        }

        .content {
            width: 70%;
        }
    }
</style>