<!-- To integrate the ML model:
    use the "capturedImage" data to pass to backend. 
-->

<script>
    import { predictArtwork } from '@/assets/API calls/predictAPI';
    import Header from '@/assets/components/common/Header.vue';
import Toast from '@/assets/components/common/Toast.vue';
import { visitorExpired } from '@/assets/components/common/common';
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
            // for camera setup
            return {
                stream: null,
                facingMode: 'environment',
                capturedImage: null, // holds the image captured
                show: false, // cecks if the user allow camera permission
                selectedCameraId: null,
                cameras: [],
            };
        },

        mounted() {
            this.getCameras().then(() => {
                // Setup the camera after getting the list of cameras
                this.setupCamera();
            });
        },

        methods: {
            async setupCamera() {
                try {
                    // get the camera stream
                    const constraints = this.selectedCameraId
                        ? { video: { deviceId: { exact: this.selectedCameraId } } }
                        : { video: { facingMode: 'environment' } };
                    const stream = await navigator.mediaDevices.getUserMedia(constraints);

                    // assign the stream to the variable stream
                    this.stream = stream;

                    // call the video feeds (background and foreground)
                    const videoBack = this.$refs.videoBack;
                    const videoFront = this.$refs.videoFront;

                    // assign the stream to both feeds
                    videoBack.srcObject = stream;
                    videoFront.srcObject = stream;

                    this.$nextTick(() => {
                        videoBack.play();
                        videoFront.play();
                    })
                } catch (error) {
                    this.show = true;
                }
            },

            async switchCamera() {
                await this.stopCamera();
                this.setupCamera();
            },

            async getCameras() {
                try {
                    // Get a list of all video input devices
                    const devices = await navigator.mediaDevices.enumerateDevices();
                    const videoInputDevices = devices.filter(device => device.kind === 'videoinput');

                    // Filter the cameras based on the facingMode
                    const availableCameras = videoInputDevices.filter(device => {
                        const label = device.label.toLowerCase();
                        return this.facingMode === 'user' ? label.includes('front') : label.includes('back');
                    });

                    if(availableCameras.length < 1) {
                        this.cameras = videoInputDevices;
                    } else {
                        this.cameras = availableCameras;
                    }

                    this.selectedCameraId = this.cameras[0].deviceId;
                } catch (error) {
                    console.error('Error getting cameras:', error);
                }
            },

            // flips the camera (front or back camera)
            async toggleCamera() {
                // environment -> back camera | user -> front camera
                this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
                await this.stopCamera();
                await this.getCameras();
                this.setupCamera();
            },

            // stops the camera feed
            async stopCamera() {
                // stop all tracks in stream then empty the stream
                if (this.stream) {
                    const tracks = this.stream.getTracks();
                    tracks.forEach(track => track.stop());
                    this.stream = null;
                }
            },

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

            // captures the image (integration should be here)
            async capture() {
                this.imageCaptured();                
                const videoElement = this.$refs.videoFront;
                const canvasElement = this.$refs.canvas;
                const context = canvasElement.getContext('2d');
        
                canvasElement.width = videoElement.videoWidth;
                canvasElement.height = videoElement.videoHeight;
        
                context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
                this.capturedImage = canvasElement.toDataURL('image/jpeg');

                const data = await predictArtwork(this.capturedImage);
            },

            // redirects to another page/screens
            redirect(path) {
                window.location.href = path;
            },
        },

        // stops the camera before exiting the page
        beforeUnmount() {
            this.stopCamera();
        }
    };
</script>

<template>
    <div class="container">
        <!-- background camera -->
        <div class="background">
            <video ref="videoBack" autoplay muted :style="{ transform: videoTransform, filter: 'blur(5px)', transform: facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)' }" />
        </div>

        <!-- page elements -->
        <div class="foreground">
            <!-- user header -->
            <Header type="user" :isMap="true" :isLight="true" />
            
            <!-- main camera preview -->
            <div class="vid-cont">
                <video ref="videoFront" autoplay muted :style="{ transform: videoTransform, transform: facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)' }" />
            </div>
            <h2 :style="{marginTop: '10px'}">Please point the camera to the artwork</h2>
    
            <select class="box-shadow" v-model="selectedCameraId" @change="switchCamera" placeholder="Select a webcam to use">
                <option v-for="camera in cameras" :key="camera.deviceId" :value="camera.deviceId">
                    {{ camera.label }}
                </option>
            </select>

            <!-- buttons -->
            <div class="btn-cont">
                <button class="flip-camera  box-shadow" @click="toggleCamera">
                    <orbit-variant-icon title="flip camera" fillColor="var(--color-secondary)" />
                    <!-- <img src="/icons/flip-camera.svg" alt="flip camera" /> -->
                </button>
                
                <button class="shutter box-shadow" @click="capture">
                    <camera-outline-icon title="capture image" fillColor="var(--color-secondary)" :size="38" />
                    <!-- <img src="/icons/camera-light.svg" alt="capture image" /> -->
                </button>
                
                <button class="box-shadow" @click="redirect('/search')">
                    <magnify-icon title="search artwork" fillColor="var(--color-secondary)" />
                    <!-- <img src="/icons/search.svg" alt="search artwork" /> -->
                </button>
            </div>

            <canvas ref="canvas" style="display: none;" />
        </div>
    </div>

    <!-- modal for no camera permission -->
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
</template>

<!-- style for camera modal -->
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
        height: 25rem;
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

    select {
        outline: none;
        border: none;
        padding: 10px;
        border-radius: 10px;

        background-color: var(--color-primary);
        color: var(--color-secondary);
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
            height: 23rem;
            padding: 20px 0;
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
  