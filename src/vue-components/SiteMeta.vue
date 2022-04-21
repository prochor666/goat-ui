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

                <PageTitle title="Meta data" />

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
                        "
                        @click="router.push(`/sites/${domains_id}/meta/0`)"
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
                <div :class="[drag === true ? 'border-dashed border border-sky-700': 'border-none', 'flex-1 relative min-h-full focus:outline-none py-1 pb-4 pl-6 sm:pl-2 ml-8 sm:ml-2']">

                    <draggable
                        v-model="meta"
                        item-key="order"
                        class="divide-y divide-gray-200 dark:divide-gray-900 list-group dragArea"
                        ghost-class="ghost"
                        animation="200"
                        group="pages"
                        tag="div"
                        handle=".handle"
                        @start="drag = true"
                        @end="drag = false; useMeta.patchMetaOrder(useMeta.saving, domains_id, meta)"
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
                                        name: 'meta-detail',
                                        params: {
                                            id: element.domains_id,
                                            metaid: element.id
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
                                                        {{ useMeta.applicables()[element.target] }}/{{ element.tag }}
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
                                                        <span class="truncate text-sm mr-2">{{ element.type }}: {{ element.widget }}</span>
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
                                                            {{ element.public == 1 ? 'Can be used': 'Not used' }}
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
    </main>

    <div class="pt-4 top-0 left-0 fixed h-screen w-screen z-1000 bg-opacity-90 dark:bg-opacity-80 bg-black flex items-center justify-center" v-if="useMeta.saving.status === true">
        <Loader :text="'Saving...'" />
    </div>

</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import usePaginator from '../composables/use-paginator';
import useSites from '../composables/use-sites';
import useMeta from '../composables/use-meta';
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
    SwitchVerticalIcon ,
    PlusCircleIcon,
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
        SwitchVerticalIcon,
        CheckCircleIcon,
        ChevronRightIcon,
        LocationMarkerIcon,
        XCircleIcon,
        ServerIcon,
        PlusCircleIcon,
    },
    async setup() {
        const route = useRoute();
        const router = useRouter();
        const apiUrl = route.meta.apiUrl;
        const domains_id = parseInt(route.params.id || 0);
        const site = await useSites().load(domains_id);

        if (site.id === 0) {

            document.location = '/sites';
        }

        const assignMetaOrderID = function(meta)
        {
            return meta.filter((m) => {
                m.orderID = m.id;
                return true;
            });
        };


        const metaLoad = async function()
        {
            const r = await axios.get(`${apiUrl}/api/meta/?_wfilter=domains_id|${domains_id}&_worder[]=order|ASC&_worder[]=tag|ASC`, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });

            let cache = await r.data.data,
                data = [];

            if (r.data.data) {

                data = cache;
                //console.log('Loaded result', data);
            } else {

                //console.log('Failed to load result');
            }

            return data;
        };

        let meta = await metaLoad();
        meta = assignMetaOrderID(meta);

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
                    id: domains_id
                }
            }
        }];

        return {
            site,
            meta: ref(meta),
            domains_id,
            router,
            drag: ref(false),
            useMeta: useMeta(),
            breadCrumbs,
        };
    },
};
</script>

<style>
.flip-list-move {
    transition: transform 0.2s;
}

.ghost {
    opacity: .5;
    display: block;
}
</style>
