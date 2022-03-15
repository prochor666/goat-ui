<template>
    <!-- Pagination -->
    <nav
        class="
            border-t border-gray-200
            dark:border-gray-800
            px-4
            flex
            items-start
            justify-between
            sm:px-0
        "
        aria-label="Pagination"
    >
        <div class="-mt-px w-0 flex-1 flex" :key="usePaginator.options.page">
            <router-link
                :to="{
                    name: usePaginator.options.to,
                    query: { page: usePaginator.options.page-1>0 ? usePaginator.options.page-1: 1 },
                }"
                class="
                    border-t-2 border-transparent
                    pt-4
                    pr-1
                    inline-flex
                    items-center
                    text-sm
                    font-medium
                    text-gray-500
                    hover:text-gray-700
                    hover:border-gray-200
                    dark:hover:border-gray-700
                "
                @click="usePaginator.pageize(usePaginator.options.page-1>0 ? usePaginator.options.page-1: 1)"
            >
                <ArrowNarrowLeftIcon
                    class="mr-3 h-5 w-5"
                    aria-hidden="true"
                />
                <span class="hidden sm:inline">Previous</span>
            </router-link>
        </div>
        <div class="-mt-px flex-1 flex">

           <div class="w-44 mx-auto pt-2">

                <Listbox as="template" v-model="usePaginator.options.page">
                <div class="relative">
                    <ListboxButton
                        class="relative w-full py-2 pl-3 pr-10 text-left bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-500 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-sky-500 sm:text-sm">
                            <span class="block truncate font-medium">Page {{ usePaginator.options.page }}</span>
                            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon class="w-5 h-5 text-gray-500" aria-hidden="true" />
                            </span>
                    </ListboxButton>
                    <ListboxOptions class="absolute bottom-0 w-full py-1 mt-1 overflow-auto text-base bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-500 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption
                        v-for="page in usePaginator.options.total"
                        :key="page"
                        :value="page"
                        :disabled="usePaginator.options.page === page"
                        as="template"
                        @click="router.push({
                            name: usePaginator.options.to,
                            query: { page: page },
                        }); usePaginator.pageize(page)"
                        >

                        <li
                            :class="[
                            usePaginator.options.page === page ? 'font-bold' : 'font-normal',
                            'cursor-default select-none relative py-2 pl-10 pr-4',
                            ]"
                        >
                            <span class="block truncate">{{ page }}</span>
                            <span
                                v-if="usePaginator.options.page === page"
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
                                >
                                <CheckIcon class="w-5 h-5" aria-hidden="true" />
                                </span>
                        </li>

                    </ListboxOption>
                    </ListboxOptions>
                </div>
                </Listbox>

            </div>
        </div>
        <div class="-mt-px w-0 flex-1 flex justify-end">
             <router-link
                :to="{
                    name: usePaginator.options.to,
                    query: { page: usePaginator.options.page+1<=usePaginator.options.total ? usePaginator.options.page+1: usePaginator.options.total },
                }"
                class="
                    border-t-2 border-transparent
                    pt-4
                    pl-1
                    inline-flex
                    items-center
                    text-sm
                    font-medium
                    text-gray-500
                    hover:text-gray-700
                    hover:border-gray-200
                    dark:hover:border-gray-700
                "
                @click="usePaginator.pageize(usePaginator.options.page+1<=usePaginator.options.total ? usePaginator.options.page+1: usePaginator.options.total)"
            >
                <span class="hidden sm:inline">Next</span>
                <ArrowNarrowRightIcon
                    class="ml-3 h-5 w-5"
                    aria-hidden="true"
                />
            </router-link>
        </div>
    </nav>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import usePaginator from '../composables/use-paginator';
import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue';

import {
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon,
    CheckIcon,
    SelectorIcon,
} from '@heroicons/vue/solid';

export default {
    components: {
        ArrowNarrowLeftIcon,
        ArrowNarrowRightIcon,
        Listbox,
        ListboxLabel,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        CheckIcon,
        SelectorIcon,
    },

    setup(props) {
        const route = useRoute();
        const router = useRouter();

        return {
            open,
            router,
            usePaginator: usePaginator(),
        };
    },
};

</script>