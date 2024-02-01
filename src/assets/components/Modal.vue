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
    <div class="header">
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
    <div class="button-cont">
      <button class="left-btn" type="button" @click="emit('leftAction')">
        {{ buttonLeft }}
      </button>
      <button :class="{'save-btn': isSave, 'right-btn': !isSave}" type="button" @click="redirect(rightPath)">
        {{ buttonRight }}
      </button>
    </div>
  </VueFinalModal>
</template>

<style scoped>
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

.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 9vh;
  margin-bottom: 2vh;
}

.header img {
  height: 70px;
  width: 70px;
}

.header text {
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

.button-cont {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
}

.button-cont button {
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
