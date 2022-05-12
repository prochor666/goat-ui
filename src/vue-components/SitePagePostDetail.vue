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
                    <div class="mt-4 sm:mt-2 flex items-center text-sm text-gray-500" v-if="post.id > 0">
                        <BriefcaseIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />

                        {{ post.title }}
                    </div>
                    <div class="mt-4 sm:mt-2 flex items-center text-sm text-gray-500" v-if="post.id > 0">
                        <CalendarIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        <time
                            :datetime="post.created_at">{{ $dayjs(post.created_at).format('D. M. YYYY HH:mm') }}</time>
                    </div>
                    <div class="mt-4 sm:mt-2 items-center text-sm text-gray-500 flex-1 grow sm:justify-items-end">

                        <SwitchGroup as="div" class="flex items-center sm:justify-end">
                            <Switch v-model="post.public" :class="[post.public ? 'bg-emerald-600 focus:ring-emerald-400' : 'bg-gray-200 dark:bg-gray-600 focus:ring-gray-600', 'relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2']">
                                <span aria-hidden="true" :class="[post.public ? 'translate-x-5 bg-emerald-200 dark:bg-emerald-200' : 'translate-x-0 bg-gray-100 dark:bg-gray-400', 'pointer-events-none inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200']" />
                            </Switch>

                            <span class="w-32 flex flex-col ml-4" v-if="post.public">
                                <SwitchLabel as="span" class="text-sm font-medium text-emerald-700 select-none" passive>Enabled</SwitchLabel>
                                <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Post is active.</SwitchDescription>
                            </span>

                            <span class="w-32 flex flex-col ml-4" v-if="!post.public">
                                <SwitchLabel as="span" class="text-sm font-medium text-red-500 select-none" passive>Disabled</SwitchLabel>
                                <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Post is not active.</SwitchDescription>
                            </span>
                        </SwitchGroup>
                    </div>
                </div>

            </div>
        </div>
    </header>


    <main class="pt-2 pb-16">

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
                            General information about the post.
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
                                    placeholder="Enter post annotation"
                                    class="
                                        block
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
                                    v-model="post.title"
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
                                for="annotation"
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
                                Annotation
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <textarea
                                    id="annotation"
                                    name="annotation"
                                    placeholder="Enter post annotation"
                                    rows="5"
                                    class="
                                        block
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
                                    v-model="post.annotation"
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
                                for="content"
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
                                Content
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">

                                <!-- <ContentEditor v-model="post.content" /> -->

                                <Editor :htmlContent="post.content" class="
                                        block
                                        w-full
                                        shadow-sm
                                        text-gray-800
                                        border-gray-300
                                        dark:text-gray-200
                                        dark:bg-gray-900
                                        dark:border-gray-700
                                    "
                                    @updated="post.content = $event"
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
                            Media
                        </h3>
                        <p class="mt-2 max-w-2xl text-sm text-gray-500">
                            Media files...
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
                                for="image"
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
                                Image
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
                                    <label class="block">
                                        <span class="sr-only">Choose annotation image</span>
                                        <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        @change="onFileChanged($event)"
                                        accept="image/*"
                                        capture
                                        class="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-gray-300 dark:file:border-gray-700
                                        sm:file:text-sm file:font-semibold
                                        file:bg-white file:text-sky-700 hover:file:bg-gray-50
                                        dark:file:bg-sky-600 dark:hover:file:bg-sky-700 dark:file:text-white
                                        "
                                        />
                                    </label>
                                </div>
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
                            @click="usePosts.save(saving, post, router)"
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
import Editor from './Editor.vue';
import PageTitle from './PageTitle.vue';

import usePages from '../composables/use-pages';
import useSites from '../composables/use-sites';
import usePosts from '../composables/use-posts';

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
        Editor,
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

        limitChars(e)
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
            result: {},
        });

        const domains_id = parseInt(route.params.id || 0);
        const pages_id = parseInt(route.params.pageid || 0);
        const id = parseInt(route.params.postid || 0);
        const pageTitle = id === 0 ? 'New post' : 'Edit post';

        const maxDescriptionLength = 550;

        const site = await useSites().load(domains_id);

        if (site.id === 0) {

            router.push('sites');
        }

       const page = await usePages().load(pages_id);

        if (page.id === 0) {

            router.push('sites');
        }

        const post = await usePosts().load(id, pages_id);

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
        },{
            name: 'Page posts',
            route: {
                name: 'posts',
                params: {
                    id: site.id,
                    pageid: page.id
                }
            }
        }];

        console.log(post);

        return {
            domains_id,
            pages_id,
            site,
            post: ref(post),
            router,
            saving,
            pageTitle,
            usePosts: usePosts(),
            maxDescriptionLength,
            breadCrumbs,
        };
    },
};
</script>

<style></style>
