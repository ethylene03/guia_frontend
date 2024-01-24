<!-- 
    This component is used for input forms with icons at the right side.

    Summary:
        needed attributes in the parent component:
            1. type - this tells the component what type of input needed (i.e. text, password, email, date, etc.)
            2. icon - this tells the component the URL of the icon used. 
                NOTE: the icon must be placed in "root/public/icons" to work.
            3. isPassword - it is a boolean attribute that tells the component whether the component is used as a password input form or not.
    
    To Use:
        in the `script` tags:
            import InputIcon from "../assets/components/InputIcon.vue"

            export default {
                components: {
                    InputIcon,
                },
            };

        in `template` tags:
            <input-icon type="type" icon = "icon/path" isPassword="false" />
 -->


<script>
    export default {
        // these are the attributes needed from the parent component
        props: {
            type: {
                type: String,
                default: 'text', // add default value at all times! 
            },

            icon: {
                type: String,
                default: '/icons/guia.svg',
            },

            isPassword: {
                type: Boolean,
                default: false,
            }
        },

        // these are the data asked from the template
        data() {
            return {
                inputType: this.type,
                iconURL: this.icon,   
            };
        },

        // these are the methods used in the template
        methods: {
            changeType() {
                this.inputType = this.inputType === "text" ? "password" : "text";
            }
        }
    };
</script>
  
<template>
    <div class="input-cont">
        <input :type="inputType" />

        <!-- The icon is clickable if "isPassword" is true -->
        <img v-if="isPassword" class="clickable-img" :src="iconURL" alt="icon" @click="changeType" />
        <img v-else :src="iconURL" alt="icon" />
    </div>
</template>

<style scoped>
    .input-cont {
        width: 100%;
        background-color: var(--color-primary);
        border: 2px solid var(--color-secondary);
        border-radius: 5px;
        margin-bottom: 5px;
        padding-right: 5px;

        /* to arrange the div */
        display: flex;
        justify-content: space-between;
    }
    
    input {
        padding: 5px;
        width: 100%;
        background: none;
        outline: none !important;
        border: none;
        color: var(--color-secondary);
        font-family: Inter, sans-serif;
    }

    .clickable-img {
        cursor: pointer;
    }
</style>