<script>
    import { getMuseum } from "@/assets/API calls/museumAPI";
    import { generateToken } from "@/assets/API calls/visitorAPI";
    import Header from "@/assets/components/common/Header.vue";
    import Loader from "@/assets/components/common/Loader.vue";
    import Welcome from "@/assets/components/common/Welcome.vue";
    import { errorToast, getMuseumId, getToken } from "@/assets/components/common/common";
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
            localStorage.removeItem('visitor_token_expiry');
            
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
                    errorToast('Please select a museum', 'refresh');
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
            <div class="museum-logo">
                <img v-if="!museum_id" src="../../assets/images/no-museum.png" alt="no-museum" />
                <img v-else src="../../assets/images/museum-dark.png" alt="museum-logo" />
            </div>
    
            <!-- select museum here -->
            <div class="form">
                <h1 :style="{marginBottom: '15px'}">Search Museum</h1>

                <!-- select form (map the options for the integration) -->
                <select class="dropdown box-shadow" @change="handleChange">
                    <option value="" hidden>Select museum name here</option>
                    <option v-for="(mus) in museums" :value="mus.museum_id">{{ mus.museum_name }}</option>
                </select>
            </div>
    
            <!-- confirm button (add API submit integration) -->
            <Loader v-if="isSubmitted" />
            <button id="confirm-button" v-else @click="confirmMuseum" :disabled="isDisabled" class="box-shadow">
                Confirm
            </button>
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
        height: 250px;
        width: 250px;
        /* border: 2px solid var(--color-secondary); */
        border-radius: 5px;

        margin-bottom: 5rem;
    }

    .museum-logo img {
        height: 250px;
        width: 250px;
    }

    .form {
        width: 100%;
        text-align: center;
    }

    .dropdown {
        width: 100%;
        /* border: 1px solid var(--color-secondary); */
        border-radius: 10px;

        background-color: var(--color-surface);
        color: var(--color-white);
        padding: 10px 5px;
        margin-bottom: 25px;

        font-weight: normal !important;
        outline: none;
        cursor: pointer;
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
            width: 60dvw;
        }

        .museum-logo {
            margin-bottom: 3rem;
        }
    }
</style>