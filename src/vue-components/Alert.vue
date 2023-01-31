<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="rounded-md p-4 w-full" :class="theme.bg">
        <div class="flex">
            <div class="flex-shrink-0">
                <component :is="theme.icon" class="w-5 h-5" :class="theme.iconColor" aria-hidden="true" />
            </div>
            <div class="ml-3">
                <h3 class="mb-2 text-sm font-medium" :class="theme.titleColor" v-if="title.length > 0">
                    {{ title }}
                </h3>
                <div class="text-sm" :class="theme.textColor">
                    <p>
                    {{ text }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    ExclamationIcon,
    CheckCircleIcon,
    InformationCircleIcon,
    XCircleIcon,
} from '@heroicons/vue/solid';

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'info'
    },
});


const type = props.type;
const title = props.title;
const text = props.text;

const selectTheme = function(type) {

    let theme = {};

    switch(type) {

        case 'success':

            theme = {
                icon: CheckCircleIcon,
                iconColor: 'text-lime-600 dark:text-lime-300',
                titleColor: 'text-lime-800 dark:text-lime-100',
                textColor: 'text-lime-700 dark:text-lime-200',
                bg: 'bg-lime-100 dark:bg-lime-900',
            };
            break;

        case 'warning':

            theme = {
                icon: ExclamationIcon,
                iconColor: 'text-yellow-600 dark:text-yellow-300',
                titleColor: 'text-yellow-800 dark:text-yellow-100',
                textColor: 'text-yellow-700 dark:text-yellow-200',
                bg: 'bg-yellow-100 dark:bg-yellow-900',
            };
            break;

        case 'danger':

            theme = {
                icon: XCircleIcon,
                iconColor: 'text-red-600 dark:text-red-300',
                titleColor: 'text-red-800 dark:text-red-100',
                textColor: 'text-red-700 dark:text-red-200',
                bg: 'bg-red-100 dark:bg-red-900',
            };
            break;

        default:

            theme = {
                icon: InformationCircleIcon,
                iconColor: 'text-sky-600 dark:text-sky-300',
                titleColor: 'text-sky-800 dark:text-sky-100',
                textColor: 'text-sky-700 dark:text-sky-200',
                bg: 'bg-sky-100 dark:bg-sky-900',
            }
    }

    return theme;
};

const theme = selectTheme(type);
</script>
