<script>
    // header component
    import Header from '@/assets/components/Header.vue';

    // modal component
    import { useModal } from 'vue-final-modal';
    import Modal from '../../assets/components/Modal.vue';
import { POST } from '@/assets/API calls/api';
import { getAdminId } from '@/assets/components/common';
import axios from 'axios';

    const { open: openCancelModal, close: closeCancelModal } = useModal({
        component: Modal,
        attrs: {
            logoURL: '/icons/warning.svg',
            title: 'Cancel artwork?',
            action: 'discard',
            artwork: 'artwork',
            buttonLeft: 'No',
            buttonRight: 'Yes',
            rightPath: 'back',
            isSave: false,
            onLeftAction() {
                closeCancelModal();
            },
        },
    });

    export default {
        components: {
            Header,
        },

        data() {
            // array of images uploaded
            return {
                images: [],
                artwork: {
                    thumbnail: null,
                    artwork_title: null,
                    artist: null,
                    date_published: null,
                    medium: null,
                    section: null,
                    length: null,
                    width: null,
                    description: null,
                },
                artworkErr: {
                    thumbnail: null,
                    artwork_title: true,
                    artist: true,
                    date_published: true,
                    medium: true,
                    section: true,
                    length: true,
                    width: true,
                    description: true,
                },
                hasExceeded: false,
                isSaved: false,
            };
        },

        methods: {
            // bind button to forms
            chooseFiles() {
                document.getElementById('fileUpload').click();
            },

            // redirect to another page
            redirect(path) {
                if(path == 'back')
                    this.$router.back();
                else
                    this.$router.push(path);
            },

            // opens modal
            openModal() {
                openCancelModal();
            },

            // receives images uploaded
            receiveFiles(event) {
                const files = event.target.files;

                // limit files to 10 only
                if(this.images.length >= 10) {
                    this.hasExceeded = true;
                    return; // break the function
                }

                // remaining files to accept
                const upload = Array.from(files).slice(0, 10 - this.images.length);

                for (let i = 0; i < upload.length; i++) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        this.images.push({
                            src: e.target.result,
                            name: files[i].name,
                            file: files[i],
                        });
                    };

                    reader.readAsDataURL(files[i]);
                }
            },

            // deletes images from the array
            handleDeleteImage(image, index) {
                this.images.splice(index, 1);
                if(this.artwork.thumbnail === image.name)
                    this.artwork.thumbnail = null;
            },

            saveArtwork() {
                this.isSaved = true;
                const art = this.artworkErr;

                if(!art.artwork_title &&
                    !art.artist &&
                    !art.date_published &&
                    !art.medium &&
                    !art.section &&
                    !art.length &&
                    !art.width &&
                    !art.description &&
                    !art.thumbnail) {
                        
                        // this.$router.push('./view/1');
                    } else {
                    console.log("error!");
                }
            },

            handleChange(e) {
                const input = e.target;
                
                if(input.id === 'date_published') {
                    const year = /^((1[2-9]\d{2})|20[0-1][0-9]|202[0-4])$/;
                    const month = /^(0[1-9]|1[0-2])-((1[2-9]\d{2})|20[0-1][0-9]|202[0-4])$/;
                    const day = /^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-((1[2-9]\d{2})|20[0-1][0-9]|202[0-4])$/;

                    if(year.test(input.value) || month.test(input.value) || day.test(input.value)) {
                        this.artwork[input.id] = input.value;
                        this.artworkErr[input.id] = false;
                    } else
                        this.artworkErr[input.id] = true;
                } else {
                    if(input.type === 'number') {
                        const limit = /^[1-9]\d*(\.\d*[1-9])?$/;

                        if(limit.test(input.value)) {
                            this.artwork[input.id] = input.value;
                            this.artworkErr[input.id] = false;
                        } else {
                            // console.log(input.id, input.value)
                            if(input.id === 'height') {
                                if(input.value === "")
                                    this.artworkErr[input.id] = false;
                            } else
                                this.artworkErr[input.id] = true;
                        }
                    } else if(input.id === "thumbnail") {
                        if(input.checked === false)
                            this.artwork.thumbnail = null;
                        else
                            this.artwork.thumbnail = input.value;
                    } else {
                        this.artwork[input.id] = input.value;

                        if(input.value == "") 
                            this.artworkErr[input.id] = true;
                        else
                            this.artworkErr[input.id] = false;
                    }
                }
            }
        },
    };
