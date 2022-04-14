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
                flex
                xl:items-center
                xl:justify-between
            "
        >
            <div class="flex-1 min-w-0">
                <Breadcrumbs :items="breadCrumbs" />

                <PageTitle title="Pages" />

            </div>
            <div class="mt-5 flex xl:mt-0 xl:ml-4">
                <span class="block">
                    <button
                        type="button"
                        class="
                            inline-flex
                            items-center
                            px-4
                            py-2
                            rounded-md
                            shadow-sm
                            text-sm
                            font-medium
                            text-gray-700
                            dark:text-gray-400
                            bg-white
                            dark:bg-gray-800
                            border
                            border-gray-300
                            dark:border-gray-600
                            hover:bg-gray-50
                            dark:hover:bg-gray-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-offset-gray-50
                            focus:ring-sky-500
                            disabled:bg-gray-300
                            dark:disabled:bg-gray-800
                            disabled:text-gray-500
                            dark:disabled:text-gray-600
                            disabled:cursor-not-allowed
                        "
                        :disabled="navs.length === 0"
                        @click="router.push(`/sites/${site.id}/pages/0`)"
                    >
                        <PlusCircleIcon
                            class="-ml-1 mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        Create
                    </button>
                </span>
            </div>
        </div>
    </header>



    <main class="pt-8 pb-16">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 flex relative">

            <SiteMenu />

             <div class="flex flex-col w-0 flex-1">
                <div class="flex-1 relative min-h-full focus:outline-none py-1 pb-4 pl-6 sm:pl-2 ml-8 sm:ml-2">

                    <div v-for="nav in structNavs" :key="nav.id" :class="[drag === true ? 'border-dashed border border-sky-700': 'border-none', 'p-2 pb-4 mb-4']">
                        <h3 class="pb-4 select-none text-md font-medium text-gray-500 dark:text-gray-500">
                            <MenuAlt1Icon
                                class="text-gray-500 dark:text-gray-500 w-5 h-5 inline mr-2"
                            />
                            {{ nav.name }}
                        </h3>

                        <draggable
                            v-model="nav.pages"
                            item-key="orderID"
                            class="divide-y divide-gray-200 dark:divide-gray-900 list-group dragArea"
                            ghost-class="ghost"
                            animation="200"
                            group="pages"
                            tag="div"
                            handle=".handle"
                            @start="drag = true"
                            @end="drag = false; usePages.patchSiteOrder(usePages.saving, structNavs)"
                            :component-data="{
                                tag: 'div',
                                name: !drag ? 'flip-list' : null,
                                type: 'transition-group'
                            }"
                        >
                            <template #item="{ element }">

                                <div class="list-group-item">

                                    <router-link
                                        :to="{
                                            name: 'page-detail',
                                            params: {
                                                pageid: element.id
                                            }
                                        }"
                                        class="group block hover:bg-gray-50 dark:hover:bg-gray-900"
                                    >
                                        <div
                                            class="flex items-center pb-5 pr-4 py-2 sm:px-0"
                                        >
                                            <div class="min-w-0 flex-1 flex items-center">
                                                <div class="flex-shrink-0 handle cursor-move p-4">
                                                    <SwitchVerticalIcon
                                                        class="dark:text-gray-800 dark:group-hover:text-gray-500 text-gray-300 group-hover:text-gray-500 w-5 h-5"
                                                    />
                                                </div>
                                                <div
                                                    class="
                                                        min-w-0
                                                        flex-1
                                                        px-2
                                                        md:grid md:grid-cols-2
                                                        md:gap-4
                                                    "
                                                >
                                                    <div>
                                                        <p
                                                            class="
                                                                text-sm
                                                                font-medium
                                                                text-sky-600
                                                                dark:text-sky-500
                                                                truncate
                                                            "
                                                        >
                                                            {{ element.name }}
                                                        </p>
                                                        <p
                                                            class="
                                                                mt-2
                                                                flex
                                                                items-center
                                                                text-sm text-gray-500
                                                                dark:text-gray-400
                                                            "
                                                        >
                                                            <span class="truncate text-sm mr-2">{{ element.title }}</span>
                                                        </p>
                                                    </div>
                                                    <div class="hidden md:block">
                                                        <div>
                                                            <p class="text-sm text-gray-900 dark:text-gray-500">
                                                                Created at
                                                                <time :datetime="element.created_at">{{ $dayjs(element.created_at).format('D. M. YYYY HH:mm') }}</time>
                                                            </p>
                                                            <p
                                                                class="
                                                                    mt-2
                                                                    flex
                                                                    items-center
                                                                    text-sm text-gray-500
                                                                "
                                                            >
                                                                <XCircleIcon
                                                                    class="
                                                                        flex-shrink-0
                                                                        mr-1.5
                                                                        h-5
                                                                        w-5
                                                                        text-red-500
                                                                        dark:text-red-600
                                                                    "
                                                                    aria-hidden="true"
                                                                    v-if="element.public == 0"
                                                                />
                                                                <CheckCircleIcon
                                                                    class="
                                                                        flex-shrink-0
                                                                        mr-1.5
                                                                        h-5
                                                                        w-5
                                                                        text-emerald-400
                                                                    "
                                                                    aria-hidden="true"
                                                                    v-if="element.public == 1"
                                                                />
                                                                {{ element.public == 1 ? 'Published': 'Draft' }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <ChevronRightIcon
                                                    class="
                                                        h-5
                                                        w-5
                                                        text-gray-400
                                                    "
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </div>
                                    </router-link>
                                </div>

                            </template>

                        </draggable>
                    </div>

                </div>
            </div>

        </div>
    </main>


    <div class="pt-4 top-0 left-0 fixed h-screen w-screen z-1000 bg-opacity-90 dark:bg-opacity-80 bg-black flex items-center justify-center" v-if="usePages.saving.status === true">
        <Loader :text="'Saving...'" />
    </div>


</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import usePaginator from '../composables/use-paginator';
import useSites from '../composables/use-sites';
import usePages from '../composables/use-pages';
import draggable from "vuedraggable";
import MainMenu from './MainMenu.vue';
import SiteMenu from './SiteMenu.vue';
import PageTitle from './PageTitle.vue';
import Breadcrumbs from './Breadcrumbs.vue';
import Loader from './Loader.vue';

import {
    CheckCircleIcon,
    ChevronRightIcon,
    LocationMarkerIcon,
} from '@heroicons/vue/solid';
import {
    FolderIcon,
    MenuAlt1Icon,
    PlusCircleIcon,
    SwitchVerticalIcon,
    XCircleIcon,
    ServerIcon,
} from '@heroicons/vue/outline';

export default {

    components: {
        MainMenu,
        SiteMenu,
        PageTitle,
        Breadcrumbs,
        Loader,
        draggable,
        FolderIcon,
        CheckCircleIcon,
        ChevronRightIcon,
        LocationMarkerIcon,
        MenuAlt1Icon,
        SwitchVerticalIcon,
        XCircleIcon,
        ServerIcon,
        PlusCircleIcon,
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

        const domains_id = parseInt(route.params.id || 0);
        //const navs_id = parseInt(route.params.id || 0);

        const site = await useSites().load(domains_id);

        if (site.id === 0) {

            document.location = '/sites';
        }


        const assignPagesToNavs = function(pages, navs)
        {
            let newNavs = [];

            for (let nav in navs) {

                navs[nav].pages = pages.filter((page) => {
                    page.orderID = page.id;
                    return page.navs_id == navs[nav].id;
                });

                newNavs.push(navs[nav]);
            }

            return newNavs;
        };


        const navsLoad = async function()
        {
            const r = await axios.get(`${apiUrl}/api/navs/?_wfilter=domains_id|${domains_id}&_worder[]=order|ASC&_worder[]=name|ASC`, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });
            let data = await r.data.data;
            return data;
        };
        let navs = await navsLoad();



        const pagesLoad = async function()
        {
            const r = await axios.get(`${apiUrl}/api/pages/?_wfilter[]=domains_id|${domains_id}&_worder[]=order|ASC&_worder[]=id|DESC`, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });
            let data = await r.data.data;
            return data;
        };
        const pages = await pagesLoad();

        const structNavs = assignPagesToNavs(pages, navs);
        console.log(structNavs);

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
        }];

        return {
            site,
            navs,
            structNavs: ref(structNavs),
            router,
            drag: ref(false),
            usePages: usePages(),
            breadCrumbs,
        };
    },
};
</script>

<style scoped>
.flip-list-move {
    transition: transform 0.2s;
}

.ghost {
    opacity: .5;
    display: block;
}
</style>
