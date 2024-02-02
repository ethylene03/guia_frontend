<script>
    import Section from './Section.vue';

    export default {
        components: {
            Section,
        },

        methods: {
            viewCheckList(section_id) {
                this.$router.push('/checklist/' + section_id);
            }
        }
    }
</script>

<template>
    <div class="map-cont">
        <Section sectionName="Paglawig" :traffic="21" :visited="12" :artworks="9" :cols="1" :rows="2" @click="viewCheckList(1)" />
        <Section sectionName="Kinaadman" :traffic="6" :visited="2" :artworks="15" :cols="1" :rows="1" @click="viewCheckList(1)" />
        <Section sectionName="Mugna" :traffic="2" :visited="10" :artworks="22" :cols="1" :rows="1" @click="viewCheckList(1)" />
        <Section sectionName="Sugbo" :traffic="1" :visited="12" :artworks="25" :cols="1" :rows="3" @click="viewCheckList(1)" />
        <Section sectionName="Kinaiyahan" :traffic="17" :visited="5" :artworks="15" :cols="2" :rows="1" @click="viewCheckList(1)" />
        <Section sectionName="Lantawan" :traffic="8" :visited="11" :artworks="12" :cols="1" :rows="1" @click="viewCheckList(1)" />
    </div>
</template>

<style scoped>
    .map-cont {
        display: flex;
    }
</style>