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
        <!-- each cell is equivalent to 60px x 60px -->
        <Section class="Paglawig" sectionName="Paglawig" :traffic="21" :visited="12" :artworks="9" :cols="1" :rows="2" @click="viewCheckList(1)" />
        <Section class="Kinaadman" sectionName="Kinaadman" :traffic="6" :visited="2" :artworks="15" :cols="1" :rows="1" @click="viewCheckList(1)" />
        <Section class="Mugna" sectionName="Mugna" :traffic="2" :visited="10" :artworks="22" :cols="1" :rows="1" @click="viewCheckList(1)" />
        <Section class="Sugbo" sectionName="Sugbo" :traffic="1" :visited="12" :artworks="25" :cols="1" :rows="3" @click="viewCheckList(1)" />
        <Section class="Kinaiyahan" sectionName="Kinaiyahan" :traffic="17" :visited="5" :artworks="15" :cols="2" :rows="1" @click="viewCheckList(1)" />
        <Section class="Lantawan" sectionName="Lantawan" :traffic="8" :visited="11" :artworks="12" :cols="1" :rows="1" @click="viewCheckList(1)" />
    </div>
</template>

<style scoped>
    .map-cont {
        position: relative;
        display: flex;
    }

    .Kinaiyahan {
        position: absolute;
        top: 120px;
    }

    .Lantawan {
        position: absolute;
        top: 180px;
    }
</style>