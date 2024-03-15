<!-- Kbytes logo footer 
    Summary:
        adds a Kbytes logo at the lower part of the screen. 
        The position is absolute, hence it does not conform to any div tags in a screen

    To Use:
        in `script` tags:
            import Footer from "../assets/components/common/Footer.vue"

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
    <div class="footer">
        <img src="../../images/kbytes-logo.svg" alt="Kbytes" />
    </div>
</template>

<style scoped>
    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 3.2rem;

        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }
</style> 