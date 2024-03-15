<!-- 
    Summary: this is a custom loader.

    Props: none

    To Use:
        in script: 
            import Loader from '@/assets/components/common/Loader.vue'
            
            export default {
                components: {
                    ...,
                    Loader,
                }
            }

        in template:
            <Loader />
 -->

<template>
    <span class="loader" />
</template>

<style scoped>
    .loader {
        margin-top: 20px;
        width: 48px;
        height: 48px;
        border: 5px solid var(--color-secondary);
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 
</style>