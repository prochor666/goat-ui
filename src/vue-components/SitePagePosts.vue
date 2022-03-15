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

                <PageTitle title="Page posts" />

                <div
                    class="
                        mt-1
                        flex-col
                        sm:flex sm:flex-1 sm:flex-row
                        sm:mt-3
                        sm:space-x-8
                    "
                >
                    <div class="mt-4 sm:mt-2 flex items-center text-sm text-gray-500" v-if="page.id > 0">
                        <BriefcaseIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />

                        {{ page.name }}
                    </div>
                    <div class="mt-4 sm:mt-2 flex items-center text-sm text-gray-500" v-if="page.id > 0">
                        <CalendarIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        <time
                            :datetime="page.created_at">{{ $dayjs(page.created_at).format('D. M. YYYY HH:mm') }}</time>
                    </div>

                </div>

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
                        @click="router.push(`/sites/${site.id}/pages/${page.id}/posts/0`)"
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

    <main class="pt-2 pb-16">

        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 px-3">
            <SitePageTabs :tabs="pageTabs" />
        </div>

        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-8">
            <!-- Stacked list -->
            <ul
                class="
                    divide-y divide-gray-200 dark:divide-gray-900
                "
                role="list"
                :key="Pagination.options.page"
            >
                <li v-for="post in Pagination.options.result" :key="post.id">
                    <router-link
                        :to="{
                            name: 'posts',
                            params: { id: post.id }
                        }"
                        class="group block hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                        <div
                            class="flex items-center py-5 px-4 sm:py-6 sm:px-0"
                        >
                            <div class="min-w-0 flex-1 flex items-center">
                                <div class="flex-shrink-0">
                                    <GlobeAltIcon
                                        class="text-gray-500 w-10 h-10"
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
                                            {{ post.name }}
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
                                            <span class="truncate mr-2">{{ post.annotation }}</span>
                                        </p>
                                    </div>
                                    <div class="hidden md:block">
                                        <div>
                                            <p class="text-sm text-gray-900 dark:text-gray-500">
                                                Created at
                                                <time :datetime="post.created_at">{{ $dayjs(post.created_at).format('D. M. YYYY HH:mm') }}</time>
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
                                                    v-if="post.public == 0"
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
                                                    v-if="post.public == 1"
                                                />
                                                {{ post.public == 1 ? 'Published': 'Draft' }}
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
                </li>
            </ul>

            <div class="pt-4" v-if="Pagination.options.items.length > Pagination.options.perPage">
                <Paginator />
            </div>

        </div>
    </main>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import usePaginator from '../composables/use-paginator';
import usePages from '../composables/use-pages';
import useSites from '../composables/use-sites';
import MainMenu from './MainMenu.vue';
import Breadcrumbs from './Breadcrumbs.vue';
import SitePageTabs from './SitePageTabs.vue';
import PageTitle from './PageTitle.vue';
import Paginator from './Paginator.vue';


import {
    BriefcaseIcon,
    CalendarIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    LocationMarkerIcon,
} from '@heroicons/vue/solid';
import {
    GlobeAltIcon ,
    PlusCircleIcon,
    XCircleIcon,
    ServerIcon,
} from '@heroicons/vue/outline';

export default {
    components: {
        MainMenu,
        PageTitle,
        Breadcrumbs,
        SitePageTabs,
        Paginator,
        BriefcaseIcon,
        CalendarIcon,
        GlobeAltIcon ,
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
        const Pagination = usePaginator();

        const domains_id = parseInt(route.params.id || 0);
        const id = parseInt(route.params.pageid || 0);

        const pageTabs = [{
            name: 'Page edit',
            current: false,
            route: {
                name: 'page-detail',
                params: {
                    id: domains_id,
                    pageid: id,
                }
            },
            count: false,
        }, {
            name: 'Page posts',
            current: true,
            route: {
                name: 'posts',
                params: {
                    id: domains_id,
                    pageid: id,
                }
            },
            count: false,
        }];

        const site = await useSites().load(domains_id);

        if (site.id === 0) {

            document.location = '/sites';
        }

        const page = await usePages().load(id, site.id);

        Pagination.options.page = parseInt(route.query.page) || 1;
        Pagination.options.to = 'posts';

        const postsLoad = async function() {
            const r = await axios.get(`${apiUrl}/api/posts/?_wfilter[]=pages_id|${id}&_worder[]=publish_date|DESC`, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });
            let data = await r.data.data;
            return data;
        };
        let posts = await postsLoad();

        Pagination.options.total = Math.ceil(posts.length / Pagination.options.perPage);
        Pagination.options.items = posts;

        Pagination.pageize(Pagination.options.page);

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
            name: page.name,
            route: {
                name: 'page-detail',
                params: {
                    id: site.id,
                    pageid: page.id
                }
            }
        }];

        return {
            site,
            page,
            posts,
            router,
            Pagination,
            pageTabs,
            breadCrumbs,
        };
    },
};
</script>

<style></style>
