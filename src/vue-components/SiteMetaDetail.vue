<template>
    <MainMenu />

    <!-- Page heading -->
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

                <PageTitle :title="pageTitle" />

                <div
                    class="
                        mt-1
                        flex-col
                        sm:flex sm:flex-1 sm:flex-row
                        sm:mt-3
                        sm:space-x-8
                    "
                >
                    <div class="mt-4 sm:mt-2 flex items-center text-sm text-gray-500" v-if="meta.id > 0">
                        <BriefcaseIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />

                        {{ meta.name }}
                    </div>
                    <div class="mt-4 sm:mt-2 flex items-center text-sm text-gray-500" v-if="meta.id > 0">
                        <CalendarIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        <time
                            :datetime="meta.created_at">{{ $dayjs(meta.created_at).format('D. M. YYYY HH:mm') }}</time>
                    </div>
                    <div class="mt-4 sm:mt-2 items-center text-sm text-gray-500 flex-1 grow sm:justify-items-end">

                        <SwitchGroup as="div" class="flex items-center sm:justify-end">
                            <Switch v-model="meta.public" :class="[meta.public ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-600', 'relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-green-400']">
                                <span aria-hidden="true" :class="[meta.public ? 'translate-x-5 bg-emerald-200 dark:bg-emerald-200' : 'translate-x-0 bg-gray-100 dark:bg-gray-400', 'pointer-events-none inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200']" />
                            </Switch>

                            <span class="w-32 flex flex-col ml-4" v-if="meta.public">
                                <SwitchLabel as="span" class="text-sm font-medium text-emerald-700 select-none" passive>Enabled</SwitchLabel>
                                <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Meta is active.</SwitchDescription>
                            </span>

                            <span class="w-32 flex flex-col ml-4" v-if="!meta.public">
                                <SwitchLabel as="span" class="text-sm font-medium text-red-500 select-none" passive>Disabled</SwitchLabel>
                                <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Meta is not active.</SwitchDescription>
                            </span>
                        </SwitchGroup>
                    </div>
                </div>

            </div>
        </div>
    </header>

    <main class="pt-8 pb-16">

        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 px-3">

            <form class="space-y-8 divide-y divide-gray-200 dark:divide-gray-900">

                <div class="space-y-8 sm:space-y-5">
                    <div>
                        <h3
                            class="
                                text-lg
                                leading-6
                                font-medium
                                text-gray-900
                                dark:text-gray-400
                            "
                        >
                            General
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                            General information about the meta item.
                        </p>
                    </div>

                    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">

                        <div
                            class="
                                sm:grid sm:grid-cols-3
                                sm:gap-4
                                sm:items-start
                                sm:border-t sm:border-gray-200  sm:dark:border-gray-900
                                sm:pt-5
                            "
                        >
                            <label
                                for="name"
                                class="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    dark:text-gray-400
                                    sm:mt-px
                                    sm:pt-2
                                "
                            >
                                Tag
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autocomplete="off"
                                    placeholder="Enter meta name"
                                    class="
                                        block
                                        max-w-lg
                                        w-full
                                        shadow-sm
                                        focus:ring-sky-500
                                        focus:border-sky-500
                                        sm:text-sm
                                        border-gray-300
                                        rounded-md
                                        dark:text-gray-400
                                        dark:bg-gray-900
                                        dark:border-gray-700
                                    "
                                    v-model="meta.tag"
                                    @input="lowerCase($event)"
                                />
                            </div>
                        </div>


                        <div
                            class="
                                sm:grid sm:grid-cols-3
                                sm:gap-4
                                sm:items-start
                                sm:border-t sm:border-gray-200  sm:dark:border-gray-900
                                sm:pt-5
                            "
                        >
                            <label
                                for="meta_type"
                                class="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    dark:text-gray-400
                                    sm:mt-px
                                    sm:pt-2
                                "
                            >
                                Meta type
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <div
                                    class="
                                        max-w-lg
                                        flex
                                        rounded-md
                                        shadow-sm
                                    "
                                >
                                    <select
                                        id="meta_type"
                                        name="meta_type"
                                        class="
                                            block
                                            focus:ring-sky-500
                                            focus:border-sky-500
                                            w-full
                                            shadow-sm
                                            sm:max-w-xs
                                            sm:text-sm
                                            border-gray-300
                                            rounded-md
                                            dark:text-gray-400
                                            dark:bg-gray-900
                                            dark:border-gray-700
                                        "
                                        v-model="meta.type"
                                    >
                                        <option v-for="type in metaTypes" :key="type" :value="type">{{ type }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>



                    </div>

                </div>

                <div class="space-y-8 sm:space-y-5">
                    <div>
                        <h3
                            class="
                                text-lg
                                leading-6
                                font-medium
                                text-gray-900
                                dark:text-gray-400
                                pt-4
                            "
                        >
                            Settings
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                            Meta tag type-specific settings.
                        </p>
                    </div>

                    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5 bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-400 rounded-md py-2 px-4">

                        <SiteMetaTypes :meta="meta" />

                    </div>

                </div>


                <div class="py-6 block sm:hidden" style="border: none"></div>

                <div class="w-full bg-white dark:bg-black py-3 pr-5 sm:pt-5 fixed bottom-0 left-0 sm:static z-30">
                    <div class="flex justify-end">
                        <button
                            type="button"
                            class="
                                bg-white
                                py-2
                                px-4
                                border border-gray-300
                                rounded-md
                                shadow-sm
                                text-sm
                                font-medium
                                text-gray-700
                                hover:bg-gray-50
                                dark:text-gray-400
                                dark:bg-gray-800
                                dark:border-gray-600
                                dark:hover:bg-gray-600
                                focus:outline-none
                                focus:ring-2
                                focus:ring-sky-500
                            "
                            @click="router.go(-1)"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            :class="[saving.status === true ? 'bg-gray-400 hover:bg-gray-400 text-gray-200 cursor-not-allowed': 'bg-sky-600 hover:bg-sky-700 text-white', 'ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500']"
                            :disabled="saving.status === true"
                            @click="useMeta.save(saving, meta, router)"
                        >
                            <CheckIcon v-if="!saving.status"
                                class="mr-2 h-5 w-5 text-white"
                                aria-hidden="true" />
                            <RefreshIcon v-if="saving.status"
                                class="animate-spin mr-2 h-5 w-5 text-white"
                                aria-hidden="true"
                            />
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import MainMenu from './MainMenu.vue';
import PageTitle from './PageTitle.vue';
import Breadcrumbs from './Breadcrumbs.vue';
import SiteMetaTypes from './SiteMetaTypes.vue';
import useMeta from '../composables/use-meta';
import useSites from '../composables/use-sites';

import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Switch,
    SwitchGroup,
    SwitchDescription,
    SwitchLabel,
} from '@headlessui/vue';
import {
    BriefcaseIcon,
    CalendarIcon,
    CheckCircleIcon,
    CheckIcon,
    ChevronRightIcon,
    LocationMarkerIcon,
} from '@heroicons/vue/solid';
import {
    RefreshIcon,
} from '@heroicons/vue/outline';


