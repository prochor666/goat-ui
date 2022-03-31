<template>

    <div class="block py-2" :key="meta.type">

        <div
            class="grid grid-cols-2"
            v-for="lang in langs" :key="lang.id"
        >
            <div class="py-2">
                <label class="inline-block mb-4" :for="`name-${lang.alpha2}`">
                    Name ({{ lang.name }})
                </label>

                <input
                    :id="`name-${lang.alpha2}`"
                    name="name"
                    type="text"
                    autocomplete="off"
                    placeholder="Enter meta name"
                    class="
                        block
                        max-w-lg
                        w-full
                        shadow-sm
                        focus:ring-sky-500
                        focus:border-sky-500
                        sm:text-sm
                        border-gray-300
                        rounded-md
                        dark:text-gray-400
                        dark:bg-gray-900
                        dark:border-gray-700
                    "
                    v-model="meta.options[lang.alpha2].name"
                />
            </div>

            <div class="mt-1">

                <div class="block" v-if="['radio', 'select'].includes(meta.type)">
                    <span class="text-md">Radio & select options</span>
                </div>

                <div class="block" v-if="['checkbox'].includes(meta.type)">
                    <span class="text-md">Checkbox options</span>
                </div>

                <div class="block" v-if="['bool'].includes(meta.type)">
                    <span class="text-md">Bool options</span>
                </div>

            </div>

        </div>

        <!--  v-if="['text', 'blob', 'file', 'files', 'bool'].includes(meta.type)" -->

    </div>

</template>

<script>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from 'vue-router';
import utils from '../composables/utils';

import {
    XIcon,
} from '@heroicons/vue/outline';

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
        const meta = reactive(props.meta);
        const langs = props.langs;
        const apiUrl = route.meta.apiUrl;

        return {
            langs,
            meta,
            apiUrl,
       }
    }
}
</script>