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
                    <div class="mt-4 sm:mt-2 flex items-center text-sm text-gray-500" v-if="nav.id > 0">
                        <BriefcaseIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />

                        {{ nav.name }}
                    </div>
                    <div class="mt-4 sm:mt-2 flex items-center text-sm text-gray-500" v-if="nav.id > 0">
                        <CalendarIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        <time
                            :datetime="nav.created_at">{{ $dayjs(nav.created_at).format('D. M. YYYY HH:mm') }}</time>
                    </div>
                    <div class="mt-4 sm:mt-2 items-center text-sm text-gray-500 flex-1 grow sm:justify-items-end">

                        <SwitchGroup as="div" class="flex items-center sm:justify-end">
                            <Switch v-model="nav.public" :class="[nav.public ? 'bg-emerald-600  focus:ring-emerald-400' : 'bg-gray-200 dark:bg-gray-600 focus:ring-gray-600', 'relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2']">
                                <span aria-hidden="true" :class="[nav.public ? 'translate-x-5 bg-emerald-200 dark:bg-emerald-200' : 'translate-x-0 bg-gray-100 dark:bg-gray-400', 'pointer-events-none inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200']" />
                            </Switch>

                            <span class="w-32 flex flex-col ml-4" v-if="nav.public">
                                <SwitchLabel as="span" class="text-sm font-medium text-emerald-700 select-none" passive>Enabled</SwitchLabel>
                                <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Nav is active.</SwitchDescription>
                            </span>

                            <span class="w-32 flex flex-col ml-4" v-if="!nav.public">
                                <SwitchLabel as="span" class="text-sm font-medium text-red-500 select-none" passive>Disabled</SwitchLabel>
                                <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Nav is not active.</SwitchDescription>
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
                            General information about the nav.
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
                                Name
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autocomplete="off"
                                    placeholder="Enter nav name"
                                    :class="[saving.result.required.name === false ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500', 'flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900']"
                                    v-model="nav.name"
                                />
                            </div>
                        </div>

                    </div>

                </div>

                <div class="space-y-8 sm:space-y-5">
                    <div class="pt-4">
                        <h3
                            class="
                                text-lg
                                leading-6
                                font-medium
                                text-gray-900
                                dark:text-gray-400
                            "
                        >
                            Meta
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                            Meta data list.
                        </p>
                    </div>

                </div>


                <div class="space-y-8 sm:space-y-5" v-for="m in nav.metatags" :key="m.id">

                    <div class="mt-3">

                        <MetaAttach
                            :meta="m"
                            :lang="nav.lang"
                            :valid="saving.meta[m.tag]"
                        />

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
                            @click="useNavs.save(saving, nav, router)"
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
import { ref, reactive } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import MainMenu from './MainMenu.vue';
import PageTitle from './PageTitle.vue';
import Breadcrumbs from './Breadcrumbs.vue';
import MetaAttach from './MetaAttach.vue';
import useNavs from '../composables/use-navs';
import useSites from '../composables/use-sites';
import useMeta from '../composables/use-meta';

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
        MetaAttach,
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

        let saving = reactive({
            status: false,
            result: {
                required: {
                    name: true,
                }
            },
            meta: {}
        });

        const domains_id = parseInt(route.params.id || 0);
        const id = parseInt(route.params.navid || 0);
        const lang = route.params.lang || '';
        const pageTitle = id === 0 ? 'New nav' : 'Edit nav';

        const site = await useSites().load(domains_id);

        if (site.id === 0) {

            router.push('sites');
        }

        const nav = await useNavs().load(id, site.id);
        //const meta = await useMeta().attach(id, site, 'navs');

        //nav.metavalues = {};
        //nav.metavalues = useMeta().assign(nav.metatags, nav.metavalues);

        console.log('Found nav', nav);

        if (!nav.lang) {

            nav.lang = lang;
        }



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
            name: 'Navs',
            route: {
                name: 'navs',
                params: {
                    id: site.id
                }
            }
        }];

        return {
            site,
            nav: ref(nav),
            domains_id,
            router,
            saving,
            pageTitle,
            useNavs: useNavs(),
            breadCrumbs,
        };
    },
};
</script>

<style></style>
