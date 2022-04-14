<template>
    <MainMenu />

    <header class="bg-gray-100 dark:bg-gray-900 py-4 sm:py-8">
        <div
            class="
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
                xl:flex
                xl:items-center
                xl:justify-between
            "
        >
            <div class="flex-1 min-w-0">
                <Breadcrumbs :items="breadCrumbs" />

                <PageTitle title="Dashboard" />


                <div class="block">

                </div>

            </div>
        </div>
    </header>

    <main class="pt-1 pb-16">

    </main>

</template>

<script>
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainMenu from './MainMenu.vue';
import Breadcrumbs from './Breadcrumbs.vue';
import PageTitle from './PageTitle.vue';

import {
    ArrowSmDownIcon,
    ArrowSmUpIcon,
    PaperClipIcon,
} from '@heroicons/vue/solid';

export default {
    components: {
        MainMenu,
        PageTitle,
        Breadcrumbs,
        ArrowSmDownIcon,
        ArrowSmUpIcon,
        PaperClipIcon,
    },
    async setup() {
        const route = useRoute();
        const router = useRouter();
        const logged = route.meta.logged;
        const apiUrl = route.meta.apiUrl;
        const pwd = localStorage.getItem("pwd") || '';

        const breadCrumbs = [];

        const log = function(a) {
            console.log(a);
        };


        return {
            logged,
            breadCrumbs,
        };
    },
};
</script>

<style></style>