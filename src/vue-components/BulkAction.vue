<template>

    <TransitionRoot as="template" :show="active">
        <Dialog as="div" static class="fixed z-40 inset-0" @close="active = false" :open="active === true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 transition-opacity" />
            </TransitionChild>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full sm:p-6">
                    <div class="sm:block absolute top-0 right-0 pt-4 pr-4">
                        <button type="button" class="bg-white dark:bg-gray-700 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500" @click="active = false">
                        <span class="sr-only">Close</span>
                        <XIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div class="sm:flex sm:items-start w-full items-stretch">

                        <div class="ml-4 text-left w-full h-8 items-center flex">
                            <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400">
                                Bulk action
                            </DialogTitle>
                        </div>
                    </div>
                    <div class="block w-full">

                        <div class="text-sky-900 dark:text-sky-400 flex">

<!--                             <button
                                type="button"
                                class="
                                    inline-flex
                                    items-center
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    focus:outline-none
                                    focus:ring-0
                                    focus:ring-offset-gray-50
                                    focus:ring-sky-500
                                "
                                :class="useFiles.selection.dirs.length === 0 && useFiles.selection.files.length === 0 ? 'cursor-not-allowed text-gray-300 dark:text-gray-700 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800': 'bg-sky-600 hover:bg-sky-700 text-white'"
                                :disabled="useFiles.selection.dirs.length === 0 && useFiles.selection.files.length === 0"
                            >
                                <ChevronRightIcon
                                    class="-ml-1 mr-2 h-5 w-5"
                                    aria-hidden="true"
                                />
                                Rename
                            </button>
                            <button
                                type="button"
                                class="
                                    inline-flex
                                    items-center
                                    px-4
                                    py-2
                                    rounded-r-md
                                    text-sm
                                    font-medium
                                    focus:outline-none
                                    focus:ring-0
                                    focus:ring-offset-gray-50
                                    focus:ring-sky-500
                                "
                                :class="useFiles.selection.dirs.length === 0 && useFiles.selection.files.length === 0 ? 'cursor-not-allowed text-gray-300 dark:text-gray-700 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800': 'bg-amber-600 hover:bg-amber-700 text-white'"
                                :disabled="useFiles.selection.dirs.length === 0 && useFiles.selection.files.length === 0"
                            >
                                <ChevronDoubleRightIcon
                                    class="-ml-1 mr-2 h-5 w-5"
                                    aria-hidden="true"
                                />
                                Delete
                            </button> -->

                        </div>
                    </div>


                </div>
            </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>


</template>

<script>
import { ref, watch } from "vue";

//import useFiles from '../composables/use-files';

import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue';
import {
    ChevronRightIcon,
    ChevronDoubleRightIcon,
    XIcon,
} from '@heroicons/vue/outline';

export default {

    props: {
        active: {
            type: Boolean,
            default: true
        },
    },

    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        ChevronRightIcon,
        ChevronDoubleRightIcon,
        XIcon,
    },

    async setup(props) {

        let active = ref(props.active);

        console.log('Hey');

        watch(active, async (value) => {

           // console.log('Hey change', value);
        },{
            deep: true
        });

        return {
            active,
            //useFiles: useFiles(),
        }
    }
};
</script>