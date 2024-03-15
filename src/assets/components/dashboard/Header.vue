<script>
    import { redirect } from '@/assets/components/common/common';
    import MenuIcon from 'icons/Menu.vue';

    export default {
        components: {
            MenuIcon,
        },

        methods: {
            redirect,
        },
    };
</script>

<template>
    <div class="header">
        <img src="/icons/museum-logo.svg" alt="museum_name" class="museum" />
        <img src="/icons/guia-long.svg" alt="Guía" class="guia" />
        
        <!-- menu -->
        <menu-icon class="menu" @click="redirect('/on-cloud-nine/menu')" fillColor="var(--color-primary)" :size="20" style="display: flex; justify-content: center; align-items: center;" />
    </div>
</template>

<style scoped>

.header {
    position: relative;
    padding: 20px 0 10px 0;
    width: 100%;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    margin-bottom: 20px;
}

.museum, .guia {
    width: 80px;
}

.guia {
    position: absolute;
    left: 50%;
    margin-left: -40px;
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

@media screen and (min-width: 650px) {
    .header {
        padding: 0;
    }

    .museum, .guia {
        width: 100px;
    }
}

</style>