<script>
    import { submitLogin } from '@/assets/API calls/loginAPI.js';
    import Loader from '@/assets/components/common/Loader.vue';
    import ShowIcon from 'icons/EyeOutline.vue';
    import HideIcon from 'icons/EyeOffOutline.vue';
    import Password from '../password/Password.vue';

    export default {
        data() {
            return {
                isSubmit: false,
                errorMessage: "",
                credentials: {},
                isShow: false,
            }
        },

        components: {
            Loader,
            ShowIcon,
            HideIcon,
            Password,
        },

        methods: {
            // submit login
            async submitCredentials() {
                this.isSubmit = true;
                this.errorMessage = await submitLogin(this.credentials);
                this.isSubmit = false;
            },

            // form change handler
            handleChange(e) {
                const input = e.target;
                this.credentials[input.id] = input.value;
            },
        }
    }
</script>

<template>
    <form @submit.prevent="submitCredentials">
        <div class="login-cont">
            <!-- username -->
            <h2 class="label-light">Username</h2> 
            <input type="text" class="primary-form" v-model="credentials.admin_username" /> <!-- use the class "primary" for common input css -->
    
            <!-- password -->
            <h2 class="label-light">Password</h2>
            <Password @value="credentials.admin_password = $event" />
        </div>
    
        <!-- Error Message -->
        <div class="error-cont">
            <span v-if="errorMessage" :style="{color: 'red', fontSize: '13px'}">{{ this.errorMessage }}</span>
            <span v-else :style="{opacity: '0', fontSize: '13px'}">holder</span>
        </div>
        
        <!-- login button -->
        <Loader v-if="isSubmit" :style="{marginTop: '5vh'}" /> 
        <button v-else class="login-btn" type="submit">Login</button>
    </form>
</template>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
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
        width: 100%;
    }

    input {
        width: 100%;
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