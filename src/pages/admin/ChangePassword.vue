<script>
    //uses the InputIcon component for password input
    import InputIcon from "../../assets/components/InputIcon.vue";
    import Footer from "../../assets/components/Footer.vue";
    import { getAdminId, isExpired, logout } from "@/assets/components/common";
    import { adminPOST } from "@/assets/API calls/api";
    import Loader from "@/assets/components/Loader.vue";

    // naa sulod sa export default ang pagdeclare sa components ug methods
    export default {
        //declaring the InputIcon component
        components: {
            InputIcon,
            Footer,
            Loader
        },

        data() {
            return {
                deets: {
                    admin_id: getAdminId(),
                    old_password: "",
                    new_password: "",
                },
                confirm_password: "",
                isSame: {
                    type: Boolean,
                    default: true,
                },
                error: "",
                isSaved: false,
                isSubmit: false,
            }
        },

        //when clicking the save password button, it will go back to the previous page the admin was in
        methods: {
            goBack() {
                this.$router.back();
            },

            // check password validity
            checkValidity(password) {
                const oneUpperCase = /^.*[A-Z].*$/;
                const length = /^.{8,}$/;
                const underscore = /^(?!_)(?:[^_]*_?[^_]+)?$/;
                const number = /.*[0-9].*/;
                const specialCharacter = /.*[!@#$%&].*/;

                if(!oneUpperCase.test(password))
                    this.error = "The new password must contain at least one uppercase letter.";
                
                else if(!length.test(password))
                    this.error = "The new password must have at least 8 characters.";
                
                else if(!underscore.test(password))
                    this.error = "The new password must contain at most one underscore, embedded.";
                
                else if(!number.test(password))
                    this.error = "The new password must have at least 1 number.";
                
                else if(!specialCharacter.test(password))
                    this.error = "The new password must have at least 1 special character.";

                else
                    return true;

                return false;
            },

            // form change handler
            handleChange(e) {
                const res = e.target;

                if(res.id === 'confirm_password')
                    this.confirm_password = res.value;
                else
                    this.deets[res.id] = res.value;

                if(this.confirm_password != this.deets.new_password)
                    this.isSame = false;
                else
                    this.isSame = true;
            },

            // send to API
            async submitDetails() {
                this.isSaved = true;
                this.isSubmit = true;

                if(this.isSame) {
                    if(this.deets.old_password === this.deets.new_password) {
                        this.isSubmit = false;
                        this.error = "Old Password and New Password should not match.";
                    } else if(!this.checkValidity(this.deets.new_password)) {
                        this.isSubmit = false;
                    } else {
                        this.error = "";
                        this.isSaved = false;
                        // console.log(this.deets);
                        
                        // post change password
                        const changePass = await adminPOST('/change-password', this.deets);
                        // console.log(changePass);
                        this.isSubmit = false;

                        if(changePass.status === 200) {
                            console.log("change password successful!");
                            setTimeout(() => logout(), 1000);
                        } else {
                            this.error = changePass.response.data.detail;
                        }

                    }
                } else
                    this.isSubmit = false;
            }
        }
    }

</script>

<template>
    <div class="container">
        <!-- guia logo -->
        <img class="logo" src="../../assets/images/admin-logo.png" />

        <form @submit.prevent="submitDetails" :style="{textAlign: 'center'}">
            <!-- change password form -->
            <div class="change-pass-cont">
                <!-- current password (uses the InputIcon) -->
                <h2 class="label-dark">Current Password</h2>
                <input-icon id="old_password" type="password" isPassword="true" @value="handleChange" />
    
                <!-- new password (uses the InputIcon) -->
                <h2 class="label-dark">New Password</h2>
                <input-icon id="new_password" type="password" isPassword="true" @value="handleChange" />
    
                <!-- confirm new password (uses the InputIcon) -->
                <h2 class="label-dark">Confirm New Password</h2>
                <input-icon id="confirm_password" type="password" isPassword="true" @value="handleChange" />

                <!-- error handling -->
                <span v-if="!this.isSame && this.isSaved" :style="{color: 'red', fontSize: '13px'}">Password does not match.</span>
                <span v-else :style="{opacity: '0', fontSize: '13px'}">holder</span>
            </div>
            
            <!-- Error Handling -->
            <div class="error-cont">
                <span v-if="error" :style="{color: 'red', fontSize: '13px'}">{{ this.error }}</span>
                <span v-else :style="{opacity: '0', fontSize: '13px'}">holder</span>
            </div>

            <!-- container for cancel and save buttons -->
            <Loader v-if="isSubmit" />
            <div v-else class="button-cont">
                <button type="button" @click="goBack" class="btn-cancel">Cancel</button>
                <button type="submit" class="btn-save">Save Password</button>
            </div>
        </form>

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

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100%;
    }

    .error-cont {
        height: 30px;
    }

    /* mao ning change password form enclosed with a border */
    .change-pass-cont {
        background-color: var(--color-primary);
        border: 2px solid var(--color-secondary);
        border-radius: 5px;
        padding: 20px;
        width: 100%;
        margin-top: 100px;
        margin-bottom: 10px;
        text-align: left;
    }

    /* style para sa labels (current pass, new pass, confirm new pass) */
    .label-dark {
        color: var(--color-secondary)
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
        .change-pass-cont {
            margin-top: 25vh;
            width: 30vw;
            margin-bottom: 10px;
        }

        .button-cont {
            width: 30vw;
        }
    }

</style>