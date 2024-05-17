<script>
    import Section from './Section.vue';
    import { getSectionDetails } from '@/assets/components/museum-map/SectionDetails.js';

    export default {
        data() {
            return {
                sections: [],
                isReady: false,
                sizes: [
                    {cols: 4, rows: 1}, // ground floor
                    {cols: 4, rows: 1}, // second floor
                    {cols: 1, rows: 2}, // staircase
                ]
            }
        },

        components: {
            Section,
        },

        async mounted() {
            this.sections = await getSectionDetails(this.sizes);
        },

        methods: {
            viewCheckList(section_id) {
                window.location.href = '/checklist/' + section_id;
            }
        }
    }
</script>

<template>
    <div class="map-cont">
        <!-- each cell is equivalent to 60px x 60px -->
        <Section v-for="section in sections" :class="section.section_name.toLowerCase()" :sectionName="section.section_name" :traffic="section.traffic" :visited="section.visited" :artworks="section.artworks" :cols="section.cols" :rows="section.rows" @click="viewCheckList(section.section_id)" />
    </div>
</template>

<style scoped>
    .map-cont {
        position: relative;
        display: flex;
    }

    .ground.floor {
        position: absolute;
        top: 184px;
    }

    .staircase {
        position: absolute;
        top: 62px;
        left: 0;
    }

    .rica {
        position: absolute;
        top: 180px;
    }
</style>