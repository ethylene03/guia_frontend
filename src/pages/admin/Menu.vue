<script>
    import { getUsername, logout } from "@/assets/components/common";
    import Footer from "../../assets/components/Footer.vue"
    import { useModal } from "vue-final-modal";
    import Toast from "@/assets/components/Toast.vue";
    import CloseIcon from 'icons/Close.vue';
    import PassIcon from 'icons/AccountKeyOutline.vue';
    import LogoutIcon from 'icons/Logout.vue';
    import HomeIcon from 'icons/HomeCircleOutline.vue';
    import ArtIcon from 'icons/ListBoxOutline.vue';

    // toaster
    const {open: openI, close: closeI} = useModal({
        component: Toast,
        attrs: {
            type: 'info',
            message: 'You will be logged out!',
            subtext: 'Please login again to continue'
        }
    })

    const {open: openE, close: closeE} = useModal({
        component: Toast,
        attrs: {
            type: 'error',
            message: 'Error logging out!'
        }
    })

    // naa sulod sa export default ang pagdeclare sa components ug methods
    export default {
        //ideclare ang footer component
        components: {
        Footer,
        CloseIcon,
        PassIcon,
        LogoutIcon,
        HomeIcon,
        ArtIcon,
    },

        // temporary user email rani, replace this one puhon with the data in our database
        data() {
            return {
                userEmail: getUsername(),
            };
        },

        //ideclare ang mga methods nga iperform sa change password ug logout buttons
        methods: {
            goTo(path) {
                if(path == 'back')
                    this.$router.back();
                else
                    window.location.href = path;
            },

            logout() {
                openI();
                const val = logout();

                if(!val) {
                    closeI();
                    openE();
                } 
            }
        }
    };
</script>

<template>
    <div class="container">
        <!-- container for exit icon -->
        <div class="header" @click="goTo('back')">
            <close-icon title="close menu" class="exit-icon" fillColor="var(--color-primary)" style="display: flex; align-items: center; justify-content: center;" />
            <!-- <img src="/icons/exit.svg" alt="exit" class="exit-icon"/> -->
        </div>

        <div class="form-cont">
            <!-- guia logo -->
            <img class="logo" src="../../assets/images/admin-logo.png"/>

            <div class="button-icons">
                <div style="margin-right: 30px;" @click="goTo('/on-cloud-nine/home')">
                    <home-icon :size="40" />
                    <text>Dashboard</text>
                </div>
                <div @click="goTo('/on-cloud-nine/view/all')">
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
                <button class="change-pass-btn" type="button" @click="goTo('/on-cloud-nine/change-password')">
                    <pass-icon fillColor="var(--color-primary)" :size="20" />
                    <!-- <img src="/icons/change-password.svg" alt="change_password" class="change-pass-icon"/> -->
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

        <!-- KBytes Footer -->
        <Footer/>
    </div>
</template>

<style scoped>

    .container {
        justify-content: flex-start;
    }

    .logo {
        width: clamp(150px, 200px, 300px);
        margin-bottom: 5vh;
    }

    .header {
        padding: 20px 0 10px 0;
        width: 100%;
        
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 30px;
    }

    .exit-icon {
        background-color: var(--color-secondary);
        padding: 10px;
        border-radius: 20px;
        height: 40px;
        width: 40px; 
    }

    .exit-icon:hover {
        background-color: var(--color-secondary-darker);
        cursor: pointer;
    }

    .button-icons {
        display: flex;
        margin-bottom: 5vh;
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
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-bottom: 3.2rem;
    }

    .user-info-cont {
        padding: 20px 0 50px 0;
        width: 100%;

        margin-bottom: 5vh;
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
        margin-bottom: 15px;
    }
    .change-pass-btn:hover {
        background-color: var(--color-secondary-darker);
        cursor: pointer;
    }

    .logout-btn {
        background-color: var(--color-accent);
        margin-bottom: 5vh;
    }
    .logout-btn:hover {
        background-color: var(--color-accent-darker);
        cursor: pointer;
    }

    /* CSS for bigger screens */
    @media screen and (min-width: 650px) {
        .container {
            width: 60vw;
        }

        .form-cont {
            width: 60%;
        } 
    }

</style>