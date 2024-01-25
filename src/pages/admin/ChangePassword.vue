<script>
    //uses the InputIcon component for password input
    import InputIcon from "../../assets/components/InputIcon.vue";
    import Footer from "../../assets/components/Footer.vue";

    export default {
        //declaring the InputIcon component
        components: {
            InputIcon,
            Footer
        },

        //when clicking the save password button, it will go back to the previous page the admin was in
        methods: {
            goBack() {
                this.$router.back();
            }
        }
    }

</script>

<template>
    <div class="container">
        <img class="logo" src="../../assets/images/admin-logo.png" />

        <!-- change password form -->
        <div class="change-pass-cont">
            <!-- current password (uses the InputIcon) -->
            <h2 class="label-dark">Current Password</h2>
            <input-icon type="password" isPassword="true"/>

            <!-- new password (uses the InputIcon) -->
            <h2 class="label-dark">New Password</h2>
            <input-icon type="password" isPassword="true"/>

            <!-- confirm new password (uses the InputIcon) -->
            <h2 class="label-dark">Confirm New Password</h2>
            <input-icon type="password" isPassword="true"/>
        </div>

        <!-- container for cancel and save buttons -->
        <div class="button-cont">
            <button @click="goBack" class="btn-cancel">Cancel</button>
            <button @click="goBack" class="btn-save">Save Password</button>
        </div>

        <!-- Kbytes Footer -->
        <Footer/>
    </div>
</template>

<style scoped>
    .container {
        justify-content: center;
    }

    .logo {
        width: clamp(150px, 200px, 300px);
        position: absolute;
        top: 10%;
    }

    /* mao ning change password form enclosed with a border */
    .change-pass-cont {
        background-color: var(--color-primary);
        border: 2px solid var(--color-secondary);
        border-radius: 5px;
        padding: 20px;
        width: 100%;
        margin-top: 100px;
        margin-bottom: 50px;
    }

    /* style para sa labels (current pass, new pass, confirm new pass) */
    .label-dark {
        font-weight: bold;
        color: var(--color-secondary)
    }

    .button-cont {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    /* css for all button tags under button-cont class */
    .button-cont button {
        color: var(--color-primary);
        width: 48%;
        padding: 10px 0px;
    }

    .btn-cancel {
        background-color: var(--color-accent);
    }

    .btn-save {
        background-color: var(--color-secondary);
    }

</style>