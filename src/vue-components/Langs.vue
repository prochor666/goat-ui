<template>

    <TransitionRoot as="template" :show="active">
        <Dialog as="div" static class="fixed z-40 inset-0 overflow-y-auto" @close="active = false">
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
                        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-700 sm:mx-0">
                            <TranslateIcon class="h-5 w-5 text-emerald-600 dark:text-emerald-200" aria-hidden="true" />
                        </div>

                        <div class="ml-4 text-left w-full h-8 items-center flex">
                            <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400">
                                Select languages from the list
                            </DialogTitle>
                        </div>
                    </div>
                    <div class="block w-full px-2 py-4 select-none">

                        <div class="flex items-start py-1" v-for="lang, index in allLangs" :key="lang.alpha2">
                            <div class="flex items-center">
                                <input
                                    :id="lang.alpha2"
                                    name="notify_user_change"
                                    type="checkbox"
                                    class="focus:ring-sky-500
                                        h-4
                                        w-4
                                        text-sky-600
                                        dark:text-sky-800
                                        border-gray-300
                                        dark:border-gray-500
                                        dark:bg-gray-700
                                        checked:bg-sky-600
                                        dark:checked:bg-sky-600
                                        rounded"
                                    v-model="lang.selected"
                                    @change="update($event, allLangs)"
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label
                                    :for="lang.alpha2"
                                    class="font-medium text-gray-700 dark:text-gray-400 select-none">
                                    {{ lang.alpha2 }} ({{ lang.name }})
                                </label>
                            </div>
                        </div>

                    </div>

                </div>
            </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>

</template>

<script>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from 'vue-router';
import utils from '../composables/utils';

import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue';
import {
    TranslateIcon,
    XIcon,
} from '@heroicons/vue/outline';

export default{

    props: {
        langs: {
            type: Object,
            default: [],
        },
        active: {
            type: Boolean,
            default: false,
        },
    },

    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        TranslateIcon,
        XIcon,
    },

    emits: {

        'reload-needed'(allLangs) {

            //console.log(e);

            return allLangs;
        }
    },

    methods: {

        update(e, allLangs) {

            this.$emit('reload-needed', allLangs);
        }
    },

    async setup(props, { emit }) {

        const route = useRoute();
        const active = ref(props.active);
        const langs = reactive(props.langs);
        const _all = await utils().loadHelper('langs');
        const allLangs = _all.langs;
        const apiUrl = route.meta.apiUrl;

        const isSelected = function(_langs, _lang) {

            for (let i in _langs) {

                if (_lang.alpha2 === _langs[i].alpha2) {

                    return true;
                }
            }

            return false;
        };

        for (let i in allLangs) {

            if (isSelected(langs, allLangs[i])) {

                allLangs[i].selected = true;
            }
        }


        return {
            langs,
            allLangs,
            active,
            apiUrl,
       }
    }
}
</script>