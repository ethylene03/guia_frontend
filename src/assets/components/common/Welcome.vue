<!-- 
    Summary: This is a custom page loader aside from the Loader component.

    Props:
        1. start - variable that triggers the start and end of the animation (boolean)
    
    To Use:
        <script>
            import Welcome from "@/assets/components/common/Welcome.vue";

            export default {
                components: {
                    ...,
                    Welcome,
                }
            }
        </script>

        <template>
            <Welcome v-if="showWelcomePage" :start="startTrigger" />
        </template>
 -->

<script>
    import Loader from '@/assets/components/common/Loader.vue';

    export default {
        components: {
            Loader,
        },

        props: {
            start: true,
            welcome: false,
        }
    }
</script>

<template>
    <div :class="{'welcome-in': start, 'welcome-out': !start}" class="welcome">
        <img v-if="welcome" src="../../images/welcome.png" alt="Guia: Guiding you through history" />
        <Loader />
        <text>Loading... Please wait</text>
    </div>
</template>

<style scoped>
    .welcome {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .welcome img {
        width: 50%;
        margin-bottom: 50px;
    }

    .welcome text {
        margin-top: 20px;
    }

    .welcome-in {
        animation: fadeIn 2s;
    }

    .welcome-out {
        animation: fadeOut 1s;
    }

    @media screen and (min-width: 650px) {
        .welcome img {
            width: 30%;
        }
    }
</style>