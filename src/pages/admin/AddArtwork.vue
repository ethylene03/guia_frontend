<script>
    // header component
    import Header from '@/assets/components/common/Header.vue';

    // modal component
    import { uploadFile } from '@/assets/API calls/amazonAPI';
    import { authGET, authPOST } from '@/assets/API calls/api';
    import Loader from '@/assets/components/common/Loader.vue';
    import { getAdminId, getMuseumId } from '@/assets/components/common/common';
    import UploadOutlineIcon from 'icons/UploadOutline.vue';
    import { useModal } from 'vue-final-modal';
    import Modal from '../../assets/components/common/Modal.vue';

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
            Loader,
            UploadOutlineIcon
        },

        data() {
            // array of images uploaded
            return {
                artwork: {
                    thumbnail: null,
                    title: null,
                    artist_name: null,
                    date_published: null,
                    medium: null,
                    section_id: null,
                    dimen_length_cm: null,
                    dimen_width_cm: null,
                    description: null,
                    images: [],
                },
                sections: [],
                hasExceeded: false,
                isSaved: false,
                isSubmit: false,
                isUploading: false,
                dateCheck: true,
                numCheck: [true, true, true],
                errorAPI: '',
                hasError: false,
            };
        },

        async mounted() {
            // get sections
            const getSections = await authGET('/section/get', {museum_id: getMuseumId('admin')});
            this.sections = getSections.data.section;
        },

        methods: {
            // bind button to forms
            chooseFiles() {
                document.getElementById('fileUpload').click();
            },

            // opens modal
            openModal() {
                openCancelModal();
            },

            // receives images uploaded
            async receiveFiles(event) {
                const files = event.target.files;
                const img = this.artwork.images;
                
                this.isUploading = true;
                this.hasExceeded = false;

                // limit files to 10 only
                if(img.length >= 10) {
                    this.hasExceeded = true;
                    this.isUploading = false;
                    return; // break the function
                }

                // get remaining files to accept
                const upload = Array.from(files).slice(0, 10 - img.length);

                for (let i = 0; i < upload.length; i++) {
                    const reader = new FileReader();

                    reader.onload = async (e) => {
                        if(await uploadFile(files[i])) {
                            img.push({
                                image_link: 'artworks/' + files[i].name,
                                name: files[i].name,
                                file: reader.result
                            });    
                        }
                    };
                    
                    reader.readAsDataURL(files[i]);
                }
                
                this.isUploading = false;
            },

            // deletes images from the array
            handleDeleteImage(image, index) {
                // API for delete in amazon

                // remove pic from array
                this.artwork.images.splice(index, 1);

                // refresh thumbnail
                if(this.artwork.thumbnail === image.name)
                    this.artwork.thumbnail = null;

                // check number of images available
                if(this.artwork.images.length < 10) 
                    this.hasExceeded = false;
            },

            scrollToError() {
                // Get the error message element
                const errorMessageElement = this.$refs.errorMessage;
                if (errorMessageElement) {
                    // Scroll to the error message element
                    errorMessageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            },

            validate() {
                const input = this.artwork;
                
                // for date_published
                const year = /^((1[2-9]\d{2})|20[0-1][0-9]|202[0-4])$/;
                const month = /^(0[1-9]|1[0-2])-((1[2-9]\d{2})|20[0-1][0-9]|202[0-4])$/;
                const day = /^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-((1[2-9]\d{2})|20[0-1][0-9]|202[0-4])$/;

                if(year.test(input.date_published) || month.test(input.date_published) || day.test(input.date_published) || input.date_published?.toLowerCase() === "unknown")
                    this.dateCheck = true;
                else {
                    this.dateCheck = false;
                    this.scrollToError();
                    return false;
                }

                // number
                if(input.dimen_length_cm < 0) {
                    this.numCheck[0] = false;
                    this.scrollToError();
                    return false;
                } else if(input.dimen_width_cm < 0) {
                    this.numCheck[1] = false;
                    this.scrollToError();
                    return false;
                } else if(input.dimen_height_cm && input.dimen_height_cm < 0) {
                    this.numCheck[2] = false;
                    this.scrollToError();
                    return false;
                }

                // others 
                if(!input.title || !input.artist_name || !input.date_published || !input.medium || 
                    !input.section_id || !input.dimen_length_cm || !input.dimen_width_cm || !input.description || 
                    !input.thumbnail || input.images.length != 10) {
                        this.scrollToError();
                        return false;
                }

                return true;
            },

            async saveArtwork() {
                const amazonUrl = "artworks/";
                this.isSaved = true;
                this.isSubmit = true;

                if(this.validate()) {
                    this.hasError = false;
                    const art = this.artwork;

                    const images = art.images.map(img => amazonUrl + img.name);
                    const thumb = amazonUrl + art.thumbnail;

                    art.images = images;
                    art.thumbnail = thumb;
                    art.added_by = getAdminId();
                    art.dimen_height_cm = art.dimen_height_cm === "" ? null : art.dimen_height_cm;

                    // console.log(art);

                    // create artwork
                    const create = await authPOST('/artwork/create', art);
                    // console.log(create);

                    if(create.status < 300 )
                        window.location.href = './view/' + create.data.artwork_id;
                    else {
                        this.errorAPI = create.response.data.detail;
                        this.isSubmit = false;
                    }
                } else {
                    this.isSubmit = false;
                    this.hasError = true;
                }
            },

            handleChange(e) {  
                const input = e.target;  
    
                if(input.checked === false)
                    this.artwork.thumbnail = null;
                else
                    this.artwork.thumbnail = input.value;
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
            <input id="fileUpload" type="file" accept="image/jpeg" @change="receiveFiles" multiple hidden /> 
            
            <!-- upload file container if no images yet -->
            <div v-if="artwork.images.length === 0" class="upload-cont" >
                <img src="/icons/image.svg" alt="upload image" :style="{marginBottom: '10px'}" />
                <text>Upload Image</text>
            </div>

            <!-- upload file container if there is image/s -->
            <div v-else class="image-cont">
                <div v-for="(image, index) in artwork.images" :key="index" class="image-frame">
                    <img :src="image.file" alt="image.name">
                    <text class="img-name">{{ image.name }}</text>

                    <!-- delete and checkbox -->
                    <text class="img-delete" @click="handleDeleteImage(image, index)">Delete</text>
                    <input id="thumbnail" 
                        type="checkbox" 
                        :value="image.name" 
                        :disabled="artwork.thumbnail != null && artwork.thumbnail != image.name"
                        :style="{marginTop: '10px'}"
                        :checked="artwork.thumbnail === image.name"
                        @input="handleChange"
                    />
                </div>
                <div v-if="isUploading" class="image-frame">
                    <Loader />
                </div>
            </div>

            <!-- photo validation -->
            <text style="font-size: 13px;">Please tick the image that you want to be displayed.<br/></text>
            <text style="font-weight: bold;">Image Uploaded: {{ artwork.images.length }} / 10<br/></text>
            <text ref="errorMessage" v-if="hasExceeded" class="val-error">Oh no! Can't upload more than 10 images.</text>
            <span ref="errorMessage" v-if="isSaved && !hasExceeded && 0 <= artwork.images.length && artwork.images.length < 10" class="val-error">Please upload {{ 10 - artwork.images.length }} more images.<br/></span>
            <span ref="errorMessage" v-if="isSaved && !artwork.thumbnail" class="val-error">Please choose a thumbnail.</span>

            <!-- binded upload button -->
            <button @click="chooseFiles()" class="upload-btn">
                <upload-outline-icon title="upload image" fillColor="var(--color-primary)" :size="20" style="display: flex; margin-right: 10px;" />
                <!-- <img src="/icons/upload.svg" alt="upload image" :style="{marginRight: '10px'}" /> -->
                Upload Photos
            </button> 

            <!-- form -->
            <div class="form-cont" :style="{width: '100%'}">
                <!-- title -->
                <h2>Artwork Title<span class="asterisk">*</span></h2>
                <input type="text" v-model="artwork.title" class="primary-form" required />
                <span ref="errorMessage" v-if="!artwork.title && this.isSaved" class="val-error">Please input the artwork's title.</span>
                
                <!-- artist name -->
                <h2>Artist Name<span class="asterisk">*</span></h2>
                <input type="text" v-model="artwork.artist_name" class="primary-form" required />
                <span ref="errorMessage" v-if="!artwork.artist_name && this.isSaved" class="val-error">Please input the artwork's artist name.</span>
                
                <!-- date published -->
                <h2>Date Published<span class="asterisk">*</span></h2>
                <input type="text" v-model="artwork.date_published" class="primary-form" placeholder="YYYY or MM-YYYY or MM-DD-YYYY or unknown" required />
                <span ref="errorMessage" v-if="!artwork.date_published && this.isSaved" class="val-error">Please input the artwork's correct date published.</span>
                
                <!-- medium -->
                <h2>Medium<span class="asterisk">*</span></h2>
                <input type="text" v-model="artwork.medium" class="primary-form" required />
                <span ref="errorMessage" v-if="!artwork.medium && this.isSaved" class="val-error">Please input the artwork's correct medium.</span>
                
                <!-- section id -->
                <h2>Assigned Section<span class="asterisk">*</span></h2>
                <select v-model="artwork.section_id" class="primary-form" required>
                    <option value="0" hidden>Select Section</option>
                    <option v-for="sect in sections" :value='sect.section_id'>{{ sect.section_name }}</option>
                </select>
                <span ref="errorMessage" v-if="!artwork.section_id && this.isSaved" class="val-error">Please input the artwork's section.</span>
                
                <!-- length -->
                <h2>Height (cm)<span class="asterisk">*</span></h2>
                <input type="number" v-model="artwork.dimen_length_cm" min="0" class="primary-form" required />
                <span ref="errorMessage" v-if="!artwork.dimen_length_cm && this.isSaved" class="val-error">Please input the artwork's correct height.</span>
                <span ref="errorMessage" v-if="!numCheck[0] && this.isSaved" class="val-error">Please input positive number.</span>
                
                <!-- width -->
                <h2>Width (cm)<span class="asterisk">*</span></h2>
                <input type="number" v-model="artwork.dimen_width_cm" min="0" class="primary-form" required />
                <span ref="errorMessage" v-if="!artwork.dimen_width_cm && this.isSaved" class="val-error">Please input the artwork's correct width.</span>
                <span ref="errorMessage" v-if="!numCheck[1] && this.isSaved" class="val-error">Please input positive number.</span>
                
                <!-- height -->
                <h2>Depth (cm)</h2>
                <input type="number" v-model="artwork.dimen_height_cm" min="0" class="primary-form" />
                <span ref="errorMessage" v-if="!numCheck[2] && this.isSaved" class="val-error">Please input positive number.</span>
                
                <!-- description -->
                <h2>Description<span class="asterisk">*</span></h2>
                <textarea v-model="artwork.description" rows="4" class="primary-form" required></textarea>
                <span ref="errorMessage" v-if="!artwork.description && this.isSaved" class="val-error">Please input the artwork's description.</span>
                
                <!-- additional info -->
                <h2>Remarks</h2>
                <textarea v-model="artwork.additional_info" rows="4" class="primary-form"></textarea>
            </div>

            <span ref="errorMessage" class="val-error">{{ errorAPI }}</span>

            <!-- buttons -->
            <span v-if="hasError" class="val-error">Error found. Please check the form again.</span>
            <div v-if="isSubmit" class="btn-cont load">
                <Loader />
            </div>
            <div v-else class="btn-cont">
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
    .val-error {
        color: red;
        font-size: 13px;
    }

    .asterisk {
        color: var(--color-error);
    }

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

    .load {
        justify-content: center !important;
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

    .image-frame input:checked {
        accent-color: var(--color-secondary);
    }

    /* CSS for big screens */
    @media screen and (min-width: 650px) {
        .container {
            width: 60dvw;
            margin: auto;
        }

        .input-form {
            width: 60%;
            margin: auto;
        }
    }
</style>