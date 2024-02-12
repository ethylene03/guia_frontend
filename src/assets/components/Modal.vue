<!-- 
    Summary: this is a confirm modal that displays a confirm dialog box.

    Props:
        1. logoURL - a string value that represents the url of the logo
        2. title - a string value that represents the title of the dialog box
        3. action - a string value that represents the purpose of the dialog box (i.e. delete)
        4. artwork - a string value that represents the name of the artwork
        5. buttonLeft - a string value that represents the label for left button
        6. buttonRight - a string value that represents the label for the right button
        7. rightPath - a string value that represents the path the right button redirects
        8. isSave - a boolean value that represents whether the right button is a save button or not.

    To Use:
        in script: 
            import { ModalsContainer, useModal } from 'vue-final-modal'
            import Modal from '../../assets/components/Modal.vue'

            const { open: openCancelModal, close: closeCancelModal } = useModal({
                component: Modal,
                attrs: {
                    logoURL: '/icons/warning.svg',
                    title: 'Cancel edit?',
                    action: 'discard',
                    artwork: 'artwork',
                    buttonLeft: 'No',
                    buttonRight: 'Yes',
                    rightPath: '../view/1',
                    isSave: false,
                    onLeftAction() {
                        closeCancelModal();
                    },
                },
            });

        in template:
            <ModalsContainer />
 -->

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { useRouter } from 'vue-router'

defineProps<{
  logoURL?: string,
  title?: string,
  action?: string,
  artwork?: string,
  buttonLeft?: string,
  buttonRight?: string,
  rightPath?: string,
  isSave?: Boolean,
}>()

const router = useRouter();
function redirect(path) {
  if(path === 'back')
    router.back();
  else
    router.push(path);
}

const emit = defineEmits<{
  (e: 'leftAction'): void,
}>()
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >

    <!-- warning icon and cancel edit header -->
    <div class="modal-header">
      <img :src="logoURL" />
      <text :style="{color: isSave ? 'var(--color-secondary)' : 'var(--color-error)'}">
        {{ title }}
      </text>
    </div>

    <!-- message sa modal -->
    <div class="modal-message">
      <p>Are you sure you want to {{ action }} your</p>
      <p>changes for {{ artwork }}?</p>
      <p>This action cannot be undone.</p>
    </div>

    <!-- button container sa buttons  -->
    <div class="modal-button-cont">
      <button class="left-btn" type="button" @click="emit('leftAction')">
        {{ buttonLeft }}
      </button>
      <button :class="{'save-btn': isSave, 'right-btn': !isSave}" type="button" @click="redirect(rightPath)">
        {{ buttonRight }}
      </button>
    </div>
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: var(--color-primary);
  border-radius: 0.5rem;
  padding: 25px 35px;
  /* border: 2px solid var(--color-error); */
}
.confirm-modal-content > * + *{
  margin: 0.5rem 0;
}
.confirm-modal-content h1 {
  font-size: 1.375rem;
}
.confirm-modal-content button {
  margin: 0.25rem 0 0 auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
}
.dark .confirm-modal-content {
  background: #000;
}

.modal-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  margin-bottom: 2vh;
}

.modal-header img {
  height: 70px;
  width: 70px;
}

.modal-header text {
  font-weight: bold;
  font-size: large;
}

.modal-message p {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.left-btn {
  background-color: var(--color-accent);
}

.left-btn:hover {
  background-color: var(--color-accent-darker);
}

.right-btn {
  background-color: var(--color-error);
}

.right-btn:hover {
  background-color: var(--color-error-darker);
}

.save-btn {
  background-color: var(--color-secondary);
}

.save-btn:hover {
  background-color: var(--color-secondary-darker);
}

.modal-button-cont {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
}

.modal-button-cont button {
  padding: 10px;
  border-radius: 10px;
  border: none;
  color: var(--color-primary);
  width: 100%;
  cursor: pointer;
}

/* style for web screen */
@media screen and (min-width: 650px) {
  .header {
    margin-bottom: 10vh;
  }
}

</style>
