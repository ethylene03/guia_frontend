<!-- Kbytes logo footer 
    Summary:
        adds a Kbytes logo at the lower part of the screen. 
        The position is absolute, hence it does not conform to any div tags in a screen

    To Use:
        in `script` tags:
            import Footer from "../assets/components/Footer.vue"

            export default {
                methods: {
                    ...,
                    Footer,
                }
            }
        
        in `template` tags:
            <Footer />
-->

<template>
    <img src="../images/kbytes-logo.svg" alt="Kbytes" class="footer" />
</template>

<style scoped>
    .footer {
        position: relative;
        top: 40px;
    }
</style> 