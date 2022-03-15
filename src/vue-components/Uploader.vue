<template>

   <label class="block">
        <span class="sr-only">Choose files</span>
        <input type="file"
            class="block w-full text-sm text-slate-500
            border-gray-300 dark:border-gray-600
            file:mr-4 file:py-2 file:px-4
            file:text-sm font-medium
            file:rounded-md
            file:border-0
            file:bg-sky-200 dark:file:bg-sky-700
            file:hover:bg-sky-300 dark:file:hover:bg-sky-800
            file:text-gray-700 dark:file:text-gray-300"
            v-on:change="handleFileInputChange()"
            accept="*"
            ref="fileList"
            multiple />

            <!-- <span class="font-bold text-gray-400">{{ domainPath }}</span> -->
    </label>


    <TransitionRoot as="template" :show="uploading.active">
        <Dialog as="div" static class="fixed z-40 inset-0" @close="uploading.active = false; reset()" :open="uploading.active === true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 transition-opacity" />
            </TransitionChild>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full sm:p-6">
                    <div class="sm:block absolute top-0 right-0 pt-4 pr-4">
                        <button type="button" class="bg-white dark:bg-gray-700 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500" @click="uploading.active = false; reset()">
                        <span class="sr-only">Close</span>
                        <XIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div class="sm:flex sm:items-start w-full">
                        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-700 sm:mx-0 sm:h-10 sm:w-10" v-if="uploading.fileCount > 0">
                            <CheckIcon class="h-6 w-6 text-emerald-600 dark:text-emerald-200" aria-hidden="true" />
                        </div>
                        <div class="mt-3 sm:mt-0 sm:ml-4 my-2 text-left w-full p-2">
                            <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400">
                                Uploading file<span v-if="uploading.fileCount > 1">s ({{ uploading.progress }}/{{ uploading.fileCount }})</span>
                            </DialogTitle>
                        </div>
                    </div>
                    <div class="block w-full h-48 max-h-60 overflow-y-auto">

                        <div class="mt-3 sm:mt-0 sm:ml-4 text-left p-2" v-if="uploading.fileCount > 0 && uploading.progress < uploading.fileCount">
                            <div class="my-4" v-for="file in uploading.result" :key="file.name">
                                <div v-if="file.progress > 0 && file.progress < 100">
                                    <div class="text-gray-900 dark:text-gray-400 text-sm flex">
                                        <span class="flex-1">{{ file.name }}</span>
                                        <span class="text-xs inline-block py-1 px-2 leading-none text-center whitespace-nowrap align-baseline font-medium bg-emerald-800 text-white rounded-md flex-none w-24">{{ file.sizeHuman }}</span>
                                    </div>
                                    <div class="mt-2 w-full rounded-md h-4 bg-gray-400 dark:bg-gray-600">
                                        <div class="bg-sky-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-md" v-if="file.progress > 0" :style="`width: ${file.progress}%`">
                                            {{ file.progress }}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-3 sm:mt-0 sm:ml-4 text-left p-2" v-if="uploading.fileCount > 0 && uploading.progress == uploading.fileCount">
                            <div class="my-4" v-for="file in uploading.result" :key="file.name">
                                <div v-if="file.progress == 100">
                                    <div class="text-gray-900 dark:text-gray-400 text-sm flex">
                                        <span class="flex-1">{{ file.name }}</span>
                                        <span class="text-xs inline-block py-1 px-2 leading-none text-center whitespace-nowrap align-baseline font-medium bg-emerald-500 text-white rounded-md flex-none w-24">{{ file.sizeHuman }}</span>
                                    </div>
                                    <div class="mt-2 w-full text-sm text-gray-700 dark:text-gray-500">
                                        <span class="font-bold">Stored as:</span> {{ file.basename }}
                                    </div>
                                </div>
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
import { ref} from "vue";
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import utils from '../composables/utils';

import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue';
import {
    CheckIcon,
} from '@heroicons/vue/solid';
import {
    CloudUploadIcon,
    ExclamationIcon,
    RefreshIcon,
    LinkIcon,
    XIcon,
} from '@heroicons/vue/outline';

