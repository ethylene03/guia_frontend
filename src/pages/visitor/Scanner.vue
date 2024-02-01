<script>
    import Header from '@/assets/components/Header.vue';
    
    export default {
        components: {
            Header,
        },

        data() {
            // for camera setup
            return {
                stream: null,
                facingMode: 'environment',
                capturedImage: null, // holds the image captured
            };
        },

        mounted() {
            this.setupCamera(); // setup the camera after screen loads
        },

        methods: {
            async setupCamera() {
                try {
                    // get the camera stream
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: this.facingMode },
                    });

                    // assign the stream to the variable stream
                    this.stream = stream;

                    // call the video feeds (background and foreground)
                    const videoBack = this.$refs.videoBack;
                    const videoFront = this.$refs.videoFront;

                    // assign the stream to both feeds
                    videoBack.srcObject = stream;
                    videoFront.srcObject = stream;
                } catch (error) {
                    console.error('Error accessing camera:', error);
                }
            },

            // flips the camera (front or back camera)
            async toggleCamera() {
                // environment -> back camera | user -> front camera
                this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
                await this.stopCamera();
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

            // captures the image (integration should be here)
            capture() {
                console.log("image captured!");
                const videoElement = this.$refs.videoFront;
                const canvasElement = this.$refs.canvas;
                const context = canvasElement.getContext('2d');
        
                canvasElement.width = videoElement.videoWidth;
                canvasElement.height = videoElement.videoHeight;
        
                context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
                this.capturedImage = canvasElement.toDataURL('image/png');
            },

            // redirects to another page/screens
            redirect(path) {
                this.$router.push(path);
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
            <h2>Please point the camera to the artwork</h2>
    
            <!-- buttons -->
            <div class="btn-cont">
                <button class="flip-camera" @click="toggleCamera">
                    <img src="/icons/flip-camera.svg" alt="flip camera" />
                </button>
                
                <button class="shutter" @click="capture">
                    <img src="/icons/camera-light.svg" alt="capture image" />
                </button>
                
                <button @click="redirect('/search')">
                    <img src="/icons/search.svg" alt="search artwork" />
                </button>
            </div>

            <canvas ref="canvas" style="display: none;" />
            <a :href="capturedImage" download="captured_image.png" v-if="capturedImage">Download Image</a>
            <!-- <img :src="capturedImage" v-if="capturedImage" alt="Captured Image"> -->
        </div>
    </div>
</template>
  
<style scoped>
    .container {
        overflow-x: hidden;
    }

    .background {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: -1;
    }

    .background video {
        height: 100%;
    }

    .foreground {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .vid-cont {
        width: 100%;
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
        
        width: 70%;
        margin: 70px 0 0 0;
    }

    .btn-cont button {
        display: flex;
        justify-content: center;
        align-items: center;

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
            width: 70%;
            height: fit-content;
            padding: 25px 0;
            margin-top: 0;
        }

        .btn-cont {
            margin: 30px 0 0 0;
        }
    }
</style>
  