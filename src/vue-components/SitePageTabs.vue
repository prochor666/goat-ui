<template>
    <div>
        <div class="sm:hidden select-none border-b border-gray-200 dark:border-gray-800">
            <label for="tabs" class="sr-only">Select a tab</label>
            <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
            <select id="tabs" name="tabs" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md">
            <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
            </select>
        </div>
        <div class="hidden sm:block">
            <div class="select-none border-b border-gray-200 dark:border-gray-800">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <router-link v-for="tab in tabs" :key="tab.name" :to="tab.route" :class="[tab.current ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200', 'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm']" :aria-current="tab.current ? 'page' : undefined">
                {{ tab.name }}
                <span v-if="tab.count" :class="[tab.current ? 'bg-sky-100 text-sky-600' : 'bg-gray-100 text-gray-900', 'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block']">{{ tab.count }}</span>
                </router-link>
            </nav>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';

export default {
    props: {
        tabs: {
            type: Object,
            default: [
                {
                    name: 'Tab',
                    current: false,
                    route: '#',
                    count: false,
                },
            ],
        },
    },

    components: {},
    setup(props) {
        const route = useRoute();
        const router = useRouter();

        let tabs = props.tabs;

        return {
            tabs,
            router,
        };
    },
};
</script>
