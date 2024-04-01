<template>
    <div class="traffic-code">
        <text style="font-weight: bold;">Museum Traffic Code:</text>
        <div class="code">
            <div class="code-red"></div>
            <text>More than 20 visitors</text>
        </div>
        <div class="code">
            <div class="code-orange"></div>
            <text>11 to 20 visitors</text>
        </div>
        <div class="code">
            <div class="code-yellow"></div>
            <text>6 to 10 visitors</text>
        </div>
        <div class="code">
            <div class="code-white"></div>
            <text>Less than 6 visitors</text>
        </div>
    </div>
</template>

<style scoped>
    .traffic-code {
        text-align: left;
    }

    .code {
        display: flex;
        align-items: center;
        margin-left: 30px;
    }

    .code-red,
    .code-orange,
    .code-yellow,
    .code-white {
        width: 15px;
        height: 15px;
        border: 2px solid;

        margin-right: 15px;
    }

    .code-red {
        background-color: var(--color-error);
        border-color: var(--color-error);
    }

    .code-orange {
        background-color: #D97738;
        border-color: #D97738;
    }

    .code-yellow {
        background-color: #E3CC62;
        border-color: #E3CC62;
    }

    .code-white {
        background-color: #F4EBBF;
        border-color: #F4EBBF;
    }
</style>