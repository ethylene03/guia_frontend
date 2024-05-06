<script>
import Password from '@/assets/components/password/Password.vue';

export default {
    components: {
        Password,
    },

    props: {
        confirm_password: String,
        new_password: String,
    },

    methods: {
        handleChange(key, value) {
            this.$emit('value', key, value);
        }
    }
}

</script>

<template>
    <div class="change-pass-cont">
        <!-- current password (uses the InputIcon) -->
        <h2 class="label-dark">Current Password</h2>
        <Password @value="handleChange('old_password', $event)" />

        <!-- new password (uses the InputIcon) -->
        <h2 class="label-dark">New Password</h2>
        <Password @value="handleChange('new_password', $event)" />

        <!-- confirm new password (uses the InputIcon) -->
        <h2 class="label-dark">Confirm New Password</h2>
        <Password @value="handleChange('confirm_password', $event)" />

        <!-- error handling -->
        <span v-if="confirm_password != new_password" :style="{color: 'red', fontSize: '13px'}">Password does not match.</span>
        <span v-else :style="{opacity: '0', fontSize: '13px'}">holder</span>
    </div>
</template>

<style scoped>
    

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

/* CSS for big screens */
@media screen and (min-width: 650px) {
    .change-pass-cont {
        margin-top: 25dvh;
        width: 30dvw;
        margin-bottom: 10px;
    }
}
</style>