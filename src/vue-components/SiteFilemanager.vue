<template>
    <MainMenu />

    <!-- Page heading -->
    <header class="bg-gray-100 dark:bg-gray-900 py-4 sm:py-8" :key="activeDirKey">
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

                <PageTitle title="Filemanager" />

                <div
                    class="
                        mt-1
                        flex-col
                        sm:flex sm:flex-1 sm:flex-row
                        sm:mt-3
                        sm:space-x-8
                    "
                >
                    <div :key="activeDirKey" class="mt-4 sm:mt-2 flex items-center text-sm text-gray-700 dark:text-gray-500">

                        <FolderOpenIcon
                            class="-ml-1 mr-2 h-5 w-5 text-emerald-400"
                            aria-hidden="true"
                        />

                        <span>
                        <router-link
                            :to="{
                                name: route.name,
                                params: {
                                    id: domains_id,
                                    path: ''
                                },
                            }
                            "
                            class="mr-0.5 text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                            {{ site.name }}
                        </router-link>
                        </span>

                        <span v-for="link in useFiles.dirList.statusBarPath" :key="link">
                            /<router-link
                                :to="{
                                    name: route.name,
                                    params: {
                                        id: link.params.id,
                                        path: link.params.path
                                    }
                                }
                                "
                                class="mx-0.5 text-sm font-medium text-gray-500 hover:text-gray-700"
                            >
                                {{ link.name }}
                            </router-link>
                        </span>

                        <span class="ml-2 text-sm">{{ utils.formatBytes(useFiles.dirList.filesTotalSize) }} in {{ useFiles.dirList.filesTotal }} files</span>
                    </div>
                </div>
            </div>



            <div class="mt-5 xl:mt-0 xl:ml-4">



                <button
                    type="button"
                    class="
                        inline-flex
                        items-center
                        px-4
                        py-2
                        rounded-md
                        shadow-sm
                        text-sm
                        font-medium
                        text-gray-700
                        dark:text-gray-400
                        bg-white
                        dark:bg-gray-800
                        border
                        border-gray-300
                        dark:border-gray-600
                        hover:bg-gray-50
                        dark:hover:bg-gray-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-gray-50
                        focus:ring-sky-500
                    "
                    @click="actionsMenuOpen = !actionsMenuOpen; bulkActionActive = 'none'"
                >
                    <ClipboardListIcon
                        class="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                    />
                    Actions
                </button>

            </div>

        </div>
    </header>

    <main class="pt-8 pb-16">

        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 px-3">

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5" :key="activeDirKey">

                <div class="mt-4 max-w-lg w-full place-self-center sm:col-span-3 lg:col-span-5" v-if="useFiles.dirList.dirs.length === 0 && useFiles.dirList.files.length === 0">
                    <Alert text="Directory is empty" type="info" />
                </div>

                <div v-for="item in useFiles.dirList.dirs" :key="item.http" class="
                    text-gray-500 dark:text-gray-500
                    bg-gray-100 dark:bg-gray-900
                    hover:bg-gray-200 dark:hover:bg-gray-800
                    select-none cursor-pointer
                    p-2 rounded-md
                    relative
                    group
                "
                :title="item.rel"
                >
                    <label class="px-3 py-2 absolute top-0 left-0 opacity-50 group-hover:opacity-100 rounded-tl-md rounded-br-md group-hover:bg-gray-300 dark:group-hover:bg-gray-900">
                        <input
                            id="select_object"
                            name="select_object"
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
                                rounded
                            "
                            :checked="useFiles.selection.dirs.includes(item.rel)"
                            :value="item.rel"
                            @change="selectionAction(item.rel, 'dirs')"
                        />
                    </label>
                    <router-link
                    :to="{
                        name: 'files',
                        params: {
                            id: domains_id,
                            path: utils.encodePath(item.rel)
                        }
                    }"
                    class="block h-full grid grid-cols-2 gap-x-0 gap-y-3 items-end"
                    >
                    <!-- @click="dirList = useFiles.list(domains_id, item.rel)" -->
                        <FolderIcon
                            class="h-14 w-14 mx-auto text-gray-400 dark:text-gray-500 col-span-2 self-start"
                            aria-hidden="true"
                        />
                        <p class="grow h-16 break-all text-sm overflow-hidden text-center col-span-2">{{ item.basename }}</p>
                        <div class="text-xs text-left self-end">{{ item.info.mode.toString(8) }}</div>
                        <div class="text-xs text-right self-end">{{ $dayjs.unix(item.info.mtime).format('D. M. YYYY HH:mm') }}</div>
                    </router-link>
                </div>

                <div v-for="item in useFiles.dirList.files" :key="item.http" class="
                    text-gray-500 dark:text-gray-500
                    bg-gray-100 dark:bg-gray-900
                    hover:bg-gray-200 dark:hover:bg-gray-800
                    select-none cursor-pointer
                    relative
                    rounded-md
                    group
                "
                :title="item.rel"
                >
                    <label class="px-3 py-2 absolute top-0 left-0 opacity-50 group-hover:opacity-100 rounded-tl-md rounded-br-md group-hover:bg-gray-300 dark:group-hover:bg-gray-900">
                        <input
                            id="select_object"
                            name="select_object"
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
                                rounded
                            "
                            :checked="useFiles.selection.files.includes(item.rel)"
                            :value="item.rel"
                            @change="selectionAction(item.rel, 'files')"
                        />
                    </label>

                    <div class="grid grid-cols-2 gap-x-0 gap-y-3 p-2 rounded-md"
                        @click="fileAction(item)"
                    >
                        <img class="h-14 mx-auto text-gray-400 dark:text-gray-500 col-span-2 self-start brightness-75 group-hover:brightness-125"
                            :src="`${apiUrl}${item.variants.ico}`"
                            v-if="item.variants.ico !== false">

                        <DocumentTextIcon
                            class="h-14 w-14 mx-auto text-gray-400 dark:text-gray-500 col-span-2 self-start"
                            v-if="item.variants.ico === false"
                            aria-hidden="true"
                        />
                        <p class="grow py-1 break-all text-xs overflow-hidden text-center col-span-2">{{ item.mime }}</p>
                        <p class="grow h-16 break-all text-sm overflow-hidden text-center col-span-2">{{ item.basename }}</p>
                        <div class="text-xs text-left self-end">{{ utils.formatBytes(item.info.size) }}</div>
                        <div class="text-xs text-right self-end">{{ $dayjs.unix(item.info.mtime).format('D. M. YYYY HH:mm') }}</div>
                    </div>
                </div>
            </div>

        </div>
    </main>


    <!-- Actions offcanvas -->




    <TransitionRoot as="template" :show="actionsMenuOpen">
    <Dialog as="div" class="fixed inset-0 overflow-hidden z-10">
        <div class="absolute inset-0 overflow-hidden">
        <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="absolute inset-0 bg-gray-500 dark:bg-black bg-opacity-75 dark:bg-opacity-90 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="w-screen max-w-md">
                <div class="h-full flex flex-col py-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-400 shadow-xl overflow-y-scroll">
                    <div class="px-4 sm:px-6">
                        <div class="flex items-start justify-between">
                            <DialogTitle class="text-lg font-medium select-none">
                                Action panel
                            </DialogTitle>
                            <div class="ml-3 h-7 flex items-center">
                                <button type="button" class="bg-white dark:bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-800 dark:focus:bg-gray-900" @click="actionsMenuOpen = false">
                                <span class="sr-only">Close panel</span>
                                <XIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 relative flex-1 px-4 sm:px-6 select-none">
                        <!-- Replace with your content -->
                        <div class="absolute inset-0 px-4 sm:px-6">

                            <div class="mt-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                                <h3
                                    class="
                                        leading-6
                                        font-medium
                                        text-gray-900
                                        dark:text-gray-400
                                        flex items-center
                                    "
                                >
                                    <UploadIcon
                                        class="inline mr-2 h-5 w-5 flex-shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span class="flex-shrink-0">Upload files</span>
                                </h3>
                                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                                    Upload files in selected directory.
                                </p>
                            </div>


                            <Uploader @upload-completed="refreshDirList(true)" :key="activeDirKey" :uploadDir="activeDir" />


                            <div class="mt-4 mb-6 py-4 border-b border-gray-200 dark:border-gray-800">
                                <h3
                                    class="
                                        leading-6
                                        font-medium
                                        text-gray-900
                                        dark:text-gray-400
                                        flex items-center
                                    "
                                >
                                    <FolderAddIcon
                                        class="inline mr-2 h-5 w-5 flex-shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span class="flex-shrink-0">New directory</span>
                                </h3>
                                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                                    Create subdirectory using /.
                                </p>
                            </div>


                            <div class="flex mt-4 border p-0 border-gray-300 dark:border-gray-700 rounded-md shadow-sm group hover:ring-2 hover:ring-offset-gray-50 hover:ring-sky-500 dark:hover:ring-sky-700">

                                <div class="flex-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autocomplete="off"
                                        placeholder="Enter/dir/path"
                                        class="
                                            w-full
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
                                        v-model="newDir"
                                        @keyup.enter="createDir()"
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
                                            rounded-r-md
                                            text-sm
                                            font-medium
                                            focus:outline-none
                                            focus:ring-0
                                            focus:ring-offset-gray-50
                                            focus:ring-sky-500
                                        "
                                        :class="newDir.length === 0 ? 'cursor-not-allowed text-gray-300 dark:text-gray-700 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800': 'bg-sky-600 hover:bg-sky-700 text-white'"
                                        :disabled="newDir.length === 0"
                                        @click="createDir()"
                                    >
                                        <FolderAddIcon
                                            class="-ml-1 mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Create directory
                                    </button>
                                </div>
                            </div>


                            <div class="mt-4 mb-6 py-4 border-b border-gray-200 dark:border-gray-800">
                                <h3
                                    class="
                                        leading-6
                                        font-medium
                                        text-gray-900
                                        dark:text-gray-400
                                        flex items-center
                                    "
                                >
                                    <ClipboardCheckIcon
                                        class="inline mr-2 h-5 w-5 flex-shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span class="flex-shrink-0">Keeper</span>
                                </h3>
                                <div class="my-2 max-w-2xl text-sm text-gray-500 flex" v-if="bulkActionActive === 'none'">

                                    <button
                                        type="button"
                                        class="
                                            w-1/3
                                            inline-flex
                                            items-center
                                            px-4
                                            py-2
                                            rounded-l-md
                                            shadow-sm
                                            text-sm
                                            font-medium
                                            border
                                            border-gray-300
                                            dark:border-gray-600
                                        "
                                        :class="useFiles.selection.dirs.length === 0 && useFiles.selection.files.length === 0 ? 'cursor-not-allowed text-gray-300 dark:text-gray-700 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800': 'bg-sky-600 hover:bg-sky-700 text-white'"
                                        :disabled="useFiles.selection.dirs.length === 0 && useFiles.selection.files.length === 0"
                                        @click="bulkActionActive = 'copy'"
                                    >
                                        <ChevronRightIcon
                                            class="-ml-1 mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Copy
                                    </button>

                                    <button
                                        type="button"
                                        class="
                                            w-1/3
                                            inline-flex
                                            items-center
                                            px-4
                                            py-2
                                            shadow-sm
                                            text-sm
                                            font-medium
                                            border
                                            border-gray-300
                                            dark:border-gray-600
                                        "
                                        :class="useFiles.selection.dirs.length === 0 && useFiles.selection.files.length === 0 ? 'cursor-not-allowed text-gray-300 dark:text-gray-700 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800': 'bg-amber-600 hover:bg-amber-700 text-white'"
                                        :disabled="useFiles.selection.dirs.length === 0 && useFiles.selection.files.length === 0"
                                        @click="bulkActionActive = 'move'"
                                    >
                                        <ChevronDoubleRightIcon
                                            class="-ml-1 mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Move
                                    </button>

                                    <button
                                        type="button"
                                        class="
                                            w-1/3
                                            inline-flex
                                            items-center
                                            px-4
                                            py-2
                                            rounded-r-md
                                            shadow-sm
                                            text-sm
                                            font-medium
                                            border
                                            border-gray-300
                                            dark:border-gray-600
                                        "
                                         :class="useFiles.selection.dirs.length === 0 && useFiles.selection.files.length === 0 ? 'cursor-not-allowed text-gray-300 dark:text-gray-700 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800': 'bg-red-600 hover:bg-red-700 text-white'"
                                        :disabled="useFiles.selection.dirs.length === 0 && useFiles.selection.files.length === 0"
                                        @click="bulkActionActive = 'delete'"
                                    >
                                        <TrashIcon
                                            class="-ml-1 mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Delete
                                    </button>


                                </div>
                                <p class="mt-1 max-w-2xl text-sm text-gray-500" v-if="bulkActionActive === 'none'">
                                    Choose action on selected files or directories.
                                </p>
                            </div>

                            <div
                                class="mb-6"
                                v-if="bulkActionActive === 'copy' || bulkActionActive === 'move' "
                            >
                                <div class="flex">

                                    <span class="flex-1 text-sm py-2">Selection {{ bulkActionActive }} to: </span>
                                    <button
                                        class="text-sm group-hover:text-sky-900 dark:group-hover:text-sky-400 flex-none"
                                        @click="bulkActionActive = 'none'"
                                    >
                                    <ChevronLeftIcon
                                        class="ml-2 h-4 w-4 flex-none"
                                        aria-hidden="true"
                                    />
                                    </button>
                                </div>
                                <ul
                                    class="mb-6 list-none list-inside pl-2 border-l border-gray-200 dark:border-gray-700"
                                >
                                    <TreeItem
                                        class="item"
                                        v-for="item, key in fsRoot"
                                        :model="item"
                                        :domains_id="domains_id"
                                        :action="bulkActionActive"
                                        :loader="loadDirs"
                                        :itemActionHandler="useFiles.bulkAction"
                                        :key="key">
                                    </TreeItem>


                                    <!-- <TreeItem
                                        class="item"
                                        v-for="item, key in directoryModel"
                                        :model="item"
                                        :domains_id="domains_id"
                                        :action="bulkActionActive"
                                        :loader="loadDirs"
                                        :itemActionHandler="useFiles.bulkAction"
                                        :key="key">
                                    </TreeItem> -->
                                </ul>
                            </div>


                            <div
                                class="mb-6"
                                v-if="bulkActionActive === 'delete' "
                            >
                                <div class="flex">

                                    <span class="flex-1 text-sm py-2">Selection {{ bulkActionActive }}: </span>
                                    <button
                                        class="text-sm group-hover:text-sky-900 dark:group-hover:text-sky-400 flex-none"
                                        @click="bulkActionActive = 'none'"
                                    >
                                    <ChevronLeftIcon
                                        class="ml-2 h-4 w-4 flex-none"
                                        aria-hidden="true"
                                    />
                                    </button>
                                </div>
                                <div class="py-2">
                                    Are you sure?
                                </div>
                                <div class="flex">

                                    <button
                                        type="button"
                                        class="
                                            w-1/2
                                            inline-flex
                                            items-center
                                            px-4
                                            py-2
                                            rounded-l-md
                                            shadow-sm
                                            text-sm
                                            font-medium
                                            border
                                            border-gray-300
                                            dark:border-gray-600
                                            bg-sky-600
                                            hover:bg-sky-700
                                            text-white
                                        "
                                    >
                                        <CheckIcon
                                            class="-ml-1 mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Yes
                                    </button>

                                    <button
                                        type="button"
                                        class="
                                            w-1/2
                                            inline-flex
                                            items-center
                                            px-4
                                            py-2
                                            rounded-r-md
                                            shadow-sm
                                            text-sm
                                            font-medium
                                            border
                                            border-gray-300
                                            dark:border-gray-600
                                            bg-red-600
                                            hover:bg-red-700
                                            text-white
                                        "
                                    >
                                        <XIcon
                                            class="-ml-1 mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        No
                                    </button>
                                </div>

                            </div>


                            <div class="mb-6 block" v-if="bulkActionActive === 'none'">

                                <p class="text-gray-900 dark:text-gray-400 text-sm py-2">
                                Keeped {{ useFiles.selection.dirs.length }} director<span v-if="useFiles.selection.dirs.length!=1">ies</span><span v-if="useFiles.selection.dirs.length==1">y</span> and {{ useFiles.selection.files.length }} file<span v-if="useFiles.selection.files.length!=1">s</span>
                                </p>

                                <div class="flex text-gray-900 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 group text-sm py-1"
                                    v-for="dir in useFiles.selection.dirs"
                                    :key="dir"
                                >
                                    <div class="flex-1 truncate">{{ dir }}</div>
                                    <button class="group-hover:text-sky-900 dark:group-hover:text-sky-400"
                                        @click="selectionAction(dir, 'dirs')"
                                    >
                                    <XIcon
                                        class="ml-2 h-4 w-4 flex-none"
                                        aria-hidden="true"
                                    />
                                    </button>
                                </div>

                                <div class="flex text-gray-900 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 group text-sm py-1"
                                    v-for="file in useFiles.selection.files"
                                    :key="file"
                                >
                                    <div class="truncate flex-1">{{ file }}</div>
                                    <button class="group-hover:text-sky-900 dark:group-hover:text-sky-400"
                                        @click="selectionAction(file, 'files')"
                                    >
                                    <XIcon
                                        class="ml-2 h-4 w-4 flex-none"
                                        aria-hidden="true"
                                    />
                                    </button>
                                </div>

                            </div>


                        </div>
                        <!-- /End replace -->
                    </div>
                </div>
            </div>
            </TransitionChild>
        </div>
        </div>
    </Dialog>
    </TransitionRoot>

    <FileDetail @reload-needed="refreshDirList()" :key="reopenKey" :file="fileDetail" :active="fileDetailOpen" />

    <div class="pt-4 top-0 left-0 fixed h-screen w-screen z-1000 bg-opacity-90 dark:bg-opacity-80 bg-black flex items-center justify-center" v-if="useFiles.loading.status === true">
        <Loader :text="useFiles.loading.text" />
    </div>

