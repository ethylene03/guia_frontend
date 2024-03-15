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
                    window.location.href = path;
            },
        }
    }
</script>

<template>
    <div class="header">
        <!-- back button -->
        <back-icon v-if="!isLight && showMenu" class="menu" @click="redirect(isBack)" title="Back" fillColor="var(--color-primary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
        <back-icon v-if="!isLight && !showMenu" class="menu" disabled fillColor="var(--color-primary)" :size="38" :style="{opacity: '0', display: 'flex', justifyContent: 'center', alignItems: 'center'}" title="Back" />
        <back-icon v-if="isLight && showMenu" class="menu-light" @click="redirect(isBack)" title="Back" fillColor="var(--color-secondary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
        
        <!-- guia logo -->
        <img v-if="type === 'admin'" src="/icons/guia-long.svg" alt="Guía" class="guia" title="Guia" @click="redirect('/on-cloud-nine')" style="cursor: pointer;" />
        <img v-else src="/icons/guia-long.svg" alt="Guía" class="guia" title="Guia" />
        
        <!-- admin menu -->
        <menu-icon v-if="type === 'admin'" class="menu" @click="redirect('/on-cloud-nine/menu')" title="Menu" fillColor="var(--color-primary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />

        <!-- user map/camera -->
        <map-icon v-if="type === 'user' && isMap && !isLight && showMenu" class="menu" @click="redirect('/map')" title="Check museum map" fillColor="var(--color-primary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
        <camera-icon v-if="type === 'user' && !isMap && !isLight && showMenu" class="menu" @click="redirect('/scan')" title="Scan artwork" fillColor="var(--color-primary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
        <map-icon v-if="type === 'user' && isMap && isLight && showMenu" class="menu-light" @click="redirect('/map')" title="Check museum map" fillColor="var(--color-secondary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
        <map-icon v-if="type === 'user' && !showMenu" disabled :style="{opacity: '0'}" title="Check museum map" fillColor="var(--color-secondary)" :size="38" style="display: flex; justify-content: center; align-items: center;" />
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