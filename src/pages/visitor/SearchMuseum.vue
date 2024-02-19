<script>
    import { loginGET, loginPOST } from "@/assets/API calls/api";
    import { useModal } from "vue-final-modal";
    import Footer from "../../assets/components/Footer.vue";
    import Header from "@/assets/components/Header.vue";
    import Toast from "@/assets/components/Toast.vue";
    import Loader from "@/assets/components/Loader.vue";
    import { refreshPage } from "@/assets/components/common";

    export default {
        components: {
        Footer,
        Header,
        Loader
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
            const AllMuseums = await loginGET('/museum/get');
            // console.log(AllMuseums);

            if(!AllMuseums.error) {
                this.museums = AllMuseums.data.museum;
                this.isReady = true;
            } else {
                const {open, close} = useModal({
                    component: Toast,
                    attrs: {
                        type: 'error',
                        message: 'Error fetching available museums!',
                    }
                })

                open();
            }
        },

        methods: {
            // to redirect to another screen
            redirect(path) {
                this.$router.push(path);
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
                    const generateToken = await loginPOST('/visitor/generate-token', {museum_id: this.museum_id});
                    // console.log(generateToken); 

                    if(!generateToken.error) {
                        localStorage.setItem('visitor_token', generateToken.data.visitor_token);

                        this.redirect('/scan');
                    } else {
                        this.isSubmitted = false;
                        const {open, close} = useModal({
                            component: Toast,
                            attrs: {
                                type: 'error',
                                message: 'Error fetching data!',
                            }
                        })

                        open();
                    }

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
    <Loader v-if="!isReady" />
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
            <button v-else @click="confirmMuseum" :disabled="isDisabled">Confirm</button>
        </div>

        <!-- Footer KBytes -->
        <Footer />
    </div>
</template>

<style scoped>

    .search-cont {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
</style>