</template>

<script>
import { watchEffect, watch, ref, reactive } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import MainMenu from './MainMenu.vue';
import Breadcrumbs from './Breadcrumbs.vue';
import Uploader from './Uploader.vue';
import Loader from './Loader.vue';
import FileDetail from './FileDetail.vue';
import Alert from './Alert.vue';
import PageTitle from './PageTitle.vue';
import TreeItem from './TreeItem.vue';

import useSites from '../composables/use-sites';
import useFiles from '../composables/use-files';
import utils from '../composables/utils';

import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue';
import {
    CalendarIcon,
    CheckCircleIcon,
    CheckIcon,
    LocationMarkerIcon,
} from '@heroicons/vue/solid';
import {
    ClipboardCheckIcon,
    ClipboardListIcon,
    DocumentTextIcon,
    FolderIcon,
    FolderAddIcon,
    FolderOpenIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
    MenuIcon,
    RefreshIcon,
    TrashIcon,
    UploadIcon,
    XIcon,
} from '@heroicons/vue/outline';


export default {
    components: {
        Alert,
        MainMenu,
        Breadcrumbs,
        Uploader,
        Loader,
        FileDetail,
        PageTitle,
        TreeItem,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        MenuIcon,
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        ClipboardCheckIcon,
        ClipboardListIcon,
        CalendarIcon,
        DocumentTextIcon,
        FolderIcon,
        FolderAddIcon,
        FolderOpenIcon,
        CheckCircleIcon,
        CheckIcon,
        ChevronLeftIcon,
        ChevronRightIcon,
        ChevronDoubleRightIcon,
        LocationMarkerIcon,
        RefreshIcon,
        TrashIcon,
        UploadIcon,
        XIcon,
    },

    methods: {
        lowerCase(e) {
            e.target.value = e.target.value.toLowerCase();
        },

        async refreshDirList(check = false) {

            this.useFiles.loading.text = 'Creating thumbnails...';
            this.loadManager(check);
        }
    },

    watch: {
        '$route.params.path': async function (path) {

            this.resetSelection();

            if (this.route.name == 'files') {

                this.activeDir = path;
                await this.loadManager();
                //console.log('Watched route', path, this.activeDir, this.selection);
            }
        },
    },

    async setup() {

        const route = useRoute();
        const router = useRouter();
        const apiUrl = localStorage.getItem("apiUrl") || '';
        const actionsMenuOpen = ref(false);

        let activeDir = ref(route.params.path || '');
        let activeDirKey = ref(`root-${activeDir.value}`);
        let bulkActionActive = ref('none');

        const domains_id = parseInt(route.params.id || 0);

        let site = await useSites().load(domains_id);
        let newDir = ref('');

        const fileDetail = ref({
            basename: '',
            rel: '',
            http: '',
            id: 0,
            domains_id: domains_id,
            mime: '',
            variants: {},
        });
        const fileDetailOpen = ref(false);

        const reopenKey = ref(utils().getRndKey());


        const resetSelection = function() {

            useFiles().selection.dirs = [];
            useFiles().selection.files = [];
        };


        const createSelection = function() {

            let fromStorage = utils().keeper('filemanager');

            if (typeof fromStorage === 'object' && fromStorage !== null) {

                useFiles().selection.dirs = fromStorage.dirs;
                useFiles().selection.files = fromStorage.files;
                //console.log('Initial selection', useFiles().selection);
            }
        };

        createSelection();

        if (site.id === 0) {

            router.push('sites');
        }


        const createDir = async function() {

            if (newDir.value.length > 0) {

                let path = [
                    utils().decodePath(activeDir.value),
                    newDir.value.toString()
                ].join('/');

                const result = await useFiles().createDir(domains_id, path);

                if (result.data.status) {
                    newDir.value = '';
                }
            }
        };


        const fileAction = function(item) {

            reopenKey.value = utils().getRndKey();
            fileDetail.value.basename = item.basename;
            fileDetail.value.rel = item.rel;
            fileDetail.value.mime = item.mime;
            fileDetail.value.http = item.http;
            fileDetail.value.id = parseInt(item.id);
            fileDetail.value.variants = item.variants;
            fileDetailOpen.value = true;
            //console.log(relPath, httpPath, mimeType);
        };


        const selectionAction = function(value, type) {

            if (!useFiles().selection[type].includes(value)) {

                //console.log('Add selection item', type, value);
                useFiles().selection[type].push(value);
            } else {

                //console.log('Remove selection item', type, useFiles().selection[type].indexOf(value), value);
                useFiles().selection[type].splice(useFiles().selection[type].indexOf(value), 1);
            }

            //console.log('Action selection', useFiles().selection);
            useFiles().selection.dirs.sort();
            useFiles().selection.files.sort();
        };


        const loadManager = async function(check = false) {

            useFiles().dirList = await useFiles().list(domains_id, utils().decodePath(activeDir.value), check);
        };


        const loadDirs = async function(path) {

            const data = await useFiles().requestDirData(domains_id, utils().decodePath(path), false);
            //console.log(`Taget dir choice: ${path} => data: `, data);
            return data.dirs || {};
        };


        watch(useFiles().loading, async (value) => {

            if (value.status === true) {

                //value.text = 'Creating thumbnails...';
            } else {

                actionsMenuOpen.value = false;
                value.text = 'Loading...';
            }
        },{
            deep: true
        });


        watch(useFiles().saving, async (value) => {

            if (value.status === false) {

                await loadManager();
            }
        },{
            deep: true
        });


        watch(useFiles().selection, async (value) => {

            //console.log('Watched selection files', value.files);
            //console.log('Watched selection dirs', value.dirs);
            utils().keeper('filemanager', value);
        },{
            deep: true
        });

        await loadManager();


        const breadCrumbs = [{
            name: 'Sites',
            route: {
                name: 'sites',
            }
        },{
            name: site.name,
            route: {
                name: 'pages',
                params: {
                    id: domains_id
                }
            }
        }];

        // let directoryModel = await loadDirs('');
        // console.log(directoryModel);

        const fsRoot = [
            {
                basename: "/",
                rel: "",
                type: "dir",
            }
        ]

        return {
            apiUrl,
            site,
            domains_id,
            route,
            activeDir,
            activeDirKey,
            breadCrumbs,
            useFiles: useFiles(),
            utils: utils(),
            newDir,
            createDir,
            loadManager,
            resetSelection,
            fileAction,
            selectionAction,
            actionsMenuOpen,
            FolderOpenIcon,
            fileDetail,
            fileDetailOpen,
            reopenKey,
            bulkActionActive,
            loadDirs,
            //directoryModel,
            fsRoot,
        };
    },
};
</script>

<style></style>
