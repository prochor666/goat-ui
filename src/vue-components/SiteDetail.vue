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

                <PageTitle :title="customPageTitle" />

                <div
                    class="
                        mt-1
                        flex flex-col
                        sm:flex-row sm:flex-wrap
                        sm:mt-3
                        sm:space-x-8
                    "
                    v-if="site.id > 0"
                >
                    <div class="mt-2 flex items-center text-sm text-gray-500">
                        <BriefcaseIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        {{ site.name }}
                    </div>
                    <div class="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        <time
                            :datetime="site.created_at">{{ $dayjs(site.created_at).format('D. M. YYYY HH:mm') }}</time>
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
                            General information about the site.
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
                                for="host"
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
                                Host
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

                                    <input
                                        type="text"
                                        name="host"
                                        id="host"
                                        autocomplete="off"
                                        placeholder="Enter valid domain hostname"
                                        :class="[saving.result.required.host === false ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500', 'flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900']"
                                        v-model="site.host"
                                        @input="lowerCase($event)"
                                    />
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
                                    placeholder="Enter site/project name"
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
                                    v-model="site.name"
                                />
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
                            for="aliases"
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
                            Alias domains
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
                                <textarea
                                    type="text"
                                    name="aliases"
                                    id="aliases"
                                    rows="10"
                                    placeholder="Enter valid domain hostnames, one per row"

                                    :class="[saving.result.required.aliases === false ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500', 'flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900']"

                                    v-model="site.aliases"
                                    @input="lowerCase($event)"
                                ></textarea>
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
                            for="aliases"
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
                            Languages
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <div
                                class="
                                    max-w-lg
                                    rounded-md
                                    shadow-sm
                                "
                            >

                                <div class="block py-1">

                                    <fieldset class="mt-1 text-gray-700 dark:text-gray-400" v-if="site.langs.length > 0">
                                        <legend class="flex py-1">Set default language bellow</legend>
                                            <div v-for="lang in site.langs" :key="lang.alpha2" class="relative flex items-start py-2">
                                                <label :for="`lang_default-${lang.alpha2}`" class="font-medium text-sm text-gray-700 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-300 flex-1 py-1 cursor-pointer">{{ lang.alpha2 }} ({{ lang.name }})</label>
                                                <div class="ml-3 flex items-center h-5">
                                                    <input :id="`lang_default-${lang.alpha2}`" :aria-describedby="`lang_default-${lang.alpha2}-description`" name="lang_default" type="radio" :checked="lang.alpha2 === site.lang_default"
                                                    @change="site.lang_default = lang.alpha2"
                                                    class="focus:ring-sky-800/50
                                                            dark:focus:ring-sky-600/50
                                                            focus:outline-none
                                                            h-4
                                                            w-4
                                                            text-sky-600
                                                            dark:text-sky-800
                                                            border-gray-300
                                                            dark:border-gray-700
                                                            dark:bg-gray-700
                                                            checked:bg-sky-600
                                                            dark:checked:bg-sky-800
                                                            " />
                                                </div>
                                            </div>

                                    </fieldset>

                                </div>


                                <button
                                    type="button"
                                    :class="[saving.result.required.langs === false ? 'border-red-300 dark:border-red-700 focus:ring-sky-500': 'border-gray-300 dark:border-gray-600 focus:ring-sky-500', 'py-2 px-4 rounded-md shadow-sm text-sm font-medium border text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 bg-white dark:bg-gray-800 focus:outline-none inline-flex justify-center focus:ring-2']"
                                    @click="reopenKey = utils.getRndKey(); langsActive = true"
                                >

                                    <TranslateIcon
                                        class="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    Select site languages
                                </button>

                                <Langs @reload-needed="updateLangs($event)" :active="langsActive" :langs="site.langs" :key="reopenKey" />

                            </div>
                        </div>
                    </div>

                </div>


                <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
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
                            Public information
                        </h3>
                    </div>
                    <div class="space-y-6 sm:space-y-5">
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
                                for="ip"
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
                                Site publish
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">

                                <SwitchGroup as="div" class="flex items-center justify-between">
                                    <Switch v-model="site.public" :class="[site.public ? 'bg-emerald-600 focus:ring-emerald-400' : 'bg-gray-200 dark:bg-gray-600 focus:ring-gray-600', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2']">
                                        <span aria-hidden="true" :class="[site.public ? 'translate-x-5 bg-emerald-200 dark:bg-emerald-200' : 'translate-x-0 bg-gray-100 dark:bg-gray-400', 'pointer-events-none inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200']" />
                                    </Switch>

                                    <span class="flex-grow flex flex-col ml-4" v-if="site.public">
                                        <SwitchLabel as="span" class="text-sm font-medium text-emerald-700 select-none" passive>Enabled</SwitchLabel>
                                        <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Site is active.</SwitchDescription>
                                    </span>

                                    <span class="flex-grow flex flex-col ml-4" v-if="!site.public">
                                        <SwitchLabel as="span" class="text-sm font-medium text-red-500 select-none" passive>Disabled</SwitchLabel>
                                        <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Site is not active.</SwitchDescription>
                                    </span>
                                </SwitchGroup>

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
                            @click="useSites.save(saving, site, router)"
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
import Breadcrumbs from './Breadcrumbs.vue';
import PageTitle from './PageTitle.vue';
import Langs from './Langs.vue';
import useSites from '../composables/use-sites';
import utils from '../composables/utils';

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
    TranslateIcon,
    RefreshIcon,
} from '@heroicons/vue/outline';


export default {
    components: {
        MainMenu,
        PageTitle,
        Breadcrumbs,
        Langs,
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
        TranslateIcon,
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
        },
        updateLangs(langs) {

            this.site.langs = [];

            const isSelected = function(_langs, _lang) {

                for (let i in _langs) {

                    if (_lang.alpha2 === _langs[i].alpha2) {

                        //console.log('Is selected', _lang.alpha2);
                        return true;
                    }
                }

                return false;
            };

            for (let i in langs) {

                let lang = langs[i];
                //console.log('Test', lang);

                if (lang.selected && lang.selected === true) {

                    if (!isSelected(this.site.langs, lang)) {

                        this.site.langs.push(lang);
                    }
                }
            }

            console.log(`Langs selected`, this.site.langs);
        },
    },

    async setup() {

        const route = useRoute();
        const router = useRouter();

        let saving = reactive({
            status: false,
            result: {
                required: {
                    langs: true,
                    host: true,
                    aliases: true,
                }
            },
        });

        const id = parseInt(route.params.id || 0);
        const customPageTitle = id === 0 ? 'New site' : 'Edit site';

        const site = await useSites().load(id);

        if (!site.langs) {

            site.langs = [];
        }

        if (!site.lang_default) {

            site.lang_default = 'en';
        }

        //console.log(site);

        const langsActive = ref(false);
        const reopenKey = ref(utils().getRndKey());

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
            site: ref(site),
            router,
            saving,
            customPageTitle,
            useSites: useSites(),
            breadCrumbs,
            langsActive,
            reopenKey,
            utils: utils(),
        };
    },
};
</script>

<style></style>
