<script>
    import Toast from "@/assets/components/common/Toast.vue";
    import { getUsername, logout, redirect } from "@/assets/components/common/common";
    import PassIcon from 'icons/AccountKeyOutline.vue';
    import CloseIcon from 'icons/Close.vue';
    import HomeIcon from 'icons/HomeCircleOutline.vue';
    import ArtIcon from 'icons/ListBoxOutline.vue';
    import LogoutIcon from 'icons/Logout.vue';
    import { VueFinalModal, useModal } from "vue-final-modal";
    import Footer from "../../assets/components/common/Footer.vue";

    // naa sulod sa export default ang pagdeclare sa components ug methods
    export default {
        components: {
            Footer,
            CloseIcon,
            PassIcon,
            LogoutIcon,
            HomeIcon,
            ArtIcon,
            VueFinalModal
        },

        data() {
            return {
                userEmail: getUsername(),
            };
        },

        //ideclare ang mga methods nga iperform sa change password ug logout buttons
        methods: {
            redirect,

            logout() {
                const {open, close} = useModal({
                    component: Toast,
                    attrs: {
                        type: 'info',
                        message: 'You will be logged out!',
                        subtext: 'Please login again to continue'
                    }
                })
                
                open();
                logout();
            }
        }
    };
</script>

<script setup>
    const emit = defineEmits(['closeMenu'])
</script>

<template>
    <VueFinalModal 
        class="menu-cont"
        overlay-transition="vfm-fade"
        content-transition="vfm-slide-right"
    >
    
        <div class="form-cont">
            <!-- container for exit icon -->
            <div class="header" @click="emit('closeMenu')">
                <close-icon title="close menu" class="exit-icon" fillColor="var(--color-primary)" style="display: flex; align-items: center; justify-content: center;" />
            </div>
            <!-- guia logo -->
            <img class="logo" src="../../assets/images/admin-logo.png"/>

            <div class="button-icons">
                <div @click="redirect('/on-cloud-nine/home')">
                    <home-icon :size="40" />
                    <text>Dashboard</text>
                </div>
                <div @click="redirect('/on-cloud-nine/view/all')">
                    <art-icon :size="40" />
                    <text>Artwork Directory</text>
                </div>
            </div>

            <!-- container for user email -->
            <div class="user-info-cont">
                <h2 class="label-dark">User</h2>
                <span>{{ userEmail }}</span>
            </div>

            <!-- container for change pass and logout buttons -->
            <div class="button-cont">
                <!-- change password button -->
                <button class="change-pass-btn" type="button" @click="redirect('/on-cloud-nine/change-password')">
                    <pass-icon fillColor="var(--color-primary)" :size="20" />
                    <h2>Change Password</h2>
                </button>

                <!-- logout button -->
                <button class="logout-btn" type="button" @click="logout">
                    <logout-icon fillColor="var(--color-primary)" :size="20" />
                    <!-- <img src="/icons/logout.svg" alt="logout" class="logout-icon" /> -->
                    <h2>Logout</h2>
                </button>
            </div>
        </div>
    </VueFinalModal>
</template>

<style>
    .menu-cont .vfm__content {
        background-color: var(--color-primary);
        width: 90dvw;
        height: 100dvh;
        padding: 30px;
        position: absolute;
        top: 0;
        right: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .logo {
        width: clamp(150px, 200px, 300px);
        /* margin-bottom: 5dvh; */
    }

    .menu-cont .header {
        /* padding: 20px 0 10px 0; */
        width: 100%;
        
        display: flex;
        justify-content: flex-end;
        align-items: center;

        position: absolute;
        top: 30px;
        right: 30px;
        /* margin-bottom: 30px; */
    }

    .exit-icon {
        background-color: var(--color-secondary);
        padding: 10px;
        border-radius: 50px;
        height: 50px;
        width: 50px; 
    }

    .exit-icon:hover {
        background-color: var(--color-secondary-darker);
        cursor: pointer;
    }

    .button-icons {
        display: flex;
        gap: 20px;
        /* margin-bottom: 5dvh; */
    }

    .button-icons div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        width: 150px;
        padding: 10px 0;
        border-radius: 10px;
    }

    .button-icons div:hover {
        background-color: var(--color-primary-darker);
    }

    .form-cont {
        width: 100%;
        display: grid;
        justify-items: center;
        gap: 10px;
    }

    .user-info-cont {
        padding: 20px 0 50px 0;
        width: 100%;

        /* margin-bottom: 5dvh; */
    }

    .label-dark {
        color: var(--color-secondary);
        padding-bottom: 10px;
    }

    .user-info-cont span {
        border-bottom: 2px solid var(--color-secondary);
        padding-bottom: 10px;
        width: 100%;
        color: var(--color-secondary);
        
        display: block;
        
    }

    .button-cont {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
    }

    .button-cont button {
        color: var(--color-primary);
        width: 100%;
        padding: 10px 20px !important;
        
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .button-cont button h2 {
        width: 100%;
        
        display: flex;
        justify-content: center;
    }

    .change-pass-btn {
        background-color: var(--color-secondary);
        /* margin-bottom: 15px; */
    }
    
    .change-pass-btn:hover {
        background-color: var(--color-secondary-darker);
        cursor: pointer;
    }

    .logout-btn {
        background-color: var(--color-accent);
        /* margin-bottom: 5dvh; */
    }
    .logout-btn:hover {
        background-color: var(--color-accent-darker);
        cursor: pointer;
    }

    /* CSS for bigger screens */
    @media (min-width: 650px) {
        .menu-cont .vfm__content {
            width: 30rem;
        }
    }

</style>