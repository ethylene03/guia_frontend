
<script>
import ShowIcon from 'icons/EyeOutline.vue';
import HideIcon from 'icons/EyeOffOutline.vue';

export default {
    components: {
        ShowIcon,
        HideIcon,
    },

    data() {
        return {
            show: false,
            password: '', // Added password data property
        };
    },

    methods: {
        handleChange(e) {
            this.password = e; // Update the password value
            this.$emit('value', this.password); // Emit the 'value' event with the password value
        },
    },
};
</script>

<template>
    <div class="primary-form password-cont">
        <input :type="show ? 'text' : 'password'" @input="handleChange($event.target.value)" />
        <show-icon v-if="show" @click="show = !show" title="show password" />
        <hide-icon v-else @click="show = !show" title="hide password" />
    </div>
</template>

<style scoped>
.password-cont {
    padding: 0;
    display: flex;
    justify-content: flex-start;
}

.password-cont span {
    display: flex;
    padding: 0 2px;
    cursor: pointer;
}

.password-cont input {
    background-color: transparent;
    color: var(--color-secondary);
    outline: none;
    border: none;
    width: 100%;
}
</style>