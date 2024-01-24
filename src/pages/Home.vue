<!-- DASHBOARD -->

<script>

    export default {
        methods: {
            redirectToMenu() {
                this.$router.push('/menu');
            }
        }
    };
</script>

<template>
    <!-- header -->
    <div class="header">
        <img src="../../icons/museum-logo.svg" alt="museum_name" />
        <img src="../../icons/guia-long.svg" alt="Guía" />
        
        <!-- menu -->
        <img src="../../icons/menu.svg" class="menu" @click="redirectToMenu" />
    </div>
</template>

<style scoped>
    .header {
        position: absolute;
        top: 40px;
        width: 90vw;
        
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .menu {
        background-color: var(--color-secondary);
        padding: 10px;
        border-radius: 20px;
    }

    .menu:hover {
        background-color: var(--color-secondary-darker);
        cursor: pointer;
    }
</style>