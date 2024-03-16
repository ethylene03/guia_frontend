<script>
    import SortIcon from 'icons/SortVariant.vue';
    import FilterIcon from 'icons/FilterOutline.vue';
    import Filters from './Filters.vue';

    export default {
        components: {
            SortIcon,
            FilterIcon,
            Filters
        },

        data() {
            return {
                sort: false,
                filter: false,
    
                sortOpt: ["title", "artist", "year"],
                filterOpt: ["All", "Before 1900s", "1900-1950", "1950-2000", "2000-2010", "2010-2020", "2020-Present"],
            }
        },

        props: {
            filteredArt: Array,
        },

        methods: {
            updateFilterType(option) {
                this.$emit('filterType', option);
            },
            openDropdown(type) {
                if(type === 'sort') {
                    this.sort = !this.sort;
                    if(this.sort)
                        this.filter = false;
                } else {
                    this.filter = !this.filter;
                    if(this.filter)
                        this.sort = false;
                }
            },
        }
    }
</script>

<template>
    <div class="title">
        <h1>Artwork Directory</h1>
        <div class="filters">
            <!-- sort -->
            <sort-icon class="sort-filter" title="sort artworks" fillColor="var(--color-secondary)" :size="30" @click="openDropdown('sort')" />
            <Filters filter="sort" :type="sort" :options="sortOpt" :artworks="filteredArt" />

            <!-- filter -->
            <filter-icon class="sort-filter" title="filter artworks" fillColor="var(--color-secondary)" :size="30" @click="openDropdown('filter')" />
            <Filters filter="filter" :type="filter" :options="filterOpt" :artworks="filteredArt" @filterType="updateFilterType($event)" />
        </div>
    </div>
</template>

<style scoped>
.sort-filter {
    cursor: pointer;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    margin-bottom: 10px;
}
</style>