export default{

    props: {
        uploadDir: {
            type: String,
            default: ''
        }
    },

    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        CloudUploadIcon,
        ExclamationIcon,
        CheckIcon,
        RefreshIcon,
        LinkIcon,
        XIcon,
    },

    emits: {

        'upload-completed' (path) {

            console.log('Event payload!', path);
            return true;
        }
    },

    methods: {
        reset() {

            this.$emit('upload-completed', this.domainPath);

            this.uploading.progress = 0;
            this.uploading.ileCount = 0;
            this.uploading.result = {};
            this.fileList.value = '';
        }
    },

    watch: {
        '$route.params.path': function (path) {

            this.domainPath = path;
        }
    },

    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const fileList = ref(null);
        const chunkSize = 1024*1024*2;
        let token = dayjs().format('D-M-YYYY-HH-mm-ss');
        const uploading = ref({
            active: false,
            progress: 0,
            fileCount: 0,
            result: {},
        });

        const domains_id = parseInt(route.params.id || 0);
        const domainPath = ref(props.uploadDir);
        const apiUrl = route.meta.apiUrl;

        const chunkFile = async function(index, file, chunkSize, token) {

            let chunkCount = Math.ceil(file.size / chunkSize),
                chunk = '',
                finalChunk = false;

            console.log(`------------------ ${file.name} ------------------`);
            console.log("Selected file chunk count", chunkCount);
            console.log("Selected file chunkSize", utils().formatBytes(chunkSize, 2));
            console.log("Selected file size", utils().formatBytes(file.size)
        );

            uploading.value.result[index].chunks = chunkCount;

            for (let start = 0; start < file.size; start += chunkSize) {

                if (uploading.value.active === false) {
                    break;
                }

                chunk = file.slice(start, start + chunkSize);
                let formChunk = new FormData();
                formChunk.set('data', chunk, file.name);
                formChunk.set('path', utils().decodePath(domainPath.value));
                formChunk.set('origin', file.name);
                formChunk.set('domains_id', parseInt(domains_id));
                formChunk.set('token', token);
                formChunk.set('public', 1);

                uploading.value.result[index].progress = calculateProgressPercentage(file.size, start + chunkSize);
                //console.log(chunk, start, uploading.value.result[index].progress);

                if (uploading.value.result[index].progress === 100) {

                    finalChunk = true;
                }

                formChunk.set('finalChunk', finalChunk === true ? 1: 0);
                let uploaded = await uploadChunk(formChunk, index, finalChunk);

                if (uploaded === false) {

                    break;
                }
                //let x = await utils().sleep(20);
            }

            uploading.value.progress++;
        };


        const uploadChunk = async function(formChunk, index, finalChunk) {

            const result = await axios.post(`${apiUrl}/api/files`, formChunk, {
                headers: {
                    Authorization: localStorage.getItem('session_id'),
                    'Content-Type': 'multipart/form-data',
                }
            });

            let state = await result.data;

            //console.log('formChunk sent', state);
            //console.log('formChunk response', result);

            if (state.data.uploaded) {

                if (finalChunk === true) {

                    console.log('formChunk response', result);

                    uploading.value.result[index].basename = state.data.uploaded.basename;
                    uploading.value.result[index].uploadDir = state.data.uploaded.uploadDir;
                }

                return true;
            }

            return false;
        };


        const calculateProgressPercentage = function(size, start) {

            let p = start/size;
            p = p > 1 ? 1: Math.round((p + Number.EPSILON)  * 10000) / 10000;
            return Number((p*100).toFixed(2));
        };


        const analyze = function(files) {

            let reg = new RegExp('^[0-9]+$');
            uploading.value.result = {};

            for (let index in Object.keys(files)) {

                if (reg.test(index) === true) {

                    uploading.value.result[index] = {
                        name: files[index].name,
                        chunks: 0,
                        size: files[index].size,
                        sizeHuman: utils().formatBytes(files[index].size, 2),
                        progress: 0,
                        status: false,
                    };
                }
            }

            uploading.value.fileCount = Object.keys(uploading.value.result).length;
        };


        const handleFileInputChange = async function() {

            analyze(fileList.value.files);

            console.log("All files", fileList.value.files);
            console.log("Chunk size", chunkSize);

            if (uploading.value.fileCount > 0) {

                uploading.value.active = true;

                for (let index in Object.keys(uploading.value.result)) {

                    if (uploading.value.active === true) {

                        token = dayjs().format('D-M-YYYY-HH-mm-ss');

                        await chunkFile(index, fileList.value.files[index], chunkSize, token);
                    } else {

                        //break;
                    }
                }
            }

            console.log("Final progress", uploading.value.result);
        };

        return {
            handleFileInputChange,
            fileList,
            uploading,
            domainPath,
       }
    }
}

</script>