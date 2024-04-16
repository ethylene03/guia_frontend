<script>
    import { getMuseum } from "@/assets/API calls/museumAPI";
    import { generateToken } from "@/assets/API calls/visitorAPI";
    import Header from "@/assets/components/common/Header.vue";
    import Loader from "@/assets/components/common/Loader.vue";
    import Toast from "@/assets/components/common/Toast.vue";
    import Welcome from "@/assets/components/common/Welcome.vue";
    import { getMuseumId, getToken, refreshPage } from "@/assets/components/common/common";
    import { useModal } from "vue-final-modal";
    import Footer from "../../assets/components/common/Footer.vue";

    export default {
        components: {
        Footer,
        Header,
        Loader,
        Welcome,
    },

        data() {
            return {
                museum_id: "",
                isDisabled: true,
                museums: [],
                isReady: false,
                isSubmitted: false,
            }
        },

        async mounted() {
            // clear local storage
            if(getToken('visitor')) 
                localStorage.removeItem('visitor_token');

            if(getMuseumId('visitor'))
                localStorage.removeItem('visitor_museum_id');

            this.museums = await getMuseum();
            this.isReady = true;
        },

        methods: {
            // to redirect to another screen
            redirect(path) {
                window.location.href = path;
            },

            // receive museum
            handleChange(e) {
                this.museum_id = e.target.value;
                this.isDisabled = false;
            },

            async confirmMuseum() {
                if(this.museum_id != "") {
                    this.isSubmitted = true;

                    // generate visitor token
                    await generateToken(this.museum_id);
                    this.isSubmitted = false;

                } else {
                    const {open, close} = useModal({
                        component: Toast,
                        attrs: {
                            type: 'error',
                            message: 'Please select a museum',
                            subtext: 'Refreshing the page...',
                        }
                    })

                    open();
                    setTimeout(() => refreshPage(), 500);
                }
            }
        },
    };
</script>

<template>
    <Welcome v-if="!isReady" :start="!isReady" :welcome="true" />
    <div class="container" v-else>
        <Header type="user" :showMenu="false" />
        <div class="search-cont">
            <!-- museum logo here (change the src for the integration) -->
            <img src="../../assets/images/museum-dark.png" class="museum-logo" />
    
            <!-- select museum here -->
            <div class="form">
                <h1 :style="{marginBottom: '15px'}">Search Museum</h1>

                <!-- select form (map the options for the integration) -->
                <select class="dropdown" @change="handleChange">
                    <option value="" hidden>Input museum name here</option>
                    <option v-for="(mus) in museums" :value="mus.museum_id">{{ mus.museum_name }}</option>
                </select>
            </div>
    
            <!-- confirm button (add API submit integration) -->
            <Loader v-if="isSubmitted" />
            <button id="confirm-button" v-else @click="confirmMuseum" :disabled="isDisabled">Confirm</button>
        </div>

        <!-- Footer KBytes -->
        <Footer />
    </div>
</template>

<style scoped>
    .container {
        animation: fadeIn 1s;
    }

    .search-cont {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 3.2rem;
    }

    .museum-logo {
        height: 15rem;
        border: 2px solid var(--color-secondary);
        border-radius: 5px;

        margin-bottom: 5rem;
    }

    .form {
        width: 100%;
    }

    .dropdown {
        width: 100%;
        border: 1px solid var(--color-secondary);
        border-radius: 10px;

        background-color: var(--color-surface);
        color: var(--color-white);
        padding: 7px 5px;
        margin-bottom: 25px;

        font-weight: normal !important;
    }

    .dropdown::selection {
        accent-color: var(--color-secondary);
    }

    button {
        background-color: var(--color-secondary);
        color: var(--color-primary);
    }

    button:hover {
        background-color: var(--color-secondary-darker);
        cursor: pointer;
    }

    button:disabled {
        background-color: #645d59;
    }

    @media screen and (min-width: 650px) {
        .container {
            width: 60vw;
        }
    }
</style>@/assets/components/common/common/common../../assets/components/common/Footer.vue@/assets/components/common/Error