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

                <PageTitle title="Settings" />

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
                            System settings
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
                            <div
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
                                Notifications
                            </div>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">

                                <fieldset>
                                    <legend
                                        class="
                                            text-sm
                                            text-gray-900
                                            dark:text-gray-400">
                                        Select the notifications you are interested in
                                    </legend>
                                    <div class="mt-4 space-y-4">

                                        <div class="flex items-start">
                                            <div class="h-5 flex items-center">
                                                <input
                                                    id="notify_user_change"
                                                    name="notify_user_change"
                                                    type="checkbox"
                                                    class="focus:ring-sky-500
                                                        h-4
                                                        w-4
                                                        text-sky-600
                                                        border-gray-300
                                                        dark:border-gray-500
                                                        dark:bg-gray-700
                                                        checked:bg-sky-600
                                                        dark:checked:bg-sky-600
                                                        rounded"
                                                    v-model="userSettings.server.notify_user_change"
                                                />
                                            </div>
                                            <div class="ml-3 text-sm">
                                                <label
                                                    for="notify_user_change"
                                                    class="font-medium text-gray-700 dark:text-gray-400 select-none">
                                                    Users
                                                </label>
                                            </div>
                                        </div>

                                        <div class="flex items-start">
                                            <div class="h-5 flex items-center">
                                                <input
                                                    id="notify_domain_change"
                                                    name="notify_domain_change"
                                                    type="checkbox"
                                                    class="focus:ring-sky-500
                                                        h-4
                                                        w-4
                                                        text-sky-600
                                                        border-gray-300
                                                        dark:border-gray-500
                                                        dark:bg-gray-700
                                                        checked:bg-sky-600
                                                        dark:checked:bg-sky-600
                                                        rounded"
                                                    v-model="userSettings.server.notify_domain_change"
                                                />
                                            </div>
                                            <div class="ml-3 text-sm">
                                                <label
                                                    for="notify_domain_change"
                                                    class="font-medium text-gray-700 dark:text-gray-400 select-none">
                                                    Domains
                                                </label>
                                            </div>
                                        </div>


                                        <div class="flex items-start">
                                            <div class="h-5 flex items-center">
                                                <input
                                                    id="notify_page_change"
                                                    name="notify_page_change"
                                                    type="checkbox"
                                                    class="focus:ring-sky-500
                                                        h-4
                                                        w-4
                                                        text-sky-600
                                                        border-gray-300
                                                        dark:border-gray-500
                                                        dark:bg-gray-700
                                                        checked:bg-sky-600
                                                        dark:checked:bg-sky-600
                                                        rounded"
                                                    v-model="userSettings.server.notify_page_change"
                                                />
                                            </div>
                                            <div class="ml-3 text-sm">
                                                <label
                                                    for="notify_page_change"
                                                    class="font-medium text-gray-700 dark:text-gray-400 select-none">
                                                    Pages
                                                </label>
                                            </div>
                                        </div>


                                        <div class="flex items-start">
                                            <div class="h-5 flex items-center">
                                                <input
                                                    id="notify_post_change"
                                                    name="notify_post_change"
                                                    type="checkbox"
                                                    class="focus:ring-sky-500
                                                        h-4
                                                        w-4
                                                        text-sky-600
                                                        border-gray-300
                                                        dark:border-gray-500
                                                        dark:bg-gray-700
                                                        checked:bg-sky-600
                                                        dark:checked:bg-sky-600
                                                        rounded"
                                                    v-model="userSettings.server.notify_post_change"
                                                />
                                            </div>
                                            <div class="ml-3 text-sm">
                                                <label
                                                    for="notify_post_change"
                                                    class="font-medium text-gray-700 dark:text-gray-400 select-none">
                                                    Posts
                                                </label>
                                            </div>
                                        </div>


                                       <div class="flex items-start">
                                            <div class="h-5 flex items-center">
                                                <input
                                                    id="notify_errors"
                                                    name="notify_errors"
                                                    type="checkbox"
                                                    class="focus:ring-sky-500
                                                        h-4
                                                        w-4
                                                        text-sky-600
                                                        border-gray-300
                                                        dark:border-gray-500
                                                        dark:bg-gray-700
                                                        checked:bg-sky-600
                                                        dark:checked:bg-sky-600
                                                        rounded"
                                                    v-model="userSettings.server.notify_errors"
                                                />
                                            </div>
                                            <div class="ml-3 text-sm">
                                                <label
                                                    for="notify_errors"
                                                    class="font-medium text-gray-700 dark:text-gray-400 select-none">
                                                    Errors
                                                </label>
                                            </div>
                                        </div>

                                    </div>
                                </fieldset>


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
                            Visual (browser only)
                        </h3>
                        <p class="mt-2 max-w-2xl text-sm text-gray-500">These settings affects theme only in this browser.</p>
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
                                Dark theme
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">

                                <SwitchGroup as="div" class="flex items-center justify-between">
                                    <Switch v-model="userSettings.client.darkTheme" :class="[userSettings.client.darkTheme ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-600', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-green-400']">
                                        <span aria-hidden="true" :class="[userSettings.client.darkTheme ? 'translate-x-5 bg-emerald-200 dark:bg-emerald-200' : 'translate-x-0 bg-gray-100 dark:bg-gray-400', 'pointer-events-none inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200']" />
                                    </Switch>

                                    <span class="flex-grow flex flex-col ml-4" v-if="userSettings.client.darkTheme">
                                        <SwitchLabel as="span" class="text-sm font-medium text-emerald-700 select-none" passive>Enabled</SwitchLabel>
                                        <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Dark theme is active.</SwitchDescription>
                                    </span>

                                    <span class="flex-grow flex flex-col ml-4" v-if="!userSettings.client.darkTheme">
                                        <SwitchLabel as="span" class="text-sm font-medium text-red-500 select-none" passive>Disabled</SwitchLabel>
                                        <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Dark theme is not active.</SwitchDescription>
                                    </span>
                                </SwitchGroup>

                            </div>
                        </div>

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
                                for="codeEditorTheme"
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
                                Code editor theme
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
                                        id="codeEditorTheme"
                                        name="codeEditorTheme"
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
                                            capitalize
                                        "
                                        v-model="userSettings.client.codeEditorTheme"
                                    >
                                        <option v-for="theme in codeEditorThemes" :key="theme.name" :value="theme.value">{{ theme.name }}</option>
                                    </select>
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
                            @click="useSettings.save(saving, userSettings)"
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
import PageTitle from './PageTitle.vue';
import codeEditorThemes from '../composables/use-code-editor-themes';
import useSettings from '../composables/use-settings';

import {
    Switch,
    SwitchGroup,
    SwitchDescription,
    SwitchLabel,
} from '@headlessui/vue';
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@heroicons/vue/solid';
import {
    RefreshIcon,
} from '@heroicons/vue/outline';

export default {
    components: {
        MainMenu,
        PageTitle,
        Breadcrumbs,
        Switch,
        SwitchGroup,
        SwitchDescription,
        SwitchLabel,
        CheckIcon,
        ChevronDownIcon,
        ChevronRightIcon,
        RefreshIcon,
    },
    async setup() {

        const route = useRoute();
        const router = useRouter();

        const apiUrl = route.meta.apiUrl;
        let user = route.meta.user.profile;

        let saving = ref({
            status: false,
            result: {
                required: {
                }
            },
        });

        let userSettings = await useSettings().load(user.id);

        const breadCrumbs = [];

        return {
            userSettings: ref(userSettings),
            saving,
            router,
            useSettings: useSettings(),
            codeEditorThemes,
            breadCrumbs,
        };
    },
};
</script>

<style></style>
