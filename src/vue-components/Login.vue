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

                <PageTitle title="Login client device" />

            </div>
        </div>
    </header>

    <main class="pt-8 pb-16">
        <div class="min-w-fit max-w-md mx-auto sm:px-6 lg:px-8">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400 my-4">
                Authorization data
            </h3>

            <div class="w-full lg:max-w-md">
                <label for="login" class="
                        text-gray-700
                        dark:text-gray-400
                        font-medium
                        pb-2
                        block
                "
                >Login</label>
                <div
                    class="
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
                        <UserIcon
                            class="h-5 w-5"
                            aria-hidden="true"
                        />
                    </div>
                    <input
                        id="login"
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
                        autocomplete="off"
                        placeholder="Username or email"
                        type="text"
                        name="ulc"
                        v-model="login"
                        @keyup.enter="useLogin.login(saving, login, password, router)"
                    />
                </div>
            </div>

            <div class="w-full lg:max-w-md pt-8">
                <label for="password" class="
                        text-gray-700
                        dark:text-gray-400
                        font-medium
                        pb-2
                        block
                "
                >Password</label>
                <div
                    class="
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
                        id="password"
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
                        placeholder="password"
                        type="password"
                        name="password"
                        autocomplete="off"
                        v-model="password"
                        @keyup.enter="useLogin.login(saving, login, password, router)"
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
                            bg-amber-600
                            hover:bg-amber-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-amber-500
                        "
                        @click="router.push('/recover')"
                    >
                        Recover password
                    </button>

                    <button
                        type="button"
                        :class="[saving.status === true || login.length <1 || password.length < 1 ? 'bg-gray-400 hover:bg-gray-400 text-gray-200 cursor-not-allowed': 'bg-sky-600 hover:bg-sky-700 text-white', 'ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500']"
                        :disabled="saving.status === true || login.length < 1 || password.length < 1"
                        @click="useLogin().login(saving, login, password, router)"
                    >
                        <LockOpenIcon v-if="!saving.status"
                            class="-ml-1 mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        <RefreshIcon v-if="saving.status"
                            class="animate-spin mr-2 h-5 w-5 text-white"
                            aria-hidden="true"
                        />
                        Authorize
                    </button>
                </div>
            </div>


        </div>

    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import MainMenu from './MainMenu.vue';
import PageTitle from './PageTitle.vue';
import { notify } from 'notiwind';
import useLogin from '../composables/use-login';

import {
    KeyIcon,
    LockOpenIcon,
    UserIcon,
} from '@heroicons/vue/solid';

import {
    RefreshIcon,
} from '@heroicons/vue/outline';

const route = useRoute();
const router = useRouter();

const login = ref('');
const password = ref('');

const saving = ref({
    status: false,
    result: {
        required: {
            username: true,
            password: true,
        }
    },
})

if (route.meta.user.logged === true) {
    //console.log(route.meta.user);
    router.push('/');
}
</script>
