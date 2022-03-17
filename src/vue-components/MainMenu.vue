<template>
    <!-- Navbar desktop -->
    <Disclosure as="nav" class="select-none bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" v-slot="{ open }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <router-link :to="{name: 'dashboard'}"
                    class="
                        flex items-center
                        justify-center
                        w-10
                        h-10
                        flex-shrink-0
                        rounded-full
                        border-2 border-gray-400 dark:border-gray-600
                    "
                    >
                        <LogoSvg class="h-6 w-6 fill-gray-500 dark:fill-gray-500" />
                    </router-link>


                    <div class="hidden sm:-my-px sm:ml-6 lg:flex sm:space-x-8">
                        <router-link custom v-for="item in navigation.left" :to="{ name: item.href }" :key="item.name" v-slot="{ href, route, navigate, isActive, isExactActive }">
                            <a :href="href" @click="navigate" :class="[currentRouteMatch(item, activeRoute) ? 'border-sky-500 text-sky-800 dark:text-sky-400': 'text-gray-500', 'border-transparent hover:border-gray-300 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400 dark:hover:border-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium']">{{ item.name }}</a>
                        </router-link>
                    </div>
                </div>

                <div v-if="user.logged" class="flex-1 px-2 flex items-center justify-center lg:ml-6 lg:justify-end">
                    <div class="max-w-lg w-full lg:max-w-xs">
                        <label for="search" class="sr-only">Search</label>
                        <div class="relative text-gray-600 dark:text-gray-400 focus-within:text-gray-400 dark:focus-within:text-gray-600">
                            <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                <SearchIcon class="h-5 w-5" aria-hidden="true" />
                            </div>
                            <input id="search" class="block w-full bg-gray-100 dark:bg-gray-700 py-2 pl-10 pr-3 border border-gray-300 dark:border-gray-500 rounded-md leading-5 text-gray-900 dark:text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm" placeholder="Search" type="search" name="search" v-on:keyup.enter="routeSearch()" v-model="searchQuery" />
                        </div>
                    </div>
                </div>

                <div class="hidden lg:ml-6 lg:flex sm:items-center">
                    <button v-if="navigation.notify == true" @click="router.push('/notifications')" class="bg-gray-200 dark:bg-gray-800 p-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        <span class="sr-only">View notifications</span>
                        <BellIcon class="h-6 w-6" aria-hidden="true" />
                    </button>

                    <!-- Profile dropdown -->
                    <Menu as="div" class="ml-3 relative">
                        <MenuButton class="bg-white dark:bg-gray-800 p-1 rounded-full border border-sky-600 dark:border-sky-400 text-sky-600 dark:text-sky-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400">
                            <span class="sr-only">Open user menu</span>
                            <UserIcon class="h-6 w-6 rounded-full" aria-hidden="true" />
                        </MenuButton>
                        <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                            <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                <MenuItem v-for="item in navigation.right" :key="item.name" v-slot="{ active }">
                                    <router-link :to="{ name: item.href }" :class="[active ? 'bg-sky-200 dark:bg-sky-800 border-sky-500 dark:border-sky-600 text-sky-700 border-l' : '', 'border-l border-transparent block px-4 py-2 text-sm text-gray-700 dark:text-gray-200']">
                                    {{ item.name }}
                                    </router-link>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
                <div class="-mr-2 flex items-center lg:hidden">
                    <!-- Mobile menu button -->
                    <DisclosureButton class="bg-white dark:bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-800 dark:focus:bg-gray-900">
                        <span class="sr-only">Open main menu</span>
                        <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                        <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
            </div>
        </div>

        <!-- Navbar mobile -->
        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
        <DisclosurePanel class="lg:hidden select-none">
            <div class="pt-2 pb-3 space-y-1">
                <router-link custom v-for="item in navigation.left" :to="{ name: item.href }" :key="item.name" v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <a :href="href" @click="navigate" :class="[currentRouteMatch(item, activeRoute) ? 'bg-sky-200 dark:bg-sky-800 border-sky-500 dark:border-sky-600 text-sky-700 dark:text-sky-200 border-l': '', 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 dark:hover:text-gray-400 dark:hover:bg-gray-800 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium']">{{ item.name }}</a>
                </router-link>
            </div>
            <div class="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800">
                <div class="flex items-center px-4">
                    <div class="flex-shrink-0">
                        <UserIcon class="h-6 w-6 rounded-full text-sky-600 dark:text-sky-400" aria-hidden="true" />
                    </div>
                    <div class="ml-3">
                        <div class="text-base font-medium text-gray-800 dark:text-gray-400">{{ user.profile.username }}</div>
                        <div class="text-sm font-medium text-gray-500">{{ user.profile.role }}</div>
                    </div>
                    <button v-if="navigation.notify == true" @click="router.push('/notifications')" class="ml-auto bg-white dark:bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 dark:text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        <span class="sr-only">View notifications</span>
                        <BellIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-3 space-y-1">
                    <router-link v-for="item in navigation.right" :key="item.name" :to="{ name: item.href }" :class="['block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-800']" active-class="bg-sky-200 dark:bg-sky-800 border-sky-500 dark:border-sky-600 text-sky-700 dark:text-sky-200 border-l">
                    {{ item.name }}
                    </router-link>
                </div>
            </div>
        </DisclosurePanel>
        </transition>
    </Disclosure>

    <NotificationGroup group="error">
    <div
        class="fixed top-0 right-0 max-w-sm h-0 flex items-start justify-end p-2 z-0 select-none z-2000"
    >
        <div class="w-full max-w-sm">
        <Notification
            v-slot="{ notifications, close }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
        >
            <div
                class="relative flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md border bg-red-500 border-red-400"
                v-for="notification in notifications"
                :key="notification.id"
            >
                <div class="flex items-center justify-center w-12">
                    <ExclamationCircleIcon class="mx-1 h-7 w-7 text-white" />
                </div>

                <div class="px-4 py-2 -mx-3">
                    <div class="mx-3">
                        <span class="font-semibold text-white">{{ notification.title }}</span>
                        <p class="text-sm text-white">{{ notification.text }}</p>
                    </div>
                </div>

                <button @click="close(notification.id)" class="absolute top-1 right-0 px-1 pt-1 cursor-pointer z-2000">
                    <XIcon class="mx-1 h-5 w-5 text-white" />
                </button>
            </div>
        </Notification>
        </div>
    </div>
    </NotificationGroup>

    <NotificationGroup group="success">
    <div
        class="fixed top-0 right-0 max-w-sm h-0 flex items-start justify-end p-2 select-none z-2000"
    >
        <div class="w-full max-w-sm">
        <Notification
            v-slot="{ notifications, close }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
        >
            <div
                class="relative flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md border border-emerald-400  bg-emerald-500"
                v-for="notification in notifications"
                :key="notification.id"
            >
                <div class="flex items-center justify-center w-12">
                    <InformationCircleIcon class="mx-1 h-7 w-7 text-white" />
                </div>

                <div class="px-4 py-2 -mx-3">
                    <div class="mx-3">
                        <span class="font-semibold text-white">{{ notification.title }}</span>
                        <p class="text-sm text-white">{{ notification.text }}</p>
                    </div>
                </div>

                <button @click="close(notification.id)" class="absolute top-1 right-0 px-1 pt-1 cursor-pointer z-2000">
                    <XIcon class="mx-1 h-5 w-5 text-white" />
                </button>
            </div>
        </Notification>
        </div>
    </div>
    </NotificationGroup>


    <NotificationGroup group="info">
    <div
        class="fixed top-0 right-0 max-w-sm h-0 flex items-start justify-end p-2 select-none z-2000"
    >
        <div class="w-full max-w-sm">
        <Notification
            v-slot="{ notifications, close }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
        >
            <div
                class="relative flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md border border-blue-400  bg-blue-500"
                v-for="notification in notifications"
                :key="notification.id"
            >
                <div class="flex items-center justify-center w-12">
                    <InformationCircleIcon class="mx-1 h-7 w-7 text-white" />
                </div>

                <div class="px-4 py-2 -mx-3">
                    <div class="mx-3">
                        <span class="font-semibold text-white">{{ notification.title }}</span>
                        <p class="text-sm text-white">{{ notification.text }}</p>
                    </div>
                </div>

                <button @click="close(notification.id)" class="absolute top-1 right-0 px-1 pt-1 cursor-pointer z-2000">
                    <XIcon class="mx-1 h-5 w-5 text-white" />
                </button>
            </div>
        </Notification>
        </div>
    </div>
    </NotificationGroup>


