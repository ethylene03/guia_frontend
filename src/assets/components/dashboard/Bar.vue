<script>
    import NoContent from '../common/NoContent.vue';

    export default {
        components: {
            NoContent,
        },

        data() {
            return {
                ordered_sect: []
            }
        },

        props: {
            sections: [],
        },

        mounted() {
            if(this.sections) {
                var highest = parseInt(this.sections[0]?.visit_count);

                var with_height = this.sections.map(sec => {
                    var arr = sec;

                    var count = parseInt(sec.visit_count)
                    arr.height = count / highest * 100;

                    return arr;
                })

                this.ordered_sect.push(with_height[2])
                this.ordered_sect.push(with_height[0])
                this.ordered_sect.push(with_height[1])
            } else {
                this.ordered_sect = [];
            }
        }
    }
</script>

<template>
    <div v-if="ordered_sect.length === 0" class="cont-centered">
        <no-content />
    </div>
    <div v-else v-for="section in ordered_sect" class="stair-cont">
        <text>{{ section.section_name }}</text>
        <div class="stair" :style="`height: ${section.height}%`">
            <h3>{{ section.visit_count }}</h3>
        </div>
    </div>
</template>

<style scoped>
    .stair-cont {
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        width: calc((100dvw - 60px) / 3);
    }

    .stair-cont text {
        margin-bottom: 10px;
        color: var(--color-surface);
        font-weight: bold;
        font-size: clamp(12px, 16px, 16px);

        @media (min-width: 768px) {
            font-size: 14px;
        }
    }

    .stair {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        color: var(--color-primary)
    }

    .stair-cont:nth-child(1) .stair {
        background-color: var(--color-secondary);
    }

    .stair-cont:nth-child(2) .stair {
        background-color: var(--color-surface);
    }

    .stair-cont:nth-child(3) .stair {
        background-color: var(--color-accent);
    }

    
</style>