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
                        flex flex-col
                        sm:flex-row sm:flex-wrap
                        sm:mt-3
                        sm:space-x-8
                    "
                >
                    <div class="mt-2 flex items-center text-sm text-gray-500">
                        <BriefcaseIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        {{ user.username }} {{ user.role }}
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
                                    :class="[saving.result.required.password === false || user.password !== user.confirm_password ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500', 'flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900']"
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
                                    :class="[saving.result.required.password === false || user.password !== user.confirm_password ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500', 'flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900']"
                                    v-model="user.confirm_password"
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
                                Role
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">

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
                                    v-model="user.role"
                                >
                                    <option v-for="role, index in roles.roles" :key="index" :value="index">{{ role.name }}</option>
                                </select>
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
                                for="active"
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
                                Active
                            </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">

                                <SwitchGroup as="div" class="flex items-center justify-between">
                                    <Switch v-model="user.active" :class="[user.active ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-600', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-green-400']">
                                        <span aria-hidden="true" :class="[user.active ? 'translate-x-5 bg-emerald-200 dark:bg-emerald-200' : 'translate-x-0 bg-gray-100 dark:bg-gray-400', 'pointer-events-none inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200']" />
                                    </Switch>

                                    <span class="flex-grow flex flex-col ml-4" v-if="user.active">
                                        <SwitchLabel as="span" class="text-sm font-medium text-emerald-700 select-none" passive>Active</SwitchLabel>
                                        <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Login is enabled.</SwitchDescription>
                                    </span>

                                    <span class="flex-grow flex flex-col ml-4" v-if="!user.active">
                                        <SwitchLabel as="span" class="text-sm font-medium text-red-500 select-none" passive>Not active</SwitchLabel>
                                        <SwitchDescription as="span" class="text-sm text-gray-500 select-none">Login is disabled.</SwitchDescription>
                                    </span>
                                </SwitchGroup>

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
                            :class="[saving.status === true || user.password != user.confirm_password ? 'bg-gray-400 hover:bg-gray-400 text-gray-200 cursor-not-allowed': 'bg-sky-600 hover:bg-sky-700 text-white', 'ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500']"
                            :disabled="saving.status === true || user.password != user.confirm_password"
                            @click="useUsers.save(saving, user, router)"
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
import useUsers from '../composables/use-users';

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
    async setup() {

        const route = useRoute();
        const router = useRouter();

        const id = parseInt(route.params.userid || 0);
        const pageTitle = id === 0 ? 'New user' : 'Edit user';

        const activeUser = route.meta.user.profile;

        const saving = ref({
            status: false,
            result: {
                required: {
                    username: true,
                    email: true,
                    password: true,
                    role: true,
                }
            },
        });

        const user = reactive(await useUsers().load(id));
        const roles = await useUsers().roles();

        user.password = '';
        user.confirm_password = '';

        if (user.id == 0) {

            for (let role in roles.roles) {
                user.role = role;
                break;
            }
        }

        const breadCrumbs = [{
            name: 'Users',
            route: {
                name: 'users',
            }
        },];

        console.log('User', user, 'Roles', roles.roles);

        if (activeUser.id === user.id) {

            router.push('/profile');
        }

        return {
            roles,
            user: user,
            router,
            saving,
            useUsers: useUsers(),
            pageTitle,
            breadCrumbs,
        };
    },
};
</script>

<style></style>
