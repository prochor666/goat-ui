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
                        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-700 sm:mx-0">
                            <component :is="getIcon(switchView(file.mime))" class="h-5 w-5 text-emerald-600 dark:text-emerald-200" aria-hidden="true" />
                        </div>

                        <div class="ml-4 text-left w-full h-8 items-center flex">
                            <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400">
                                File #{{ file.id }}
                            </DialogTitle>
                        </div>
                    </div>
                    <div class="block w-full">

                        <div class="text-sky-900 dark:text-sky-400 pt-4 px-1 text-sm">
                            <span class="inline-block py-1 px-2 text-center whitespace-nowrap align-baseline font-bold bg-sky-600 text-white rounded mr-2">{{ file.mime }}</span>
                            <a :href="`${apiUrl}/${file.http}`" target="_blank">Download: {{ file.rel }}</a>
                        </div>

                        <div class="text-sky-900 dark:text-sky-400">

                            <div class="flex my-4 border p-0 border-gray-300 dark:border-gray-700 rounded-md shadow-sm group hover:ring-2 hover:ring-offset-gray-50 hover:ring-sky-500 dark:hover:ring-sky-700">

                                <div class="flex-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autocomplete="off"
                                        placeholder="Enter/dir/path"
                                        class="
                                            w-full
                                            flex-1
                                            sm:text-sm
                                            dark:text-gray-400
                                            dark:bg-gray-900
                                            border-0
                                            focus:outline-none
                                            focus:ring-0
                                            focus:ring-offset-gray-50
                                            focus:ring-sky-500
                                            rounded-l-md
                                        "
                                        @input="lowerCase($event)"
                                        v-model="file.rel"
                                        @keyup.enter="renameFile()"
                                    />
                                </div>

                                <div class="flex-none">
                                    <button
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
                                        :class="file.rel.length === 0 ? 'cursor-not-allowed text-gray-300 dark:text-gray-700 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800': 'bg-sky-600 hover:bg-sky-700 text-white'"
                                        :disabled="file.rel.length === 0"
                                        @click="renameFile()"
                                    >
                                        <PencilAltIcon
                                            class="-ml-1 mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Rename
                                    </button>
                                </div>
                                <div class="flex-none">
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
                                        :class="file.rel.length === 0 ? 'cursor-not-allowed text-gray-300 dark:text-gray-700 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800': 'bg-red-600 hover:bg-red-700 text-white'"
                                        :disabled="file.rel.length === 0"
                                        @click="deleteFile()"
                                    >
                                        <TrashIcon
                                            class="-ml-1 mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Delete
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div class="block w-full grid grid-cols-1 sm-grid-cols-2 gap-2" v-if="switchView(file.mime) == 'bin'">
                        <div class="text-gray-900 dark:text-gray-400">

                        </div>
                    </div>
                    <div class="block w-full grid grid-cols-1 sm-grid-cols-2 gap-2" v-if="switchView(file.mime) == 'image'">
                        <div class="text-gray-900 dark:text-gray-400">

                            <img class="w-full"
                                :src="`${apiUrl}/${file.variants.md}`"
                                v-if="file.variants.md !== false">

                            <img class="w-full"
                                :src="`${apiUrl}/${file.variants.lg}`"
                                v-if="file.variants.md === false && file.variants.lg !== false">

                            <img class="w-full"
                                :src="`${apiUrl}/${file.http}`"
                                v-if="file.variants.md === false && file.variants.lg === false">
                        </div>
                    </div>
                    <div class="block w-full grid grid-cols-1 sm-grid-cols-2 gap-2" v-if="switchView(file.mime) == 'video'">
                        <div class="text-gray-900 dark:text-gray-400">
                            <video class="w-full" :src="`${apiUrl}/${file.http}`" preload controls="controls" muted="muted"></video>
                        </div>
                    </div>
                    <div class="block w-full grid grid-cols-1 sm-grid-cols-2 gap-2" v-if="switchView(file.mime) == 'audio'">
                        <div class="text-gray-900 dark:text-gray-400">
                            <audio class="w-full dark:bg-gray-800" :src="`${apiUrl}/${file.http}`" preload controls="controls" volume=".25"></audio>
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
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { notify } from 'notiwind';

import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue';
import {
    DocumentTextIcon,
    MusicNoteIcon,
    PencilAltIcon,
    PhotographIcon,
    ShieldExclamationIcon,
    TrashIcon,
    VideoCameraIcon,
    XIcon,
} from '@heroicons/vue/outline';

export default{

    props: {
        active: {
            type: Boolean,
            default: false
        },
        file: {
            type: Object,
            default: {
                basename: '',
                rel: '',
                http: '',
                id: 0,
                domains_id: 0,
                mime: '',
            }
        }
    },

    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        DocumentTextIcon,
        MusicNoteIcon,
        PencilAltIcon,
        PhotographIcon,
        ShieldExclamationIcon,
        TrashIcon,
        VideoCameraIcon,
        XIcon,
    },

    emits: {

        'reload-needed' () {

            return true;
        }
    },

    methods: {

        reset(path) {

            this.$emit('reload-needed', path);
        }
    },

    setup(props, { emit }) {

        const route = useRoute();
        const router = useRouter();
        const active = ref(props.active);
        const file = ref(props.file);
        const apiUrl = route.meta.apiUrl;

        const deleteFile = async function() {

            const r = await axios.delete(`${apiUrl}/api/files/${file.value.id}`, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });
            let data = await r.data.data;

            console.log('Delete', r);

            active.value = false;

            emit('reload-needed');

            if (typeof data === 'object' && Object.keys(data).length > 0 && data.status && data.deleted && parseInt(data.deleted) > 0) {

                notify({
                    group: "success",
                    title: "Done",
                    text: `File ${file.value.basename} deleted`,
                }, 5000);
            } else {

                notify({
                    group: "error",
                    title: "Error",
                    text: `File ${file.value.basename} was not deleted`,
                }, 10000);
            }
        };


        const renameFile = async function() {

            const r = await axios.put(`${apiUrl}/api/files/${file.value.id.value}/?path=${file.value.rel}`, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'application/json'
                }
            });
            let data = await r.data.data;

            if (typeof data === 'object' && Object.keys(data).length > 0 && data.status) {

                return data;
            }

            return false;
        };


        const getIcon = function(viewType) {

            switch (viewType) {

                case 'text':

                        return DocumentTextIcon;
                    break;

                case 'image':

                        return PhotographIcon;
                    break;

                case 'video':

                        return VideoCameraIcon;
                    break;

                case 'audio':

                        return MusicNoteIcon;
                    break;
                default:

                    return ShieldExclamationIcon;
            }
        };


        const switchView = function(mimeStr) {

            switch (mimeStr) {

                case 'text/plain': case 'text/html': case 'text/css': case 'text/csv': case 'text/javascript ': case 'text/calendar': case 'text/xml':
                        return 'text';
                    break;

                case 'image/jpeg': case 'image/jpg': case 'image/png': case 'image/apng': case 'image/gif': case 'image/bmp': case 'image/webp': case 'image/avif': case 'image/x-icon':
                        return 'image';
                    break;

                case 'video/mp4': case 'video/3gpp': case 'video/ogg':
                        return 'video';
                    break;

                case 'audio/mp4': case 'audio/mpeg': case 'audio/aac': case 'audio/aacp': case 'audio/ogg': case 'audio/webm': case 'audio/flac':
                        return 'audio';
                    break;
                default:

                    return 'bin';
            }
        }

        return {
            file,
            active,
            switchView,
            apiUrl,
            deleteFile,
            renameFile,
            getIcon,
       }
    }
}
</script>