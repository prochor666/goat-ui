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
            <div class="mt-4 sm:mt-2 flex xl:ml-4">

                <div class="items-center text-sm text-gray-500 flex-1 grow sm:justify-items-end">

                    <SwitchGroup as="div" class="flex items-center sm:justify-end">
                        <Switch v-model="page.public" :class="[page.public ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-600', 'relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-green-400']">
                            <span aria-hidden="true" :class="[page.public ? 'translate-x-5 bg-emerald-200 dark:bg-emerald-200' : 'translate-x-0 bg-gray-100 dark:bg-gray-400', 'pointer-events-none inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200']" />
                        </Switch>

                        <span class="w-32 flex flex-col ml-4" v-if="page.public">
                            <SwitchLabel as="span" class="text-sm font-medium text-emerald-700 select-none" passive>Enabled</SwitchLabel>
                            <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Page is active.</SwitchDescription>
                        </span>

                        <span class="w-32 flex flex-col ml-4" v-if="!page.public">
                            <SwitchLabel as="span" class="text-sm font-medium text-red-500 select-none" passive>Disabled</SwitchLabel>
                            <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Page is not active.</SwitchDescription>
                        </span>
                    </SwitchGroup>
                </div>

            </div>
        </div>
    </header>


    <main class="pt-2 pb-16">

        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 px-3">
            <SitePageTabs :tabs="pageTabs" />
        </div>

        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 px-3 pt-8">

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
                        <p class="mt-2 max-w-2xl text-sm text-gray-500">
                            General information about the page.
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
                                    placeholder="Enter page name"
                                    :class="[saving.result.required.name === false ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500', 'flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900']"
                                    v-model="page.name"
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
                                for="title"
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
                                Title
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    autocomplete="off"
                                    placeholder="Enter page SEO title"
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
                                    v-model="page.title"
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
                                for="description"
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
                                SEO Description
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Enter page SEO description"
                                    rows="5"
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
                                    v-model="page.description"
                                    :max="maxDescriptionLength"
                                    @keydown="LimitChars($event)"
                                />
                                <p :class="[maxDescriptionLength - page.description.length === 0 ? 'text-red-500 dark:text-red-600': 'text-gray-500', 'text-sm mt-4']">
                                    {{ maxDescriptionLength - page.description.length }} of {{ maxDescriptionLength }} characters left
                                </p>
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
                                for="slug"
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
                                Slug
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="slug"
                                    name="slug"
                                    type="text"
                                    autocomplete="off"
                                    placeholder="Enter page slug"
                                    :class="[saving.result.required.slug === false ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500', 'flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900']"
                                    v-model="page.slug"
                                    @input="lowerCase($event)"
                                />
                            </div>
                        </div>

                    </div>

                </div>


                <div class="space-y-8 sm:space-y-8 pt-8">

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
                            Visibility
                        </h3>
                        <p class="mt-2 max-w-2xl text-sm text-gray-500">
                            Visibility and nav position of the page.
                        </p>
                    </div>

                    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">


                        <div
                            class="
                                sm:grid sm:grid-cols-3
                                sm:gap-4
                                sm:items-start
                                sm:border-t sm:border-gray-200 sm:dark:border-gray-900
                                sm:pt-5
                            "
                        >
                            <label
                                for="navs_id"
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
                                Nav position
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
                                        id="navs_id"
                                        name="navs_id"
                                        class="
                                            block
                                            focus:ring-sky-500
                                            focus:border-sky-500
                                            w-full
                                            shadow-sm
                                            sm:max-w-lg
                                            sm:text-sm
                                            border-gray-300
                                            rounded-md
                                            dark:text-gray-400
                                            dark:bg-gray-900
                                            dark:border-gray-700
                                        "
                                        v-model="page.navs_id"
                                    >
                                        <option v-for="nav in navs" :key="nav.id" :value="nav.id">{{ nav.name }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div
                            class="
                                sm:grid sm:grid-cols-3
                                sm:gap-4
                                sm:items-start
                                sm:border-t sm:border-gray-200 sm:dark:border-gray-900
                                sm:pt-5
                            "
                        >
                            <label
                                for="visible"
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
                                Page visibility
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">

                                <SwitchGroup as="div" class="flex items-center justify-between">
                                    <Switch v-model="page.visible" :class="[page.visible ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-600', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-green-400']">
                                        <span aria-hidden="true" :class="[page.visible ? 'translate-x-5 bg-emerald-200 dark:bg-emerald-200' : 'translate-x-0 bg-gray-100 dark:bg-gray-400', 'pointer-events-none inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200']" />
                                    </Switch>

                                    <span class="flex-grow flex flex-col ml-4" v-if="page.visible">
                                        <SwitchLabel as="span" class="text-sm font-medium text-emerald-700 select-none" passive>Visible</SwitchLabel>
                                        <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Page is visible in the menu.</SwitchDescription>
                                    </span>

                                    <span class="flex-grow flex flex-col ml-4" v-if="!page.visible">
                                        <SwitchLabel as="span" class="text-sm font-medium text-red-500 select-none" passive>Not visible</SwitchLabel>
                                        <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Page is not visible in the menu.</SwitchDescription>
                                    </span>
                                </SwitchGroup>

                            </div>
                        </div>




                    </div>

                </div>



                <div class="space-y-8 sm:space-y-8 pt-8">

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
                            Page posts
                        </h3>
                        <p class="mt-2 max-w-2xl text-sm text-gray-500">
                            Page posts behavior and ordering.
                        </p>
                    </div>

                    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">


                        <div
                            class="
                                sm:grid sm:grid-cols-3
                                sm:gap-4
                                sm:items-start
                                sm:border-t sm:border-gray-200 sm:dark:border-gray-900
                                sm:pt-5
                            "
                        >
                            <label
                                for="posts_order"
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
                                Posts order
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
                                        id="posts_order"
                                        name="posts_order"
                                        class="
                                            block
                                            focus:ring-sky-500
                                            focus:border-sky-500
                                            w-full
                                            shadow-sm
                                            sm:max-w-lg
                                            sm:text-sm
                                            border-gray-300
                                            rounded-md
                                            dark:text-gray-400
                                            dark:bg-gray-900
                                            dark:border-gray-700
                                        "
                                        v-model="page.posts_order"
                                    >
                                        <option v-for="order in usePages.postsOrder()" :key="order.order" :value="order.order">{{ order.name }}</option>
                                    </select>
                                </div>
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
                                for="posts_page_count"
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
                                Posts per page
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="posts_page_count"
                                    name="posts_page_count"
                                    type="number"
                                    autocomplete="off"
                                    placeholder="Posts per page count"
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
                                    v-model="page.posts_page_count"
                                />
                            </div>
                        </div>


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
                            @click="usePages.save(saving, page, router)"
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
import Breadcrumbs from './Breadcrumbs.vue';
import SitePageTabs from './SitePageTabs.vue';
import PageTitle from './PageTitle.vue';
import usePages from '../composables/use-pages';
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
        Breadcrumbs,
        SitePageTabs,
        PageTitle,
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
        LimitChars(e)
        {
            let value = e.target.value,
                max = parseInt(e.target.getAttribute('max'));

            if (value.length >= max) {

                e.target.value = e.target.value.substring(0, max-1);
            }
        }
    },

    async setup() {

        const route = useRoute();
        const router = useRouter();

        const apiUrl = route.meta.apiUrl;

        let saving = ref({
            status: false,
            result: {
                required: {
                    name: true,
                    slug: true,
                }
            },
        });

        const domains_id = parseInt(route.params.id || 0);
        const id = parseInt(route.params.pageid || 0);
        const lang = route.params.lang || '';
        const pageTitle = id === 0 ? 'New page' : 'Edit page';

        const maxDescriptionLength = 550;

        const pageTabs = [{
            name: 'Page edit',
            current: true,
            route: {
                name: 'page-detail',
                params: {
                    id: domains_id,
                    pageid: id,
                    lang:lang,
                }
            },
            count: false,
        }, {
            name: 'Page posts',
            current: false,
            route: {
                name: 'posts',
                params: {
                    id: domains_id,
                    pageid: id,
                    lang: lang,
                }
            },
            count: false,
        }];

        const site = await useSites().load(domains_id);

        if (site.id === 0) {

            document.location = '/sites';
        }

        const page = await usePages().load(id, site.id);

        const navsLoad = async function() {
            const r = await axios.get(`${apiUrl}/api/navs/?_wfilter=domains_id|${domains_id}&_worder[]=order|ASC&_worder[]=name|ASC`, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });
            let data = await r.data.data;
            return data;
        };
        const navs = await navsLoad();

        if (page.navs_id === 0) {

            page.navs_id = navs[0].id;
        }

        if (page.posts_order.length === 0) {

            page.posts_order = usePages().postsOrder()[0].order;
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
                    id: site.id,
                    lang: lang,
                }
            }
        }];

        return {
            site,
            page: ref(page),
            navs: navs,
            domains_id,
            router,
            saving,
            pageTitle,
            usePages: usePages(),
            maxDescriptionLength,
            pageTabs,
            breadCrumbs,
        };
    },
};
</script>

<style></style>
