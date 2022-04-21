<template>

    <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="fixed inset-0 flex z-40 md:hidden select-none" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <DialogOverlay class="fixed inset-0 bg-gray-900 bg-opacity-85" />
        </TransitionChild>
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
        <div class="relative flex-1 flex flex-col max-w-xs w-full">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="absolute top-0 right-0 -mr-12 pl-4 pt-7">
                <button type="button" class="flex items-center justify-center h-10 w-10 focus:outline-none focus:ring-2 rounded-md" @click="sidebarOpen = false">
                <span class="sr-only">Close sidebar</span>
                <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
            </div>
            </TransitionChild>
            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto bg-white dark:bg-gray-900">
                <nav class="mt-2 px-2 space-y-1">
                    <router-link v-for="item in navigation" :to="{ name: item.href }" :key="item.name" :class="[item.current ? 'text-sky-800 dark:text-sky-400 bg-gray-200 dark:bg-gray-800' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']">
                        <component :is="item.icon" :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-4 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                        {{ item.name }}
                    </router-link>
                </nav>
            </div>
        </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14">
        <!-- Force sidebar to shrink to fit close icon -->
        </div>
    </Dialog>
    </TransitionRoot>


    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:flex-shrink-0 select-none">
        <div class="flex flex-col w-64">
            <!-- Sidebar component -->
            <div class="flex-1 flex flex-col min-h-0 border-r border-gray-200 dark:border-gray-800 pr-2">
                <div class="flex-1 flex flex-col pb-4 overflow-y-auto">
                    <nav class="mt-52flex-1 px-2 space-y-1">
                        <router-link v-for="item in navigation" :to="{ name: item.href }" :key="item.href" :class="[item.current ? 'text-sky-800 dark:text-sky-400 bg-gray-200 dark:bg-gray-800' : 'text-gray-600 dark:text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-400', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
                            <component :is="item.icon" :class="[item.current ? 'text-sky-800 dark:text-sky-400' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                            {{ item.name }}
                        </router-link>
                    </nav>
                </div>

            </div>
        </div>
    </div>

    <div class="absolute z-10 -top-8 left-1 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 select-none">
        <button type="button" class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500" @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <MenuIcon class="h-6 w-6" aria-hidden="true" />
        </button>
    </div>

</template>


<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import {
    CubeIcon,
    DocumentTextIcon,
    FolderIcon,
    FolderOpenIcon,
    HomeIcon,
    CheckIcon,
    MenuAlt1Icon,
    TagIcon,
    UsersIcon,
    UserGroupIcon,
    MenuIcon,
    XIcon,
 } from "@heroicons/vue/outline";

import {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'

export default {
    components: {
        Dialog,
        DialogOverlay,
        TransitionChild,
        TransitionRoot,

        DocumentTextIcon,
        FolderIcon,
        FolderOpenIcon,
        HomeIcon,
        MenuAlt1Icon,
        TagIcon,
        UsersIcon,
        CubeIcon,

        MenuIcon,
        XIcon,
        CubeIcon,
        DocumentTextIcon,
        CheckIcon,
        UserGroupIcon,
    },

    props: {
        view: {
            type: String,
            default: 'dashboard'
        }
    },
    async setup(props) {
        const route = useRoute();
        const router = useRouter();
        const sidebarOpen = ref(false);

        const navigation = [
            {
                name: 'Pages',
                href: 'pages',
                current: route.name === 'pages' || route.name === 'page-detail',
                icon: DocumentTextIcon
            },
            {
                name: 'Navs',
                href: 'navs',
                current: route.name === 'navs' || route.name === 'nav-detail',
                icon: MenuAlt1Icon
            },
            {
                name: 'Edit site',
                href: 'site-detail',
                current: route.name === 'site-detail',
                icon: CubeIcon
            },
            {
                name: 'File manager',
                href: 'files',
                current: route.name === 'files',
                icon: FolderOpenIcon
            },
            {
                name: 'Meta',
                href: 'meta',
                current: route.name === 'meta' || route.name === 'meta-detail',
                icon: TagIcon
            },
        ];

        return {
            route,
            navigation,
            sidebarOpen,
        };
    },
};
</script>
