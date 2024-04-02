<script>
    import { getSection } from '@/assets/API calls/sectionAPI';
    import Section from './Section.vue';
import { getArtworkVisits } from '@/assets/API calls/artworkAPI';
import { getToken } from '@/assets/components/common/common';

    export default {
        data() {
            return {
                sections: [],
                isReady: false,
                sizes: [
                    {cols: 1, rows: 2},
                    {cols: 1, rows: 1},
                    {cols: 1, rows: 1},
                    {cols: 1, rows: 3},
                    {cols: 2, rows: 1},
                    {cols: 1, rows: 1},
                ]
            }
        },

        components: {
            Section,
        },

        async mounted() {
            const sect = await getSection(null, 'visitor');
            // console.log(sect);

            await Promise.all(sect.section.map(async (section) => {
                var obj = section;

                const visits = await getArtworkVisits(section.section_id, getToken('visitor'));
                obj.visited = visits.visited;
                obj.artworks = visits.artworks;
                obj.cols = this.sizes[section.section_id - 1].cols;
                obj.rows = this.sizes[section.section_id - 1].rows;

                this.sections.push(obj);
            }))

            // sort array by its section_id
            this.sections.sort((a, b) => a.section_id - b.section_id);

            console.log(this.sections)
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
        <Section v-for="section in sections" :class="section.section_name.toLowerCase()" :sectionName="section.section_name" :traffic="12" :visited="section.visited" :artworks="section.artworks" :cols="section.cols" :rows="section.rows" @click="viewCheckList(section.section_id)" />
    </div>
</template>

<style scoped>
    .map-cont {
        position: relative;
        display: flex;
    }

    .grace {
        position: absolute;
        top: 120px;
    }

    .rica {
        position: absolute;
        top: 180px;
    }
</style>