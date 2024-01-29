<!-- 
    Summary:
        This is used for the [ back | logo | menu ] header for the admin side

    To Use:
        In script tags:
            import Header from '@/assets/components/Header.vue';

            export default {
                components: {
                    ...,
                    Header,
                },
                ...,
            }

        In template tags:
            <Header /> 
 -->

<script>
    export default {
        methods: {
            redirect(path) {
                if(path == "back")
                    this.$router.back();
                else
                    this.$router.push(path);
            },
        }
    }
</script>

<template>
    <div class="header">
        <img src="/icons/back.svg" alt="back" class="menu" @click="redirect('back')" />
        <img src="/icons/guia-long.svg" alt="Guía" class="guia" />
        
        <!-- menu -->
        <img src="/icons/menu.svg" class="menu" @click="redirect('./menu')" />
    </div>
</template>

<style scoped>
    .header {
        padding: 20px 0 10px 0;
        width: 100%;
        
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    }

    .guia {
        width: 80px;
    }

    .menu {
        background-color: var(--color-secondary);
        padding: 10px;
        border-radius: 20px;
        height: 40px;
        width: 40px;
    }

    .menu:hover {
        background-color: var(--color-secondary-darker);
        cursor: pointer;
    }
</style>