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

<script>
import { ref, reactive, toRef, toRefs } from "vue";
import { useRoute, useRouter } from 'vue-router';
import useMeta from '../composables/use-meta';
import utils from '../composables/utils';

import {
    ExclamationIcon,
    CheckCircleIcon,
    InformationCircleIcon,
    XCircleIcon,
} from '@heroicons/vue/solid';

export default{

    props: {
        langs: {
            type: Object,
            default: {},
        },
        meta: {
            type: Object,
            default: {},
        }
    },

    components: {
        ExclamationIcon,
        CheckCircleIcon,
        InformationCircleIcon,
        XCircleIcon,
    },

    setup: function(props) {

        const meta = toRef(props, 'meta');

        return {
            title,
            text,
            type,
        }
    }
};
</script>