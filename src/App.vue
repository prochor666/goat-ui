<template>
    <div class="relative min-h-screen bg-white dark:bg-black">
        <Suspense>
            <template #default>
                <router-view></router-view>
            </template>
            <template #fallback>
                <div class="flex items-center animate-pulse text-gray-900 dark:text-gray-400 text-center">
                    <svg class="animate-spin -l-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script>
export default {
    components: {},

    setup() {
        return {};
    },
};
</script>
<style>
input:autofill {
  filter: none;
  background: none; /* or any other */
}

:-moz-autofill, :-moz-autofill-preview {
  filter: none;
  background: none;
}

* {
    --scrollbarBG: rgb(230, 230, 230);
    --thumbBG: rgb(160, 160, 160);
}
*.dark,
html.dark * {
    --scrollbarBG: rgb(31, 31, 31);
    --thumbBG: rgb(80, 80, 80);
}
*::-webkit-scrollbar {
    width: 12px;
}
* {
    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
*::-webkit-scrollbar-track {
    background: var(--scrollbarBG);
}
*::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG);
    border-radius: 5px;
    border: 2px solid var(--scrollbarBG);
}

.v3dp__datepicker {
    --vdp-bg-color: #ffffff;
    --vdp-text-color: #000000;
    --vdp-box-shadow: 0 4px 10px 0 rgba(128, 144, 160, 0.1),
        0 0 1px 0 rgba(128, 144, 160, 0.81);
    --vdp-border-radius: 3px;
    --vdp-heading-size: 2.5em;
    --vdp-heading-weight: bold;
    --vdp-heading-hover-color: #eeeeee;
    --vdp-arrow-color: #000000;
    --vdp-elem-color: #000000;
    --vdp-disabled-color: #d5d9e0;
    --vdp-hover-color: #ffffff;
    --vdp-hover-bg-color: #4338ca;
    --vdp-selected-color: #ffffff;
    --vdp-selected-bg-color: #4338ca;
    --vdp-elem-font-size: 0.8em;
    --vdp-elem-border-radius: 3px;
    --vdp-divider-color: #d5d9e;
}

.dark .v3dp__datepicker {
    --vdp-bg-color: #111827;
    --vdp-text-color: #e5e7eb;
    --vdp-box-shadow: 0 4px 10px 0 rgba(128, 144, 160, 0.1),
        0 0 1px 0 rgba(128, 144, 160, 0.81);
    --vdp-border-radius: 5px;
    --vdp-heading-size: 2.5em;
    --vdp-heading-weight: bold;
    --vdp-heading-hover-color: rgba(31, 41, 55, 1);
    --vdp-arrow-color: #e5e7eb;
    --vdp-elem-color: #e5e7eb;
    --vdp-disabled-color: #6b7280;
    --vdp-hover-color: #ffffff;
    --vdp-hover-bg-color: #4338ca;
    --vdp-selected-color: #ffffff;
    --vdp-selected-bg-color: #4338ca;
    --vdp-elem-font-size: 0.8em;
    --vdp-elem-border-radius: 5px;
    --vdp-divider-color: #374151;
}
</style>
