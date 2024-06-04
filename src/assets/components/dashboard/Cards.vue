<script>
    import { redirect } from "@/assets/components/common/common.js"
    export default {
        props: {
            art: {},
        },

        methods: {
            redirect
        }
    }
</script>

<template>
    <div class="card-cont box-shadow" :key="art.art_id" @click="redirect(`./view/${art.art_id}`)">
        <img :src="art.image_thumbnail" :alt="art.title" />
        <div class="text-cont">
            <text>{{ art.title }}</text>
        </div>
    </div>
</template>

<style scoped>
    .card-cont {
        width: 100px !important;
        height: 150px;
        overflow: hidden;
        background-color: white;
        border-radius: 20px;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        img {
            height: 100px;
            width: 100%;
            border-radius: 20px 20px 0 0;
        }

        .text-cont {
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        text {
            color: var(--color-surface);
            font-weight: bold;
            font-size: clamp(12px, 13px, 13px)
        }
    }

    .card-cont:hover {
        transform: scale(110%);
    }

    .card-cont:nth-child(1){
        z-index: 1;

        height: 200px;
        width: 150px !important;
    }

    .card-cont:nth-child(1) img {
        height: 150px !important;
    }
</style>