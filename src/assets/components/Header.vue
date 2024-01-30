<!-- 
    Summary:
        This is used for the [ back | logo | menu ] header for the admin side

        Props:
            1. type - either "user" or "admin"
                    - determines what type of header to display
            
            2. isMap - determines whether the map icon should be at the header or the camera icon
            3. isLight - determines whether the header is light mode or dark maode

        Default Values:
            1. type - admin
            2. isMap - true
            3. isLight - false

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
            <Header type="user" :isMap="true" /> 
 -->

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'admin',
            },

            isMap: {
                type: Boolean,
                default: true,
            },

            isLight: {
                type: Boolean,
                default: false,
            },
        },

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
        <!-- back button -->
        <img v-if="!isLight" src="/icons/back.svg" alt="back" class="menu" @click="redirect('back')" />
        <img v-else src="/icons/back-light.svg" alt="back" class="menu-light" @click="redirect('back')" />
        
        <img src="/icons/guia-long.svg" alt="Guía" class="guia" />
        
        <!-- admin menu -->
        <img v-if="type === 'admin'" src="/icons/menu.svg" class="menu" @click="redirect('./menu')" />

        <!-- user map/camera -->
        <img v-if="type === 'user' && isMap && !isLight" src="/icons/map.svg" class="menu" @click="redirect('/map')" />
        <img v-if="type === 'user' && !isMap && !isLight" src="/icons/camera.svg" class="menu" @click="redirect('/scan')" />
        
        <img v-if="type === 'user' && isMap && isLight" src="/icons/map-light.svg" class="menu-light" @click="redirect('/map')" />
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

    .menu, .menu-light {
        padding: 10px;
        border-radius: 20px;
        height: 40px;
        width: 40px;

        cursor: pointer;
    }

    .menu {
        background-color: var(--color-secondary);
    }

    .menu:hover {
        background-color: var(--color-secondary-darker);
    }

    .menu-light {
        background-color: var(--color-primary);
    }

    .menu-light:hover {
        background-color: var(--color-primary-darker);
    }
</style>