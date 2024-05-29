<script>
import { predictArtwork } from '@/assets/API calls/predictAPI';
import Header from '@/assets/components/common/Header.vue';
import Toast from '@/assets/components/common/Toast.vue';
import { redirect } from '@/assets/components/common/common';
import CameraOutlineIcon from 'icons/CameraOutline.vue';
import MagnifyIcon from 'icons/Magnify.vue';
import OrbitVariantIcon from 'icons/OrbitVariant.vue';
import { VueFinalModal, useModal } from 'vue-final-modal';

    export default {
        components: {
            Header,
            VueFinalModal,
            OrbitVariantIcon,
            CameraOutlineIcon,
            MagnifyIcon,
        },

        data() {
            return {
                show: false,
            }
        },

        methods: {
            redirect,

            imageCaptured() {
                const {open, close} = useModal({
                    component: Toast,
                    attrs: {
                        type: 'info',
                        message: 'Image Captured!',
                        subtext: 'Redirecting you to the artwork...'
                    }
                })

                open();
            },

            async capture() {
                this.imageCaptured();


                // predict
                await predictArtwork(blob);
            },

            toggleCamera() {

            }
        }
    }
</script>

<template>
    <div class="container">
        <!-- background camera -->
        <div class="background">

        </div>

        <!-- content -->
        <div class="foreground">
            <Header type="user" :isMap="true" :isLight="true" />

            <!-- video feed -->
            <div class="vid-cont">

            </div>
            <h2 style="margin-top: 10px;">Please point the camera to the artwork</h2>

            <!-- buttons -->
            <div class="btn-cont">
                <button class="flip-camera  box-shadow" @click="toggleCamera">
                    <orbit-variant-icon title="flip camera" fillColor="var(--color-secondary)" />
                </button>
                
                <button class="shutter box-shadow" @click="capture">
                    <camera-outline-icon title="capture image" fillColor="var(--color-secondary)" :size="38" />
                </button>
                
                <button class="box-shadow" @click="redirect('/search')">
                    <magnify-icon title="search artwork" fillColor="var(--color-secondary)" />
                </button>
            </div>
        </div>

        <!-- modal -->
    <VueFinalModal
        v-model="show"
        class="permission"
        content-class="permission-cont"
        overlay-transition="vfm-fade"
        content-transition="vfm-fade"
        :click-to-close="false"
        :esc-to-close="false"
    >

        <!-- header -->
        <div class="perm-header">
            <img src="/icons/no-camera.svg" />
            <text :style="{color: 'var(--color-secondary)'}">
                No Camera Access
            </text>
        </div>

        <!-- message sa modal -->
        <div class="perm-message">
            <p>Please allow the page to <br/>access the camera to continue<br/>by <b :style="{fontWeight: 'bold'}">visiting your browser's settings</b>.</p>
        </div>
    </VueFinalModal>
    </div>
</template>

<style>
    .permission-cont {
        display: flex;
        flex-direction: column;
        background: var(--color-primary);
        border-radius: 0.5rem;
        padding: 30px 50px;

        height: 270px;
        justify-content: center;
    }

    .permission {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .perm-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }

    .perm-header img {
        width: 40px;
    }

    .perm-header text {
        color: var(--color-error) !important;
        font-weight: bold;
        font-size: large;
    }

    .perm-message p {
        text-align: center;
    }

    .perm-button {
        background-color: var(--color-accent);
        color: var(--color-primary);
    }

    .perm-button:hover {
        background-color: var(--color-accent-darker);
        cursor: pointer;
    }
</style>

<style scoped>
.container {
    overflow-x: hidden;
}

.background {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    z-index: -1;
}

.background video {
    min-height: 100%;
}

.foreground {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.vid-cont {
    width: 20rem;
    height: 30rem;
    margin-top: 20px;

    border-radius: 20px;
    border: 4px solid var(--color-white);

    display: flex;
    justify-content: center;
}

.vid-cont video {
    width: 100%;
}

h2 {
    color: var(--color-white);
}

.btn-cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    width: 100%;
    margin: 70px 0 0 0;
}

.btn-cont button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 2.5em !important;

    padding: 15px;
    border-radius: 100px;

    height: fit-content;
    cursor: pointer;

    background-color: var(--color-primary);
}

.btn-cont button:hover {
    background-color: var(--color-primary-darker);
}

@media screen and (min-width: 650px) {
    .vid-cont {
        width: 30rem;
        height: fit-content;
        padding: 25px 0;
        margin-top: 0;
    }

    .btn-cont {
        margin: 30px 0 0 0;
    }

    .background video {
        min-width: 100%;
    }
}
</style>