<!-- DASHBOARD -->

<script>
    // component used
    import { fetchDashboard } from "@/assets/API calls/dashboardAPI";
    import { getMuseum } from "@/assets/API calls/museumAPI";
    import { getMuseumId, redirect, redirectNewTab } from "@/assets/components/common/common";
    import Header from "@/assets/components/common/Header.vue";
    import Welcome from "@/assets/components/common/Welcome.vue";
    import Cards from "@/assets/components/dashboard/Cards.vue";
    import Number from "@/assets/components/dashboard/Number.vue";
    import Bar from "@/assets/components/dashboard/Bar.vue";
import Footer from "@/assets/components/common/Footer.vue";
import NoContent from "@/assets/components/common/NoContent.vue";

    export default {
        components: {
            Welcome,
            Header,
            Number,
            Cards,
            Bar,
            Footer,
            NoContent
        },

        data() {
            return {
                museum_data: {},
                pageLoad: false,
                museum_name: '',
            };
        },

        async mounted() {
            this.pageLoad = true;

            this.museum_data = await fetchDashboard();
            const museum = await getMuseum(getMuseumId('admin'));
            console.log(this.museum_data)
            this.museum_name = museum[0].museum_name;

            this.pageLoad = false;
        },
        
        methods: {
            redirect,
            redirectNewTab
        }
    };
</script>

<template>
    <Welcome v-if="pageLoad" :start="pageLoad" />
    <div v-else class="container">
        <!-- header -->
        <Header :isDashboard="true" />
    
        <!-- museum name -->
        <h1>{{ museum_name }}</h1>

        <div class="dashboard-stat">
            <!-- artwork count -->
            <div class="art-count">
                <div class="counter">
                    <Number :targetNumber="museum_data.artworks_count"  />
                    <text>Total Artworks</text>
                </div>
                
                <button class="prim-btn" @click="redirect('./view/all')">
                    Go to Directory ->
                </button>
                <button class="secondary-btn" @click="redirect('./add')">
                    Add New Artwork ->
                </button>
            </div>
            
            <!-- popular artworks -->
            <div class="pop-art">
                <h1>Most Popular Artworks</h1>
                <div class="cards-cont" :style="museum_data?.popular_artworks?.length === 0 ? 'justify-content: center;' : 'justify-content: space-between;'">
                    <no-content v-if="museum_data?.popular_artworks?.length === 0" />
                    <Cards v-else v-for="art in museum_data.popular_artworks" 
                        :art="art" />
                </div>
            </div>
            
            <!-- user-count -->
            <div class="user-count-cont">
                <div class="user-count">
                    <span class="user-loader">
                        <Number :targetNumber="museum_data.visitors_count" />
                        <text>Users in the<br/>last 24 hours</text>
                    </span>
                </div>
            </div>

            <!-- crowd -->
            <div class="crowd-stat">
                <h1>Most Crowded Sections</h1>
                <div class="bar-graph">
                    <Bar :sections="museum_data.popular_sections" />
                </div>
                <button class="secondary-btn" style="margin-top: 30px;" @click="redirect('/')">
                    Go to Visitor Portal ->
                </button>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
    .container {
        height: fit-content !important;
    }

    h1 {
        color: var(--color-accent);
        padding-bottom: 10px;
        text-align: center;
    }

    .dashboard-stat {
        display: flex;
        flex-direction: column;
        gap: 50px;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 5rem;

        @media (min-width: 768px) {
            display: grid;
            grid-template-areas:
                "a d"
                "b c";
            gap: 50px;

            .art-count {
                grid-area: a;
            }

            .pop-art {
                grid-area: b;
            }

            .user-count {
                grid-area: c;
            }

            .crowd-stat {
                grid-area: d;
                width: 300px;
            }
        }
    }

    .art-count {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    text {
        font-size: clamp(16px, 20px, 20px);
        color: var(--color-surface);
        font-weight: bold;
        text-align: center;
        line-height: 1.25;
    }

    button {
        background-color: var(--color-accent);
        color: white;
        padding: 15px 0;
        width: 100%;
        margin: 15px 0 0 0;
        font-size: clamp(13px, 16px, 16px);
    }

    button:hover {
        background-color: var(--color-accent-darker);
    }

    .secondary-btn {
        background-color: var(--color-primary);
        border: 1px solid var(--color-surface);
        color: var(--color-surface)
    }

    .secondary-btn:hover {
        background-color: var(--color-primary-darker);
    }

    a {
        text-decoration: underline;
        color: var(--color-surface);
        font-weight: bold;
        text-align: center;
    }

    .cards-cont {
        position: relative;
        display: grid;
        grid-template-areas: "b a c";
        align-items: center;

        margin: 30px 0;
    }

    .cards-cont .card-cont:nth-child(1) {
        grid-area: a;
    }

    .cards-cont .card-cont:nth-child(2) {
        grid-area: b;
    }

    .cards-cont .card-cont:nth-child(3) {
        grid-area: c;
    }

    .user-count-cont {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .user-count {
        margin: 30px 0;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        position: relative;
        transform:rotate(45deg);
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        align-self: center;

        text {
            font-size: 13px;
            font-weight: bold;
            text-align: center;
        }
    }

    .user-count::before {
        content: "";
        position: absolute;
        box-sizing: border-box;
        inset: -20px;
        border-radius: 50%;
        border: 20px solid var(--color-surface);
        animation: prixClipFix 1s linear;
        animation-iteration-count: 1;
    }

    .user-loader {
        transform: rotate(-45deg);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        align-self: center;

        text {
        font-size: 13px;
        font-weight: bold;
        text-align: center;
        }
    }

    .bar-graph {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* CSS for bigger screens */
    @media screen and (min-width: 650px) {
        .container {
            width: 60dvw;
        }

        h1 {
            font-size: 25px;
        }
    }

    @keyframes prixClipFix {
        0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
        25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
        50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
        75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
        100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
    }
</style>