<!-- DASHBOARD -->

<script>
    // component used
    import { fetchDashboard } from "@/assets/API calls/dashboardAPI";
    import { getMuseum } from "@/assets/API calls/museumAPI";
    import Welcome from "@/assets/components/common/Welcome.vue";
    import { getMuseumId, redirect, redirectNewTab } from "@/assets/components/common/common";
    import Cards from "@/assets/components/dashboard/Cards.vue";
    import Header from "@/assets/components/common/Header.vue";
    import LaunchIcon from 'icons/OpenInNew.vue';
    import PlusIcon from 'icons/Plus.vue';

    export default {
        components: {
            Cards,
            LaunchIcon,
            PlusIcon,
            Welcome,
            Header
        },

        data() {
            // screen width variable
            return {
                screenWidth: window.innerWidth,
              museum_data: {
                popular_artworks: [{ art_id:0, image_thumbnail: '' }],
                popular_sections: [{section_id:0, section_name:''}]
                },
                pageLoad: false,
                museum_name: '',
            };
        },

        computed: {
            // determines if the screen is big or not
            isBigScreen() {
                return this.screenWidth > 650;
            },
        },

        // window listener to fetch window screen size
        async mounted() {
            window.addEventListener('resize', this.updateScreenSize);
            this.pageLoad = true;

            this.museum_data = await fetchDashboard();
            const museum = await getMuseum(getMuseumId('admin'));
            // console.log(museum)
            this.museum_name = museum[0].museum_name;

            this.pageLoad = false;
        },
        
        methods: {
            // updates screen width variable
            updateScreenSize() {
                this.screenWidth = window.innerWidth;
            },
            redirect,
            redirectNewTab
        },

        // delete window listener after use
        beforeDestroy() {
            window.removeEventListener('resize', this.updateScreenSize);
        },
    };
</script>

<template>
    <Welcome v-if="pageLoad" :start="pageLoad" />
    <div v-else class="container">
        <!-- header -->
        <Header :isDashboard="true" />
    
        <!-- museum name -->
        <h1>{{ museum_name }}</h1>
    
        <div :class="{'dashboard-cont': isBigScreen, 'dashboard-cont-small': !isBigScreen}">
            <!-- buttons -->
            <div :class="{'btn-cont': isBigScreen, 'btn-cont-small': !isBigScreen}">
                <!-- add artwork -->
                <button type="button" class="dashboard-btn add-artwork" @click="redirect('./add')">
                    <plus-icon fillColor="var(--color-primary)" :size="20" style="display: flex; margin-right: 10px;" />
                    <h2>Add Artwork</h2>
                </button>

                <!-- visitor portal if big screen -->
                <button v-if="isBigScreen" type="button" class="dashboard-btn visitor-portal" @click="redirectNewTab('/search-museum')">
                    <launch-icon fillColor="var(--color-primary)" :size="20" style="display: flex; margin-right: 10px;" />
                    <h2>Go to Visitor Portal</h2>
                </button>
            </div>

            <!-- cards -->
            <div class="cards" :style="{marginBottom: '30px'}">
                <Cards :type="'number'" :number="museum_data.artworks_count" label="Artworks in the Directory >" @click="redirect('/on-cloud-nine/view/all')" :style="{cursor: 'pointer'}" />
                <Cards :type="'images'" 
                :artworks = "museum_data.popular_artworks.length > 0
                  ? museum_data.popular_artworks : []"
                label="Most Popular Artworks"/>
                <Cards :type="'number'" :number="museum_data.visitors_count" label="Museum Guide Users in the Last 24h"/>
                <Cards 
                  :type="'sections'" 
                  :sections="museum_data.popular_sections.length > 0
                  ? museum_data.popular_sections : []"
                  label="Most Crowded Sections" />
            </div>
        </div>

        <!-- visitor portal if small screen -->
        <button v-if="!isBigScreen" type="button" class="dashboard-btn visitor-portal" @click="redirectNewTab('/search-museum')" :style="{marginTop: '0px', marginBottom: '10px'}">
            <launch-icon fillColor="var(--color-primary)" :size="20" style="display: flex; margin-right: 10px;" />
            <h2>Go to Visitor Portal</h2>
        </button>
    </div>
</template>

<style scoped>
    .container {
        height: fit-content !important;
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
            width: 60dvw;
        }

        h1 {
            font-size: 25px;
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