<script>
    import Header from '@/assets/components/Header.vue';
    import Modal from '@/assets/components/Modal.vue';
    import Loader from '@/assets/components/Loader.vue';
    import moment from 'moment';
    import { useModal } from 'vue-final-modal';
    import { GET } from '@/assets/API calls/api.js';
    import { getMuseumId } from '@/assets/components/common';
import Toast from '@/assets/components/Toast.vue';

    const { open, close } = useModal({
        component: Modal,
        attrs: {
            logoURL: '/icons/warning.svg',
            title: 'Delete artwork?',
            action: 'delete',
            artwork: 'artwork',
            buttonLeft: 'Cancel',
            buttonRight: 'Delete',
            isSave: false,
            onLeftAction() {
                close();
            },
            onRightAction() {
                // delete here
                window.location.href = './all';
            }
        },
    });

    export default {
        components: {
            Header,
            Loader
        },

        data() {
            return {
                // pseudo art details
                artwork: {},
                pageLoad: false,
                art_id: "",
            };
        },

        async mounted() {
            this.pageLoad = true;

            // get art id from route
            const id = this.art_id = this.$route.params.id;

            // fetch artwork details
            const art = await GET('/artwork/get', {art_id: id});

            if(!art?.data) {
                const {open: errorOpen, close: errorClose} = useModal({
                    component: Toast,
                    attrs: {
                        type: 'error',
                        message: 'Artwork does not exist!',
                        subtext: 'Returning you back...'
                    }
                })

                errorOpen();
                setTimeout(() => window.history.back(), 1000);
            }

            // store thumbnail and other details
            const deets = this.artwork = art.data.artwork;
            this.artwork['thumbnail'] = deets.images.find(data => data.is_thumbnail === true);
            
            // fetch section name
            const section = await GET('/section/get', {
                museum_id: getMuseumId('admin'),
                section_id: deets.section_id, 
            });
            this.artwork['section'] = section.data.section[0].section_name;

            this.pageLoad = false;
        },

        methods: {
            redirect(path) {
                if(path === 'back')
                    this.$router.back();
                else
                    window.location.href = path;
            },

            openModal() {
                open();
            },

            format(date, format) {
                return moment(date).format(format);
            }
        }
    }
</script>

<template>
    <Loader v-if="pageLoad" />
    <div v-else class="container">
        <Header />

        <div class="content">
            <!-- art title -->
            <div class="subtitle">
                <h3 style="font-weight: bolder;">{{ artwork.title }} ({{ format(artwork.date_published, 'YYYY') }})</h3>
            </div>
            
            <!-- image -->
            <img :src="artwork.thumbnail?.image_link" :alt="artwork.title" />

            
            <!-- art details -->
            <div class="details">
                <text>Artist Name</text>
                <text class="data">{{ artwork.artist_name }}</text>
                
                <text>Date Published</text>
                <text class="data">{{ format(artwork.date_published, 'MMMM D, YYYY') }}</text>

                <text>Medium</text>
                <text class="data">{{ artwork.medium }}</text>

                <text>Assigned Section</text>
                <text class="data">{{ artwork.section }}</text>

                <text>Length (cm)</text>
                <text class="data">{{ artwork.dimen_length_cm }}</text>

                <text>Width (cm)</text>
                <text class="data">{{ artwork.dimen_width_cm }}</text>

                <text>Height (cm)</text>
                <text class="data">{{ artwork.dimen_height_cm ? artwork.dimen_height_cm : 'N/A' }}</text>

                <text>Description</text>
                <text class="data">"{{ artwork.description }}"</text>

                <text>Remarks</text>
                <text class="data">{{ artwork.additional_info ? '"' + artwork.additional_info + '"' : 'N/A' }}</text>
            </div>

            <div class="buttons">
                <button class="edit" type="button" @click="redirect('../edit/' + art_id)">
                    <img src="/icons/edit.svg" alt="edit" />
                    Edit
                </button>
    
                <button class="delete" type="button" @click="openModal">
                    <img src="/icons/delete.svg" alt="delete" />
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
    }

    .content img {
        width: 100%;
        margin-bottom: 50px;
        border-radius: 5px;
    }

    .subtitle {
        text-align: center;
        margin-bottom: 20px;
    }

    .details {
        display: flex;
        flex-direction: column;
        align-items: left;

        margin-bottom: 20px;
    }

    .details .data {
        font-weight: bold;
        margin-bottom: 15px;
    }

    .details .data::first-letter {
        text-transform: capitalize;
    }

    .description {
        text-align: justify;
        padding: 5px;

        height: 12em;
        overflow-y: auto;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .edit, .delete {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        color: var(--color-primary);
        cursor: pointer;

        margin: 20px 0 30px 0;
    }

    .edit {
        background-color: var(--color-accent);
        margin-right: 20px
    }

    .edit:hover {
        background-color: var(--color-accent-darker);
    }

    .delete {
        background-color: var(--color-error);
    }

    .delete:hover {
        background-color: var(--color-error-darker);
    }

    .edit img, .delete img {
        height: 20px;
        width: auto;
        margin: 0 10px 0 0;
    }

    @media screen and (min-width: 650px) {
        .container {
            width: 60vw;
        }

        .content {
            width: 70%;
        }
    }
</style>