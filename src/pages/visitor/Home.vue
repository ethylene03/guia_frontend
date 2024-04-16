<script>
    import { getMuseum } from '@/assets/API calls/museumAPI';
import { generateToken } from '@/assets/API calls/visitorAPI';
import Welcome from '@/assets/components/common/Welcome.vue';

    export default {
        components: {
            Welcome,
        },

        data() {
            // the screen width variable for responsiveness
            return {
                screenWidth: window.innerWidth,
                museum_id: this.$route.params.id,
                museum_name: '',
                isReady: false,
            };
        },

        computed: {
            // determines whether the screen is big or small
            isBigScreen() {
                return this.screenWidth > 650;
            },
        },

        // window listener to fetch screen size
        async mounted() {
            window.addEventListener('resize', this.updateScreenSize);

            // fetch museum id
            const mus = await getMuseum(this.museum_id);
            // console.log(mus)

            this.museum_name = mus[0].museum_name;
            this.isReady = true;
        },
        
        methods: {
            // to redirect to another screen
            redirect(path) {
                window.location.href = path;
            },

            // update screen size variable
            updateScreenSize() {
                this.screenWidth = window.innerWidth;
            },

            // generate token
            async confirmMuseum() {
                // generate visitor token
                await generateToken(this.museum_id);
            }
        },

        // delete the variable after use
        beforeDestroy() {
            window.removeEventListener('resize', this.updateScreenSize);
        },
    }
</script>

<template>
    <Welcome v-if="!isReady" :start="!isReady" :welcome="true" />
    <div v-else class="container">
        <!-- top border curly thing -->
        <img class="border" src='../../assets/images/top-border.svg' alt="border" />

        <!-- logo container if the screen is big -->
        <div :class="{'logo-cont': isBigScreen, 'logo-cont-sm': !isBigScreen}">
            <img class="guia" src='../../assets/images/guia-gold.svg' alt="guia" />
            <img class="collab" v-if="isBigScreen" src="../../assets/images/collab.svg" alt="x" />

            <!-- musuem logo (change for integration) -->
            <img class="museum" :src="'/logo/' + museum_name.toLowerCase() + '.png'" alt="museum" />
        </div>

        <text>Are you in<br/>{{ museum_name }}?</text>

        <!-- button choices (Y/N) -->
        <div class="btn-cont">
            <button @click="confirmMuseum">Yes</button>
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