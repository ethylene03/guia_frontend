<script>
    export default {
        props: {
            sectionName: {
                type: String,
                default: 'Guia',
            },

            traffic: {
                type: Number,
                default: 0,
            },

            visited: {
                type: Number,
                default: 0,
            },

            artworks: {
                type: Number,
                default: 0,
            },

            cols: {
                type: Number,
                default: 1,
            },

            rows: {
                type: Number,
                default: 1,
            },
        },
    };
</script>

<template>
    <div
        :style="{ gridTemplateColumns: `repeat(${cols}, 60px)`, gridTemplateRows: `repeat(${rows}, 60px)` }" 
        :class="{'red': traffic > 20, 'orange': traffic <= 20 && traffic > 10, 'yellow': traffic <= 10 && traffic > 5, 'white': traffic <= 5}"
    >
        <div 
            class="texts"
            :style="{ gridRow: `1 / span ${rows}`, gridColumn: `1 / span ${cols}` }"
        >
            <text style="font-weight: bold;">{{ sectionName }}</text>
            <text>{{ visited }}/{{ artworks }}</text>
        </div>
    </div>
</template>

<style scoped>
    .red,
    .orange,
    .yellow,
    .white {
        border: 2px solid var(--color-secondary);
        cursor: pointer;

        display: grid;
        justify-items: center; 
        align-items: center;
        gap: 0;

        width: fit-content;
        height: fit-content;
        margin-right: -2px;
    }

    .red {
        background-color: var(--color-error);
        color: var(--color-primary);
    }

    .red:hover {
        background-color: var(--color-error-darker);
    }

    .orange {
        background-color: #D97738;
        color: var(--color-primary);
    }

    .orange:hover {
        background-color: #b86430;
    }

    .yellow {
        background-color: #E3CC62;
        color: var(--color-secondary);
    }

    .yellow:hover {
        background-color: #d7ba38;
    }

    .white {
        background-color: #F4EBBF;
        color: var(--color-secondary);
    }

    .white:hover {
        background-color: #d0c698;
    }

    .texts {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    text {
        font-size: x-small !important;
    }
</style>