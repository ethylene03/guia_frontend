<!-- DASHBOARD -->

<script>
    import Cards from "../../assets/components/Cards.vue"

    export default {
        components: {
            Cards,
        },

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
    };
</script>

<template>
    <div class="container">
        <!-- header -->
        <div class="header">
            <img src="/icons/museum-logo.svg" alt="museum_name" class="museum" />
            <img src="/icons/guia-long.svg" alt="Guía" class="guia" />
            
            <!-- menu -->
            <img src="/icons/menu.svg" class="menu" @click="redirect('./menu')" />
        </div>
    
        <!-- museum name -->
        <h1>Jose T. Joya Gallery</h1>
    
        <div :class="{'dashboard-cont': isBigScreen, 'dashboard-cont-small': !isBigScreen}">
            <!-- buttons -->
            <div :class="{'btn-cont': isBigScreen, 'btn-cont-small': !isBigScreen}">
                <!-- add artwork -->
                <button type="button" class="dashboard-btn add-artwork" @click="redirect('./add-artwork')" :style="{marginBottom: '10px'}">
                    <img src="/icons/add.svg" alt="add artwork" />
                    <h2>Add Artwork</h2>
                </button>

                <!-- visitor portal if big screen -->
                <button v-if="isBigScreen" type="button" class="dashboard-btn visitor-portal" @click="redirect('/home')" :style="{marginTop: '20px'}">
                    <img src="/icons/launch.svg" alt="launch portal" />
                    <h2>Go to Visitor Portal</h2>
                </button>
            </div>

            <!-- cards -->
            <div class="cards" :style="{marginBottom: '50px'}">
                <Cards :isNum="true" :number="103" label="Artworks in the Directory"/>
                <Cards :isNum="false" label="Most Popular Artworks"/>
                <Cards :isNum="true" :number="52" label="Museum Guide Users in the Last 24h"/>
                <Cards :isNum="false" label="Most Crowded Sections" />
            </div>
        </div>

        <!-- visitor portal if small screen -->
        <button v-if="!isBigScreen" type="button" class="dashboard-btn visitor-portal" @click="redirect('/home')">
            <img src="../../../icons/launch.svg" alt="launch portal" />
            <h2>Go to Visitor Portal</h2>
        </button>
    </div>
</template>

<style scoped>
    .header {
        padding: 20px 0 10px 0;
        width: 100%;
        
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .museum, .guia {
        width: 80px;
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
        flex-direction: row;
    }
    
    .btn-cont {
        margin-top: 10px;
        width: 30%;
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

    @media screen and (min-width: 650px) {
        .header {
            padding: 0;
        }

        h1 {
            font-size: 25px;
        }

        .museum, .guia {
            width: clamp(100px, 130px, 170px);
        }

        .cards {
            width: 70%;
            display: grid;
            justify-items: end;  
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 30px;
        }
    }
</style>