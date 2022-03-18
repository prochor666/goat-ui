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
            <div class="w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400">
                    Activate client device
                </h3>
            </div>
        </div>
    </header>

    <main class="pt-8 pb-16">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400 my-4">
                To activate your device, enter your user information
            </h3>

            <div class="w-full lg:max-w-md">
                <label for="username" class="
                        text-gray-700
                        dark:text-gray-400
                        font-medium
                "
                >User identity</label>
                <div
                    class="
                        mt-2
                        relative
                        text-gray-400
                        focus-within:text-gray-500
                    "
                >
                    <div
                        class="
                            pointer-events-none
                            absolute
                            inset-y-0
                            left-0
                            pl-3
                            flex
                            items-center
                        "
                    >
                        <KeyIcon
                            class="h-5 w-5"
                            aria-hidden="true"
                        />
                    </div>
                    <input
                        id="username"
                        class="
                            block
                            w-full
                            bg-white
                            py-2
                            pl-10
                            pr-3
                            border border-gray-300
                            rounded-md
                            leading-5
                            text-gray-900
                            placeholder-gray-500
                            focus:outline-none
                            focus:ring-1 focus:ring-sky-500
                            focus:border-red-500
                            focus:placeholder-gray-500
                            sm:text-sm
                            dark:text-gray-400
                            dark:bg-gray-900
                            dark:border-gray-700
                        "
                        placeholder="Username or email"
                        type="text"
                        name="username"
                        autocomplete="off"
                        v-model="user.profile.username"
                        @keyup.enter="recoverAccount"
                    />
                </div>
            </div>



            <div class="pt-8 pb-16">
                <div class="flex justify-end">
                    <button
                        type="button"
                        class="
                            ml-3
                            inline-flex
                            justify-center
                            py-2
                            px-4
                            border border-transparent
                            shadow-sm
                            text-sm
                            font-medium
                            rounded-md
                            text-white
                            bg-sky-600
                            hover:bg-sky-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-sky-500
                        "
                        @click="recoverAccount"
                    >
                        Send activation
                    </button>
                </div>
            </div>



        </div>

    </main>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import axios from 'axios';
import MainMenu from './MainMenu.vue';
import { notify } from 'notiwind';

import {
    ArrowSmDownIcon,
    ArrowSmUpIcon,
    PaperClipIcon,
    KeyIcon,
} from '@heroicons/vue/solid';

export default {
    components: {
        MainMenu,
        ArrowSmDownIcon,
        ArrowSmUpIcon,
        PaperClipIcon,
        KeyIcon,
    },

    setup() {
        const route = useRoute();
        const user = route.meta.user;

        const recoverAccount = function() {

            return true;
        };

        return {
            user,
            recoverAccount,
        };
    },
};
</script>