export default {
    components: {
        MainMenu,
        PageTitle,
        Breadcrumbs,
        SiteMetaTypes,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        Switch,
        SwitchGroup,
        SwitchDescription,
        SwitchLabel,
        BriefcaseIcon,
        CalendarIcon,
        CheckCircleIcon,
        CheckIcon,
        ChevronRightIcon,
        LocationMarkerIcon,
        RefreshIcon,
    },

    methods: {
        lowerCase(e) {
            e.target.value = e.target.value.toLowerCase();
        },
    },

    async setup() {

        const route = useRoute();
        const router = useRouter();

        const apiUrl = route.meta.apiUrl;

        let saving = ref({
            status: false,
            result: {},
        });

        const domains_id = parseInt(route.params.id || 0);
        const id = parseInt(route.params.navid || 0);
        const pageTitle = id === 0 ? 'New meta' : 'Edit meta';

        const site = await useSites().load(domains_id);

        if (site.id === 0) {

            router.push('sites');
        }

        const meta = await useMeta().load(id, site.id, site.langs);

        const metaTypes = [
            'checkbox',
            'text',
            'blob',
            'file',
            'files',
            'color',
            'radio',
            'select',
            'bool',
        ].sort();


        const breadCrumbs = [{
            name: 'Sites',
            route: {
                name: 'sites',
            }
        },{
            name: site.name,
            route: {
                name: 'pages',
                params: {
                    id: site.id
                }
            }
        },{
            name: 'Meta',
            route: {
                name: 'meta',
                params: {
                    id: site.id
                }
            }
        }];

        return {
            site,
            meta: ref(meta),
            metaTypes,
            domains_id,
            router,
            saving,
            pageTitle,
            useMeta: useMeta(),
            breadCrumbs,
        };
    },
};
</script>

<style></style>
