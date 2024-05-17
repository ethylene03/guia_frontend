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
            import Header from '@/assets/components/common/Header.vue';

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
    import BackIcon from 'icons/ChevronLeft.vue';
    import MenuIcon from 'icons/Menu.vue';
    import CameraIcon from 'icons/CameraOutline.vue';
    import MapIcon from 'icons/MapOutline.vue';
    import { redirect } from './common';
    import Menu from '@/pages/admin/Menu.vue';
    import { useModal } from 'vue-final-modal';
    
    const {open, close} = useModal({ 
        component: Menu,
        attrs: {
            onCloseMenu() {
                close();
            }
        }
    })
    
    export default {
        components: {
            BackIcon,
            MenuIcon,
            CameraIcon,
            MapIcon
        },

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

            isDashboard: {
                type: Boolean,
                default: false,
            }
        },

        methods: {
            redirect,

            openMenu() {
                open();
            }
        }
    }
</script>

<template>
    <div v-if="isDashboard" class="header">
        <img src="/icons/museum-logo.svg" alt="museum_name" class="museum" />
        <img src="/icons/guia-long.svg" alt="Guía" class="guia" title="Guia" />
        <menu-icon class="menu box-shadow" @click="openMenu" title="Menu" fillColor="var(--color-primary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
    </div>

    <div v-else-if="type === 'admin'" class="header">
        <back-icon class="menu box-shadow" @click="redirect('back')" title="Back" fillColor="var(--color-primary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
        <img src="/icons/guia-long.svg" alt="Guía" class="guia" title="Guia" @click="redirect('/on-cloud-nine')" style="cursor: pointer;" />
        <menu-icon class="menu box-shadow" @click="openMenu" title="Menu" fillColor="var(--color-primary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
    </div>
    
    <div v-else-if="isMap && !showMenu" class="header">
        <!-- back button -->
        <back-icon class="menu box-shadow" disabled fillColor="var(--color-primary)" :size="38" :style="{opacity: '0', display: 'flex', justifyContent: 'center', alignItems: 'center'}" title="Back" />
        <img src="/icons/guia-long.svg" alt="Guía" class="guia" title="Guia" />
        <map-icon disabled :style="{opacity: '0'}" title="Check museum map" fillColor="var(--color-secondary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
    </div>

    <div v-else-if="isMap && !isLight" class="header">
        <back-icon class="menu box-shadow" @click="redirect('back')" title="Back" fillColor="var(--color-primary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
        <img src="/icons/guia-long.svg" alt="Guía" class="guia" title="Guia" />
        <map-icon class="menu box-shadow" @click="redirect('/map')" title="Check museum map" fillColor="var(--color-primary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
    </div>

    <div v-else-if="isMap && isLight" class="header">
        <back-icon class="menu-light box-shadow" @click="redirect('back')" title="Back" fillColor="var(--color-secondary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
        <img src="/icons/guia-long.svg" alt="Guía" class="guia" title="Guia" />
        <map-icon class="menu-light box-shadow" @click="redirect('/map')" title="Check museum map" fillColor="var(--color-secondary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
    </div>

    <div v-else-if="!isMap" class="header">
        <back-icon class="menu box-shadow" @click="redirect('back')" title="Back" fillColor="var(--color-primary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
        <img src="/icons/guia-long.svg" alt="Guía" class="guia" title="Guia" />
        <camera-icon class="menu box-shadow" @click="redirect('/scan')" title="Scan artwork" fillColor="var(--color-primary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
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
        border-radius: 50px;
        height: 50px;
        width: 50px;

        cursor: pointer;
    }

    .museum {
        height: 80px;
        width: auto;
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