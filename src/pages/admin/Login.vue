<script>
    // uses the InputIcon component
    import InputIcon from "../../assets/components/InputIcon.vue"
    import Footer from "../../assets/components/Footer.vue"

    export default {
        // all components used must be declared here
        components: { 
            InputIcon,
            Footer,
        },

        // all methods ust be declared here
        methods: {
            redirectToHome() {
                this.$router.push('/admin/home'); // redirection
            }
        }
    };
</script>

<template>
    <div class="container">
        <img class="logo" src="../../assets/images/admin-logo.png" />
        <h2 class="label">Please login using the given credentials.</h2> 
    
        <!-- login form -->
        <div class="login-cont">
            <!-- username -->
            <h2 class="label-light">Username</h2> 
            <input type="text" class="primary-form" /> <!-- use the class "primary" for common input css -->
    
            <!-- password (uses InputIcon component)-->
            <h2 class="label-light">Password</h2>
            <input-icon type="password" isPassword="true" />
        </div>
    
        <!-- login button -->
        <button class="login-btn" type="button" @click="redirectToHome">Login</button>
    
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
        margin: 7vh 7px 7px 7px;
    }

    /* login form */
    .login-cont {
        background-color: var(--color-surface);
        border: 2px solid var(--color-secondary);
        padding: 1em; 

        border-radius: 5px;
    }

    .label-light {
        color: var(--color-text-on-dark);
        font-weight: normal;
    }

    /* login button */
    .login-btn {
        margin-top: 5vh;
        background-color: var(--color-secondary);
        color: var(--color-text-on-dark);
        cursor: pointer;
    }

    .login-btn:hover {
        background-color: var(--color-secondary-darker);
    }
</style>