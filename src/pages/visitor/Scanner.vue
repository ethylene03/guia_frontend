<template>
    <div>
      <video ref="video" autoplay :style="{ transform: videoTransform }"></video>
      <button @click="toggleCamera">Toggle Camera</button>
      <button @click="capture">Capture</button>
      <canvas ref="canvas" style="display: none;"></canvas>
      <img :src="capturedImage" v-if="capturedImage" alt="Captured Image">
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        stream: null,
        facingMode: 'user', // Default to front camera
        capturedImage: null,
        isMirrored: true, // Initially mirrored
      };
    },
    computed: {
      videoTransform() {
        return this.isMirrored ? 'scaleX(-1)' : 'none';
      },
    },
    mounted() {
      this.setupCamera();
    },
    methods: {
      async setupCamera() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: this.facingMode },
          });
          this.stream = stream;
          const videoElement = this.$refs.video;
          videoElement.srcObject = stream;
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      },
      async toggleCamera() {
        this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
        await this.stopCamera();
        this.setupCamera();
      },
      async stopCamera() {
        if (this.stream) {
          const tracks = this.stream.getTracks();
          tracks.forEach(track => track.stop());
          this.stream = null;
        }
      },
      capture() {
        const videoElement = this.$refs.video;
        const canvasElement = this.$refs.canvas;
        const context = canvasElement.getContext('2d');
  
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
  
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        this.capturedImage = canvasElement.toDataURL('image/png');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add scoped CSS to mirror the video */
  video {
    transform: scaleX(-1);
  }
  </style>
  