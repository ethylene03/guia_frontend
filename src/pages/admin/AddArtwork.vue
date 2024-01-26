<script>
    import Header from '@/assets/components/Header.vue';

    export default {
        components: {
            Header,
        },

        data() {
            return {
                images: [],
            };
        },

        methods: {
            chooseFiles() {
                document.getElementById('fileUpload').click();
            },

            redirect(path) {
                if(path == 'back')
                    this.$router.back();
                else
                    this.$router.path(path);
            },

            openModal() {
                console.log("modal opened!");
            },

            receiveFiles(event) {
                const files = event.target.files;

                for (let i = 0; i < files.length; i++) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        this.images.push({
                            src: e.target.result,
                            name: files[i].name,
                        });
                    };

                    reader.readAsDataURL(files[i]);
                }
            },

            handleDeleteImage(index) {
                this.images.splice(index, 1);
            },
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
                    <text class="img-delete" @click="handleDeleteImage(index)">Delete</text>
                </div>
            </div>

            <!-- binded upload button -->
            <button @click="chooseFiles()" class="upload-btn">
                <img src="/icons/upload.svg" alt="upload image" :style="{marginRight: '10px'}" />
                Upload Photos
            </button> 

            <!-- form -->
            <div class="form-cont" :style="{width: '100%'}">
                <h2>Artwork Title</h2>
                <input type="text" class="primary-form" required />
                
                <h2>Artist Name</h2>
                <input type="text" class="primary-form" required />
                
                <h2>Date Published</h2>
                <input type="date" class="primary-form" required />
                
                <h2>Medium</h2>
                <input type="text" class="primary-form" required />
                
                <h2>Assigned Section</h2>
                <select class="primary-form" required>
                    <option value="0" hidden>Select Section</option>
                    <option value="1">Section I</option>
                    <option value="2">Section II</option>
                    <option value="3">Section III</option>
                </select>
                
                <h2>Length (cm)</h2>
                <input type="number" min="0" class="primary-form" required />
                
                <h2>Width (cm)</h2>
                <input type="number" min="0" class="primary-form" required />
                
                <h2>Height (cm)</h2>
                <input type="number" min="0" class="primary-form" required />
                
                <h2>Description</h2>
                <textarea rows="4" class="primary-form" required> </textarea>
                
                <h2>Artwork Title</h2>
                <textarea rows="4" class="primary-form" required> </textarea>
            </div>

            <!-- buttons -->
            <div class="btn-cont">
                <button class="cancel" @click="openModal">
                    Cancel
                </button>
                
                <button class="save" @click="redirect('back')">
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
        margin-bottom: 5px;
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
        margin-bottom: 10px;
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

        margin-bottom: 20px;
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

    .primary-form {
        margin-bottom: 10px;
    }

    textarea {
        width: 100% !important;
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

        display: flex;
        flex-direction: column;
    }

    .image-frame img {
        width: 7em;
        height: 7em;
        margin-right: 30px;
    }

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