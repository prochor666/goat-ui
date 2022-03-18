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

                <PageTitle title="Profile" />

                <div
                    class="
                        mt-1
                        flex flex-col
                        sm:flex-row sm:flex-wrap
                        sm:mt-3
                        sm:space-x-8
                    "
                >
                    <div class="mt-2 flex items-center text-sm text-gray-500">
                        <LocationMarkerIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        {{ ip }}
                    </div>
                    <div class="mt-2 flex items-center text-sm text-gray-500">
                        <BriefcaseIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        {{ user.firstname }} {{ user.role }}
                    </div>
                    <div class="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        <time
                            :datetime="user.created_at">{{ $dayjs(user.created_at).format('D. M. YYYY HH:mm') }}</time>
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
                            General information about the system user.
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
                                for="username"
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
                                Username
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
                                        name="username"
                                        id="username"
                                        autocomplete="off"
                                        :class="[saving.result.required.username === false ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500', 'flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900']"
                                        v-model="user.username"
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
                                for="email"
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
                                Email address
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autocomplete="off"
                                    :class="[saving.result.required.email === false ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500', 'flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900']"
                                    v-model="user.email"
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
                                for="password"
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
                                Password
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autocomplete="off"
                                    :class="[saving.result.required.password === false ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500', 'flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900']"
                                    v-model="user.password"
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
                                for="confirm_password"
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
                                Confirm password
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="confirm_password"
                                    name="confirm_password"
                                    type="password"
                                    autocomplete="off"
                                    :class="[saving.result.required.password === false ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500', 'flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900']"
                                    v-model="user.confirm_password"
                                />
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
                            Personal Information
                        </h3>
                    </div>
                    <div class="space-y-6 sm:space-y-5">
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
                                for="first_name"
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
                                First name
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    autocomplete="off"
                                    class="
                                        max-w-lg
                                        block
                                        w-full
                                        shadow-sm
                                        focus:ring-sky-500
                                        focus:border-sky-500
                                        text-sm
                                        border-gray-300
                                        rounded-md
                                        dark:text-gray-400
                                        dark:bg-gray-900
                                        dark:border-gray-700
                                    "
                                    v-model="user.firstname"
                                />
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
                                for="last_name"
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
                                Last name
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    autocomplete="off"
                                    class="
                                        max-w-lg
                                        block
                                        w-full
                                        shadow-sm
                                        focus:ring-sky-500
                                        focus:border-sky-500
                                        text-sm
                                        border-gray-300
                                        rounded-md
                                        dark:text-gray-400
                                        dark:bg-gray-900
                                        dark:border-gray-700
                                    "
                                    v-model="user.lastname"
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
                            @click="useProfile.save(saving, user, router)"
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
import useProfile from '../composables/use-profile';

import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
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

const roles = [
    {
        name: 'Admin',
        role: 'admin',
    },
    {
        name: 'User',
        role: 'user',
    },
];

export default {
    components: {
        MainMenu,
        PageTitle,
        Breadcrumbs,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        BriefcaseIcon,
        CalendarIcon,
        CheckCircleIcon,
        CheckIcon,
        ChevronRightIcon,
        LocationMarkerIcon,
        RefreshIcon,
    },
    async setup() {

        const route = useRoute();
        const router = useRouter();

        const apiUrl = route.meta.apiUrl;

        let saving = ref({
            status: false,
            result: {
                required: {
                    username: true,
                    email: true,
                    password: true,
                }
            },
        });

        let user = route.meta.user.profile;
        let ip = route.meta.user.ip;

        user.password = '';
        user.confirm_password = '';

        const breadCrumbs = [];

        return {
            roles,
            user: user,
            ip: ip,
            router,
            saving,
            useProfile: useProfile(),
            breadCrumbs,
        };
    },
};
</script>

<style></style>
