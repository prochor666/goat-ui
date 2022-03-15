<template>

    <nav class="flex" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2" role="list">
            <li>
                <div class="flex items-center">
                    <router-link
                        :to="{
                            name: 'dashboard'
                        }"
                        class="text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                    <HomeIcon
                        class="flex-shrink-0 h-4 w-4 text-gray-400"
                        aria-hidden="true"
                    />
                    </router-link>
                </div>
            </li>

            <li v-for="item in items" :key="item.name">
                <div class="flex items-center">
                    <ChevronRightIcon
                        class="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                    <router-link
                        :to="item.route"
                        class="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                        {{ item.name }}
                    </router-link>
                </div>
            </li>
        </ol>
    </nav>

</template>

<script>
import { useRouter } from 'vue-router';

import {
    HomeIcon,
    ChevronRightIcon,
} from '@heroicons/vue/solid';

export default {
    props: {
        items: {
            type: Object,
            default: [], // Accepts valid route objects
        },
    },

    components: {
        HomeIcon,
        ChevronRightIcon,
    },
    setup(props) {
        const router = useRouter();

        let items = props.items;

        return {
            items,
            router,
        };
    },
};
</script>