</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import user from '../composables/user';
import mainMenu from '../composables/main-menu';
import LogoSvg from './LogoSvg.vue';
import { notify } from 'notiwind';

import {
    BellIcon,
    MenuIcon,
    XIcon,
    InformationCircleIcon,
    ExclamationCircleIcon,
} from '@heroicons/vue/outline';

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/vue';

import {
    UserIcon,
    SearchIcon,
} from '@heroicons/vue/solid';

export default {
    components: {
        LogoSvg,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        BellIcon,
        MenuIcon,
        SearchIcon,
        UserIcon,
        XIcon,
        InformationCircleIcon,
        ExclamationCircleIcon,
    },

    async setup() {
        const navigator = mainMenu();
        const open = ref(false);
        const search = ref('');
        const route = useRoute();
        const router = useRouter();
        const user = route.meta.user;
        let searchQuery = ref('');

        let navigation = navigator.navs.notLoggedIn;

        console.log('I am', user.profile.role);

        if (user.logged === true) {

            if (user.profile.role in navigator.navs) {

                navigation = navigator.navs[user.profile.role];
            }
        }

        const routeSearch = function() {
            if (searchQuery.value.length > 1) {
                document.location.href = `/search/${searchQuery.value}`
            } else {
                notify({
                    group: "error",
                    title: "Error",
                    text: "Search query minimum length is 2 characters",
                }, 5000);
            }
        };

        return {
            navigation,
            open,
            search,
            router,
            activeRoute: route,
            user,
            currentRouteMatch: navigator.currentRouteMatch,
            routeSearch,
            searchQuery,
        };
    },
};
</script>