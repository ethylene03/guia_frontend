<script>
    // import components
    import Loader from "@/assets/components/common/Loader.vue";
    import Footer from "../../assets/components/common/Footer.vue";
    
    import LoginForm from "@/assets/components/login/LoginForm.vue";

    export default {
        // all components used must be declared here
        components: { 
            Footer,
            Loader,
            LoginForm,
        },
    };
</script>

<template>
    <div class="container">
        <img class="logo" src="../../assets/images/admin-logo.png" />
        <div class="login-cont">
            <h2 class="label">Please login using the given credentials.</h2> 
        
            <!-- login form -->
            <login-form />
        </div>
    
        <!-- Kbytes Logo Footer -->
        <Footer />
    </div>
</template>

<style scoped>
    .container {
        justify-content: center;
    }

    .logo {
        width: clamp(256px, 300px, 400px);           
    }

    .label {
        color: var(--text-secondary);
        font-weight: normal;
        margin-top: 7dvh;
        margin-bottom: 7px;
    }

    .login-cont {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 3.2rem;
    }
</style>