</script>

<template>
    <div class="container">
        <Header />
        <div class="input-form">
            <h1>Add New Artwork</h1>
            
            <!-- input for upload file -->
            <input id="fileUpload" type="file" accept="image/*" @change="receiveFiles" multiple hidden /> 
            
            <!-- upload file container if no images yet -->
            <div v-if="images.length === 0" class="upload-cont" >
                <img src="/icons/image.svg" alt="upload image" :style="{marginBottom: '10px'}" />
                <text>Upload Image</text>
            </div>

            <!-- upload file container if there is image/s -->
            <div v-else class="image-cont">
                <div v-for="(image, index) in images" :key="index" class="image-frame">
                    <img :src="image.src" alt="image.name">
                    <text class="img-name">{{ image.name }}</text>
                    <text class="img-delete" @click="handleDeleteImage(image, index)">Delete</text>
                    <input id="thumbnail" :value="image.name" type="checkbox" @input="handleChange"
                        :disabled="artwork.thumbnail != null && artwork.thumbnail != image.name"
                        :style="{marginTop: '10px'}"
                        :checked="artwork.thumbnail === image.name"  />
                </div>
            </div>
            <text>Please tick the image that you want to be displayed.<br/></text>
            <text v-if="hasExceeded" :style="{color: 'red', fontSize: '13px'}">Oh no! Can't upload more than 10 images.</text>
            <text v-if="isSaved || !hasExceeded && images.length > 0 && images.length < 10" :style="{color: 'red', fontSize: '13px'}">Please upload {{ 10 - this.images.length }} more images.</text>

            <!-- binded upload button -->
            <button @click="chooseFiles()" class="upload-btn">
                <img src="/icons/upload.svg" alt="upload image" :style="{marginRight: '10px'}" />
                Upload Photos
            </button> 

            <!-- form -->
            <div class="form-cont" :style="{width: '100%'}">
                <h2>Artwork Title<span :style="{color: 'var(--color-error)'}">*</span></h2>
                <input type="text" id="artwork_title" @input="handleChange" class="primary-form" required />
                <span v-if="this.artworkErr.artwork_title && this.isSaved" :style="{color: 'red', fontSize: '13px'}">Please input the artwork's title.</span>
                
                <h2>Artist Name<span :style="{color: 'var(--color-error)'}">*</span></h2>
                <input type="text" id="artist" @input="handleChange" class="primary-form" required />
                <span v-if="this.artworkErr.artist && this.isSaved" :style="{color: 'red', fontSize: '13px'}">Please input the artwork's artist name.</span>
                
                <h2>Date Published<span :style="{color: 'var(--color-error)'}">*</span></h2>
                <input type="text" id="date_published" @input="handleChange" class="primary-form" placeholder="YYYY or MM-YYYY or MM-DD-YYYY" required />
                <span v-if="this.artworkErr.date_published && this.isSaved" :style="{color: 'red', fontSize: '13px'}">Please input the artwork's correct date published.</span>
                
                <h2>Medium<span :style="{color: 'var(--color-error)'}">*</span></h2>
                <input type="text" id="medium" @input="handleChange" class="primary-form" required />
                <span v-if="this.artworkErr.medium && this.isSaved" :style="{color: 'red', fontSize: '13px'}">Please input the artwork's correct medium.</span>
                
                <!-- select form (must map the options for integration) -->
                <h2>Assigned Section<span :style="{color: 'var(--color-error)'}">*</span></h2>
                <select id="section" @input="handleChange" class="primary-form" required>
                    <option value="0" hidden>Select Section</option>
                    <option value="1">Section I</option>
                    <option value="2">Section II</option>
                    <option value="3">Section III</option>
                </select>
                <span v-if="this.artworkErr.section && this.isSaved" :style="{color: 'red', fontSize: '13px'}">Please input the artwork's section.</span>
                
                <h2>Length (cm)<span :style="{color: 'var(--color-error)'}">*</span></h2>
                <input type="number" id="length" @input="handleChange" min="0" class="primary-form" required />
                <span v-if="this.artworkErr.length && this.isSaved" :style="{color: 'red', fontSize: '13px'}">Please input the artwork's correct length.</span>
                
                <h2>Width (cm)<span :style="{color: 'var(--color-error)'}">*</span></h2>
                <input type="number" id="width" @input="handleChange" min="0" class="primary-form" required />
                <span v-if="this.artworkErr.width && this.isSaved" :style="{color: 'red', fontSize: '13px'}">Please input the artwork's correct width.</span>
                
                <h2>Height (cm)</h2>
                <input type="number" id="height" @input="handleChange" min="0" class="primary-form" />
                <span v-if="this.artworkErr.height && this.isSaved" :style="{color: 'red', fontSize: '13px'}">Please input the artwork's correct height.</span>
                
                <h2>Description<span :style="{color: 'var(--color-error)'}">*</span></h2>
                <textarea id="description" @input="handleChange" rows="4" class="primary-form" required></textarea>
                <span v-if="this.artworkErr.description && this.isSaved" :style="{color: 'red', fontSize: '13px'}">Please input the artwork's description.</span>
                
                <h2>Remarks</h2>
                <textarea id="remarks" @input="handleChange" rows="4" class="primary-form"></textarea>
            </div>

            <!-- buttons -->
            <div class="btn-cont">
                <button class="cancel" @click="openModal">
                    Cancel
                </button>
                
                <!-- add API validation before redirection -->
                <button class="save" @click="saveArtwork">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        align-items: flex-start;
    }

    h1 {
        margin-bottom: 20px;
    }

    h2 {
        font-weight: bold;
        margin: 10px 0 5px 0;
    }

    .input-form {
        width: 100%;
    }

    .upload-cont {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .upload-cont, .image-cont {
        border: 2px solid var(--color-secondary);
        border-radius: 5px;
        background-color: var(--color-primary);

        width: 100%;
        padding: 20px;
    }

    .upload-cont text {
        font-weight: bold;
    }

    .upload-btn {
        background-color: var(--color-secondary);
        color: var(--color-primary);
        width: 100%;
        cursor: pointer;

        margin: 15px 0 20px 0;
    }

    .upload-btn:hover {
        background-color: var(--color-secondary-darker);
    }

    .img-name {
        width: 7em;
        max-height: 25px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .img-delete {
        width: 7em;
        text-decoration: underline;
        text-align: center;

        cursor: pointer;
    }

    .img-delete:hover {
        font-weight: 600;
    }

    textarea {
        width: 100% !important;
    }

    .primary-form {
        margin-bottom: 0;
    }

    .btn-cont {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .btn-cont button {
        width: 48%;
        color: var(--color-primary);
        margin: 20px 0 40px 0;
    }

    .save {
        background-color: var(--color-secondary);
    }

    .cancel {
        background-color: var(--color-accent);
    }

    .save:hover {
        background-color: var(--color-secondary-darker);
        cursor: pointer;
    }

    .cancel:hover {
        background-color: var(--color-accent-darker);
        cursor: pointer;
    }

    .image-cont {
        min-height: 250px;
        display: flex;
        justify-content: start;
        align-items: center;
        overflow-x: auto;
    }

    .image-frame {
        width: fit-content;
        height: fit-content;
        margin-right: 30px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .image-frame img {
        width: 7em;
        height: 7em;
    }

    /* CSS for big screens */
    @media screen and (min-width: 650px) {
        .container {
            width: 60vw;
            margin: auto;
        }

        .input-form {
            width: 60%;
            margin: auto;
        }
    }
</style>