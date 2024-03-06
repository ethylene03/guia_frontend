<!-- DASHBOARD -->

<script>
    // component used
    import Cards from "../../assets/components/Cards.vue"
    import LaunchIcon from 'icons/OpenInNew.vue';
    import PlusIcon from 'icons/Plus.vue';
    import MenuIcon from 'icons/Menu.vue';

    export default {
        components: {
            Cards,
            LaunchIcon,
            PlusIcon,
            MenuIcon,
        },

        data() {
            // screen width variable
            return {
                screenWidth: window.innerWidth,
            };
        },

        computed: {
            // determines if the screen is big or not
            isBigScreen() {
                return this.screenWidth > 650;
            },
        },

        // window listener to fetch window screen size
        mounted() {
            window.addEventListener('resize', this.updateScreenSize);
        },
        
        methods: {
            // redirect to another page
            redirect(path) {
                window.location.href = path;
            },

            // updates screen width variable
            updateScreenSize() {
                this.screenWidth = window.innerWidth;
            },
        },

        // delete window listener after use
        beforeDestroy() {
            window.removeEventListener('resize', this.updateScreenSize);
        },
    };
</script>

<template>
    <div class="container">
        <!-- header -->
        <div class="header">
            <img src="/icons/museum-logo.svg" alt="museum_name" class="museum" />
            <img src="/icons/guia-long.svg" alt="Guía" class="guia" />
            
            <!-- menu -->
            <menu-icon class="menu" @click="redirect('/on-cloud-nine/menu')" fillColor="var(--color-primary)" :size="20" style="display: flex; justify-content: center; align-items: center;" />
        </div>
    
        <!-- museum name -->
        <h1>Jose T. Joya Gallery</h1>
    
        <div :class="{'dashboard-cont': isBigScreen, 'dashboard-cont-small': !isBigScreen}">
            <!-- buttons -->
            <div :class="{'btn-cont': isBigScreen, 'btn-cont-small': !isBigScreen}">
                <!-- add artwork -->
                <button type="button" class="dashboard-btn add-artwork" @click="redirect('./add')">
                    <plus-icon fillColor="var(--color-primary)" :size="20" style="display: flex; margin-right: 10px;" />
                    <h2>Add Artwork</h2>
                </button>

                <!-- visitor portal if big screen -->
                <button v-if="isBigScreen" type="button" class="dashboard-btn visitor-portal" @click="redirect('/search-museum')">
                    <launch-icon fillColor="var(--color-primary)" :size="20" style="display: flex; margin-right: 10px;" />
                    <h2>Go to Visitor Portal</h2>
                </button>
            </div>

            <!-- cards -->
            <div class="cards" :style="{marginBottom: '30px'}">
                <Cards :isNum="true" :number="103" label="Artworks in the Directory >" @click="redirect('/on-cloud-nine/view/all')" :style="{cursor: 'pointer'}" />
                <Cards :isNum="false" label="Most Popular Artworks"/>
                <Cards :isNum="true" :number="52" label="Museum Guide Users in the Last 24h"/>
                <Cards :isNum="false" label="Most Crowded Sections" />
            </div>
        </div>

        <!-- visitor portal if small screen -->
        <button v-if="!isBigScreen" type="button" class="dashboard-btn visitor-portal" @click="redirect('/home')" :style="{marginTop: '0px', marginBottom: '10px'}">
            <launch-icon fillColor="var(--color-primary)" :size="20" style="display: flex; margin-right: 10px;" />
            <h2>Go to Visitor Portal</h2>
        </button>
    </div>
</template>

<style scoped>
    .container {
        height: fit-content !important;
    }

    .header {
        position: relative;
        padding: 20px 0 10px 0;
        width: 100%;
        
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        margin-bottom: 20px;
    }

    .museum, .guia {
        width: 80px;
    }

    .guia {
        position: absolute;
        left: 50%;
        margin-left: -40px;
    }

    .menu {
        background-color: var(--color-secondary);
        padding: 10px;
        border-radius: 20px;
    }

    .menu:hover {
        background-color: var(--color-secondary-darker);
        cursor: pointer;
    }

    h1 {
        color: var(--color-accent);
        padding-bottom: 10px;
    }

    .dashboard-cont {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    
    .btn-cont {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .visitor-portal {
        margin-top: 20px;
    }

    .add-artwork {
        margin-bottom: 10px;
    }

    .dashboard-cont-small, .btn-cont-small {
        width: 100%;
    }

    .dashboard-btn {
        width: 100%;
        background-color: var(--color-secondary);

        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color-primary);
    }

    .dashboard-btn:hover {
        background-color: var(--color-secondary-darker);
        cursor: pointer;
    }

    .dashboard-btn img {
        height: 1.1em;
    }

    .dashboard-btn h2 {
        margin-left: 10px;
    }

    .cards {
        width: 100%;
    }

    /* CSS for bigger screens */
    @media screen and (min-width: 650px) {
        .container {
            width: 60vw;
        }
        .header {
            padding: 0;
        }

        h1 {
            font-size: 25px;
        }

        .museum, .guia {
            width: 100px;
        }

        .cards, .btn-cont {
            width: 100%;
            display: grid;
            justify-items: center;  
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(1, 1fr);
            gap: 30px;
        }

        .dashboard-btn {
            width: 90%;
        }

        .visitor-portal {
            margin-top: 0;
            margin-bottom: 20px;
        }
        
        .add-artwork {
            margin-bottom: 0;
            margin-bottom: 20px;
        }
    }
</style>