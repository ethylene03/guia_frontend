<script>
    //imports
    import { getAdminId, redirect } from "@/assets/components/common/common";
    import { changePassword } from "@/assets/API calls/passwordAPI";
    import { checkValidity } from "@/assets/components/password/Functions";
        
    import Loader from "@/assets/components/common/Loader.vue";
    import Footer from "../../assets/components/common/Footer.vue";
    import Password from "../../assets/components/password/Password.vue";
    import Form from "../../assets/components/password/Form.vue";
    
    export default {    
        components: {
            Footer,
            Loader,
            Form
        },

        data() {
            return {
                deets: {
                    admin_id: getAdminId(),
                    old_password: "",
                    new_password: "",
                },
                confirm_password: "",
                error: "",
                isSubmit: false,
            }
        },

        methods: {
            handleChange(key, value) {
                if(key === "confirm_password")
                    this.confirm_password = value;
                else 
                    this.deets[key] = value;
            },

            async submitDetails() {
                this.error = "";
                this.isSubmit = true;

                const valid = checkValidity(this.deets.new_password);
                if(this.deets.old_password === this.deets.new_password)
                    this.error = "New Password should not match Current Password.";
                  
                if(this.confirm_password !== this.deets.new_password)
                    this.error = "Password does not match.";

                else if(valid !== "success")
                    this.error = valid;
                
                else {
                    const res = await changePassword(this.deets);
                    if(res)
                        this.error = res;
                }
                

                this.isSubmit = false;
            },
            redirect
        }
    }

</script>

<template>
    <div class="container">
        <!-- guia logo -->
        <img class="logo" src="../../assets/images/admin-logo.png" />

        <form @submit.prevent="submitDetails" :style="{alignItems: 'flex-start', width: 'max-content'}">
            <!-- change password form -->
            <Form @value="handleChange" :confirm_password="confirm_password" :new_password="deets.new_password" />

            <!-- Password Validation -->
            <div class="validate">
                <text style="font-weight: bold;">Reminders</text>
                <li>Password must have at least 1 uppercase letter.</li>
                <li>Password must have at least 8 characters.</li>
                <li>Password must have at least 1 number.</li>
                <li>Password must have at least 1 special character.</li>
                <li>Password must have at most 1 underscore, embedded.</li>
            </div>
            
            <!-- Error Handling -->
            <div class="error-cont">
                <span v-if="error" :style="{color: 'red', fontSize: '13px'}">{{ this.error }}</span>
                <span v-else :style="{opacity: '0', fontSize: '13px'}">holder</span>
            </div>

            <!-- container for cancel and save buttons -->
            <div v-if="isSubmit" style="width: 100%; display: flex; justify-content: center;">
                <Loader />
            </div>
            <div v-else class="button-cont">
                <button type="button" @click="redirect('back')" class="btn-cancel">Cancel</button>
                <button type="submit" class="btn-save">Save Password</button>
            </div>
        </form>

        <!-- Kbytes Footer -->
        <Footer/>
    </div>
</template>

<style scoped>
    .validate {
        text-align: left;
        font-size: 11px;  
    }

    .validate li {
        margin-left: 20px;
    }

    .container {
        justify-content: center;
    }

    .logo {
        width: clamp(150px, 200px, 300px);
        position: absolute;
        top: 6%;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100%;
        margin-bottom: 3.2rem;
    }

    .error-cont {
        height: 30px;
    }

    .button-cont {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 30px;
    }

    /* css for all button tags under button-cont class */
    .button-cont button {
        color: var(--color-primary);
        width: 48%;
        padding: 10px 0px;
        cursor: pointer;
    }

    .btn-cancel {
        background-color: var(--color-accent);
    }

    .btn-cancel:hover {
        background-color: var(--color-accent-darker);
    }

    .btn-save {
        background-color: var(--color-secondary);
    }

    .btn-save:hover {
        background-color: var(--color-secondary-darker);
    }

    /* CSS for big screens */
    @media screen and (min-width: 650px) {
        .button-cont {
            width: 30dvw;
        }
    }

</style>@/assets/components/common/common/common../../assets/components/common/Footer.vue../../assets/components/password/InputIcon.vue../../assets/components/password/InputIcon.vue../../assets/components/password/Password.vue