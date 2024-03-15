<!-- 
    Summary: this is a custom toast that displays message at the center.

    Props:
        1. type: either 'success', 'error', 'warning', 'info'
        2. message: string value to display in toaster

    To Use:
        in script: 
            import Toast from "@/assets/components/common/Toast.vue";
            import { ModalsContainer, useModal } from "vue-final-modal";

            // success toaster
            const { open: openS, close: closeS} = useModal({
                component: Toast,
                attrs: {
                    type: 'success',
                    message: 'Password changed successfully!',
                }
            }) 
 -->

<script setup lang="ts">
    import { VueFinalModal } from 'vue-final-modal'

    defineProps<{
        type?: string,
        message?: string, 
        subtext?: string, 
    }>()
</script>

<template>
  <VueFinalModal
    class="toast-cont"
    :content-class="['toast-items', 
                        {
                            'success': type === 'success', 
                            'error': type === 'error', 
                            'warning': type === 'warning', 
                            'info': type === 'info', 
                        }]"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    :esc-to-close="false"
    :click-to-close="false"
  >

    <!-- icon types -->
    <div class="toast-header">
      <img v-if="type === 'error'" src="/icons/error.svg" />
      <img v-if="type === 'success'" src="/icons/success.svg" />
      <img v-if="type === 'info'" src="/icons/info.svg" />
      <img v-if="type === 'warning'" src="/icons/warn.svg" />
    </div>

    <!-- message sa toaster -->
    <div class="toast-message">
      <p>{{ message }}</p>
      <text v-if="type === 'error' && subtext === ''">Please try again later.</text>
      <text v-else>{{ subtext }}</text>
    </div>
  </VueFinalModal>
</template>

<style>
    .toast-cont {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .toast-items {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        padding: 2rem;
        background: var(--color-primary);
        border-radius: 0.5rem;
    }

    .info {
        border: 2px solid #4979D1;
        color: #4979D1;
    }

    .success {
        border: 2px solid #78A55A;
        color: #78A55A;
    }

    .warning {
        border: 2px solid #EBC351;
        color: #EBC351;
    }

    .error {
        border: 2px solid #BB271A;
        color: #BB271A;
    }

    .toast-header img {
        height: 50px;
        margin-bottom: 20px;
    }

    .toast-message {
        text-align: center;
    }

    .toast-message p {
        font-weight: bold;
        font-size: large;
    }

    .toast-message text {
        font-size: small;
    }

</style>
