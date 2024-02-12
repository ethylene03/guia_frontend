<script>
    // import components
    import InputIcon from "../../assets/components/InputIcon.vue"
    import Footer from "../../assets/components/Footer.vue"
    import Loader from "@/assets/components/Loader.vue";
    import moment from "moment";
    
    import { POST } from '../../assets/API calls/api.js'
    import { refreshPage } from "@/assets/components/common";

    export default {
        // all components used must be declared here
        components: { 
            InputIcon,
            Footer,
            Loader,
        },

        data() {
            return {
                isDisabled: true,
                // variables to send to backend
                credentials: {
                    admin_username: "",
                    admin_password: ""
                },
                isSubmit: false,
                errorMessage: "",
            }
        },

        // all methods ust be declared here
        methods: {
            redirectToHome() {
                this.$router.push('/admin/home'); // redirection
            },

            // form change handler
            handleChange(e) {
                const input = e.target;
                // console.log(input.id);
                
                this.credentials[input.id] = input.value;

                if(this.credentials.admin_username &&
                this.credentials.admin_password) {
                    this.isDisabled = false;
                } else
                    this.isDisabled = true;
            },

            // submit login
            async submitCredentials() {
                this.isSubmit = true;
                this.errorMessage = "";
                
                const submit = await POST('/admin/login', this.credentials);
                // console.log(submit);

                // check if success
                if(submit.status === 200) {
                    const post = submit.data;
    
                    // store locally
                    localStorage.setItem('admin_id', post.admin_id);
                    localStorage.setItem('museum_id', post.museum_id);
                    localStorage.setItem('admin_token', 'Token ' + post.token);
                    localStorage.setItem('token_expiry', moment.utc(post.token_expires).local());
                    localStorage.setItem('username', this.credentials.admin_username);

                    // redirect to home
                    refreshPage();
                } else {
                    this.isSubmit = false;
                    this.errorMessage = submit?.response.data.detail;
                    // console.error(submit.response.data.error);
                }
            }
        },
    };
</script>

<template>
    <div class="container">
        <img class="logo" src="../../assets/images/admin-logo.png" />
        <h2 class="label">Please login using the given credentials.</h2> 
    
        <!-- login form -->
        <form @submit.prevent="submitCredentials">
            <div class="login-cont">
                <!-- username -->
                <h2 class="label-light">Username</h2> 
                <input id="admin_username" type="text" class="primary-form" @change="handleChange" /> <!-- use the class "primary" for common input css -->
        
                <!-- password (uses InputIcon component)-->
                <h2 class="label-light">Password</h2>
                <input-icon id="admin_password" type="password" isPassword="true" @value="handleChange" />
            </div>
        
            <!-- Error Message -->
            <div class="error-cont">
                <span v-if="errorMessage" :style="{color: 'red', fontSize: '13px'}">{{ this.errorMessage }}</span>
                <span v-else :style="{opacity: '0', fontSize: '13px'}">holder</span>
            </div>
            
            <!-- login button -->
            <Loader v-if="isSubmit" :style="{marginTop: '5vh'}" /> 
            <button v-else :disabled="isDisabled" class="login-btn" type="submit">Login</button>
        </form>
    
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

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .error-cont {
        height: 15px;
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
        width: fit-content;
    }

    .login-btn:hover {
        background-color: var(--color-secondary-darker);
    }
</style>