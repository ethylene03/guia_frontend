<script>
    import Footer from "../../assets/components/Footer.vue";
    import Header from "@/assets/components/Header.vue";

    export default {
        components: {
            Footer,
            Header,
        },

        data() {
            return {
                museum: "",
                isDisabled: true,
            }
        },

        methods: {
            // to redirect to another screen
            redirect(path) {
                this.$router.push(path);
            },

            // receive museum
            handleChange(e) {
                this.museum = e.target.value;
                this.isDisabled = false;
            }
        },
    };
</script>

<template>
    <div class="container">
        <Header type="user" :showMenu="false" />
        <div class="search-cont">
            <!-- museum logo here (change the src for the integration) -->
            <img src="../../assets/images/museum-dark.png" class="museum-logo" />
    
            <!-- select museum here -->
            <div class="form">
                <h1 :style="{marginBottom: '15px'}">Search Museum</h1>

                <!-- select form (map the options for the integration) -->
                <select class="dropdown" @change="handleChange">
                    <option hidden>Input museum name here</option>
                    <option>Museum 1</option>
                    <option>Museum 2</option>
                    <option>Museum 3</option>
                </select>
            </div>
    
            <!-- confirm button (add API submit integration) -->
            <button @click="redirect('/scan')" :disabled="isDisabled">Confirm</button>
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