<script>
    import Header from '@/assets/components/Header.vue';
    import Modal from '@/assets/components/Modal.vue';
    import { useModal } from 'vue-final-modal';
    import { useRouter } from 'vue-router';

    // pseudo image
    import artImage from '@/assets/images/artwork.png'

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
        },

        data() {
            return {
                // pseudo art details
                artwork: {
                    imgURL: artImage,
                    title: "Fruit Seller",
                    year: "1954",
                    artist: "Fernando Amorsolo",
                    medium: "Oil on Canvas",
                    section: "Section II",
                    width: 97,
                    height: 71.5,
                    description: "Fruit Seller is one of Amorsolo’s paintings that portrays a woman selling fruits in a basket, with a bamboo tree in the background. It reflects his style of using natural light and vibrant colors to create a realistic and idealized image of Filipino life. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex"
                },
            };
        },

        methods: {
            redirect(path) {
                if(path === 'back')
                    this.$router.back();
                else
                    this.$router.push(path);
            },

            openModal() {
                open();
            }
        }
    }
</script>

<template>
    <div class="container">
        <Header />

        <div class="content">
            <!-- art title -->
            <div class="subtitle">
                <h3 style="font-weight: bolder;">{{ this.artwork.title }} ({{ this.artwork.year }})</h3>
            </div>
            
            <!-- image -->
            <img :src="this.artwork.imgURL" :alt="this.artwork.title" />

            
            <!-- art details -->
            <div class="details">
                <text>Artist Name</text>
                <text class="data">{{ this.artwork.artist }}</text>
                
                <text>Date Published</text>
                <text class="data">{{ this.artwork.year }}</text>

                <text>Medium</text>
                <text class="data">{{ this.artwork.medium }}</text>

                <text>Assigned Section</text>
                <text class="data">{{ this.artwork.section }}</text>

                <text>Length (cm)</text>
                <text class="data">{{ this.artwork.length ? this.artwork.length : 'N/A' }}</text>

                <text>Width (cm)</text>
                <text class="data">{{ this.artwork.width }}</text>

                <text>Height (cm)</text>
                <text class="data">{{ this.artwork.height }}</text>

                <text>Description</text>
                <text class="data">"{{ this.artwork.description }}"</text>

                <text>Remarks</text>
                <text class="data">{{ this.artwork.remarks ? '"' + this.artwork.remarks + '"' : 'N/A' }}</text>
            </div>

            <div class="buttons">
                <button class="edit" type="button" @click="redirect('../edit/1')">
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