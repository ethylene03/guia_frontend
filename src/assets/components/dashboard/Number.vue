<script>
    export default {
        data() {
            return {
                display: 0,
                interval: false,
            }
        },

        props: {
            targetNumber: 0
        },

        mounted() {
            this.interval = window.setInterval(() => {
                if(this.display >= this.targetNumber)
                    window.clearInterval(this.interval)
                else
                    this.display += 1;
            }, 50);
        },

        beforeDestroy() {
            clearInterval(this.interval);
        }


    }
</script>

<template>
    <div class="running-number-cont box-shadow">
        <h2>{{ display }}</h2>
    </div>
</template>

<style scoped>
    .running-number-cont h2 {
        color: var(--color-surface);
        font-size: clamp(50px, 103px, 103px);
        font-weight: bold;
        line-height: 1;
        text-align: center;
    }
</style>