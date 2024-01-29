<script>
    export default {
        data() {
            return {
                screenWidth: window.innerWidth,
            };
        },

        computed: {
            isBigScreen() {
                return this.screenWidth > 650;
            },
        },

        mounted() {
            window.addEventListener('resize', this.updateScreenSize);
        },
        
        methods: {
            redirect(path) {
                this.$router.push(path);
            },

            updateScreenSize() {
                this.screenWidth = window.innerWidth;
            },
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.updateScreenSize);
        },
    }
</script>

<template>
    <div class="container">
        <img class="border" src='../../assets/images/top-border.svg' alt="border" />

        <!-- logo container if the screen is big -->
        <div :class="{'logo-cont': isBigScreen, 'logo-cont-sm': !isBigScreen}">
            <img class="guia" src='../../assets/images/guia-gold.svg' alt="guia" />
            <img class="collab" v-if="isBigScreen" src="../../assets/images/collab.svg" alt="x" />
            <img class="museum" src='../../assets/images/museum.png' alt="museum" />
        </div>

        <text>Are you in<br/>Jose T. Joya Gallery?</text>

        <!-- button choices (Y/N) -->
        <div class="btn-cont">
            <button @click="redirect('/scan')">Yes</button>
            <button @click="redirect('/search-museum')">No</button>
        </div>

        <!-- footer -->
        <img src='../../assets/images/kbytes-dark.svg' alt="kbytes" />
        <img src='../../assets/images/bottom-border.svg' alt="border" />
    </div>
</template>

<style scoped>
    .container {
        background-color: var(--color-secondary) !important;
        height: 100%;
    }

    .logo-cont {
        width: fit-content;
        display: grid;
        justify-items: center; 
        align-items: center; 
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(1, 1fr);
        gap: 0;
    }

    .logo-cont-sm {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .logo-cont .guia {
        height: 60px;
    }

    .logo-cont .museum {
        height: 170px;
    }

    .guia {
        height: 60px;
    }

    .collab {
        height: 30px;
        margin: 0 20vh;
    }

    .museum {
        margin-top: 5vh;
        height: 20em;
    }

    text {
        margin: 5vh 0 15px 0;
        color: var(--color-primary);
        text-align: center;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .btn-cont {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        margin: 20px 0;
    }

    .btn-cont button {
        color: var(--color-accent);
        font-weight: bold;
        font-size: 20px !important;
        padding: 0 !important;
        height: 70px;
        width: 70px;
        
        display: flex;
        justify-content: center;
        align-items: center;

        border: 5px solid var(--color-accent);
        border-radius: 50px;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }

    .btn-cont button:hover {
        cursor: pointer;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.527));
    }

    @media screen and (min-width: 650px) {
        .btn-cont {
            width: 50%;
        }
    }
</style>