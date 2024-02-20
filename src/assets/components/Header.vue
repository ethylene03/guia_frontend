<!-- 
    Summary:
        This is used for the [ back | logo | menu ] header for the admin side

        Props:
            1. type - either "user" or "admin"
                    - determines what type of header to display
            
            2. isMap - determines whether the map icon should be at the header or the camera icon (FOR USER ONLY)
            3. isLight - determines whether the header is light mode or dark maode (FOR USER ONLY)
            4. showMenu - pass false if you do not want the menu icon to show (FOR USER ONLY)

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

            showMenu: {
                type: Boolean,
                default: true,
            },

            isBack: {
                type: String,
                default: 'back'
            }
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
        <img v-if="!isLight && showMenu" src="/icons/back.svg" alt="back" class="menu" @click="redirect(isBack)" />
        <img v-if="!isLight && !showMenu" src="/icons/back.svg" alt="back" class="menu" disabled :style="{opacity: '0'}" />
        <img v-if="isLight && showMenu" src="/icons/back-light.svg" alt="back" class="menu-light" @click="redirect(isBack)" />
        
        <!-- guia logo -->
        <img src="/icons/guia-long.svg" alt="Guía" class="guia" />
        
        <!-- admin menu -->
        <img v-if="type === 'admin'" src="/icons/menu.svg" class="menu" @click="redirect('/on-cloud-nine/menu')" />

        <!-- user map/camera -->
        <img v-if="type === 'user' && isMap && !isLight && showMenu" src="/icons/map.svg" class="menu" @click="redirect('/map')" />
        <img v-if="type === 'user' && !isMap && !isLight && showMenu" src="/icons/camera.svg" class="menu" @click="redirect('/scan')" />
        <img v-if="type === 'user' && isMap && isLight && showMenu" src="/icons/map-light.svg" class="menu-light" @click="redirect('/map')" />
        <img v-if="type === 'user' && !showMenu" src="/icons/map-light.svg" disabled :style="{opacity: '0'}"  />
    </div>
</template>

<style scoped>
    .header {
        position: relative;
        padding: 20px 0 10px 0;
        width: 100%;
        
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        height: 70px;
    }

    .guia {
        position: absolute;
        left: 50%;
        margin-left: -40px;
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