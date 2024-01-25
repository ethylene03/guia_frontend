<script>
    import Footer from "../../assets/components/Footer.vue"

    // naa sulod sa export default ang pagdeclare sa components ug methods
    export default {
        //ideclare ang footer component
        components: {
            Footer
        },

        //ideclare ang mga methods nga iperform sa change password ug logout buttons
        methods: {
            goTo(path) {
                this.$router.push(path);
            },
        }
    };
</script>

<template>
    
</template>

<style scoped>

</style>