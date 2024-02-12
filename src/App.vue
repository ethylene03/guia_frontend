<script>
  import { ModalsContainer } from 'vue-final-modal';
</script>

<template>
  <router-view></router-view>
  <ModalsContainer />
</template>

<style scoped>
  body  {
    background-color: var(--color-primary);
  }
</style>
