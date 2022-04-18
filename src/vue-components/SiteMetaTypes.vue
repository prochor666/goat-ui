<template>

    <div class="block py-2" :key="meta.type">

        <div
            class="sm:grid sm:grid-cols-2 sm:gap-4"
        >
            <div class="py-2">

                <div v-for="title, lang in meta.default.titles" :key="`opt-${lang}`" class="px-2 py-2">

                    <label class="inline-block mb-2 text-sm font-medium select-none" :for="`name-${lang}`">
                        Title ({{ lang }})
                    </label>

                    <input
                        :id="`name-${lang}`"
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
                        v-model="meta.default.titles[lang]"
                    />

                </div>
            </div>

            <div class="py-2">

                <div class="block px-2 py-2" v-if="['blob', 'text', 'file', 'files', 'color'].includes(meta.type)">

                    <div
                        class="
                            block
                        "
                    >
                        <label
                            :for="`default-${meta.type}-value`"
                            class="
                                block
                                text-sm
                                font-medium
                                text-gray-700
                                dark:text-gray-400
                                mb-2
                                select-none
                            "
                        >
                            Default value
                        </label>
                        <div class="mt-1 sm:mt-0">
                            <input
                                :id="`default-${meta.type}-value`"
                                name="default"
                                type="text"
                                autocomplete="off"
                                :placeholder="`Enter default value`"
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
                                v-if="['text', 'color'].includes(meta.type)"
                                v-model="meta.default.values[0].value"
                            />

                            <ColorPicker
                                :theme="darkTheme === true ? 'dark': 'light'"
                                :color="meta.default.values[0].value"
                                :sucker-hide="false"
                                :sucker-canvas="colorPicker.suckerCanvas"
                                :sucker-area="colorPicker.suckerArea"
                                @changeColor="changeSingleColor"
                                class="p-4"
                                @openSucker="openSucker"
                                v-if="['color'].includes(meta.type)"
                            />

                            <textarea
                                type="text"
                                name="default-blob-value"
                                :id="`default-${meta.type}-value`"
                                rows="6"
                                :placeholder="`Enter default value`"
                                class="border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500 flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900"
                                v-if="['blob'].includes(meta.type)"
                                v-model="meta.default.values[0].value"
                            ></textarea>

                            <span class="text-sm" v-if="['file', 'files'].includes(meta.type)">This type has no default value</span>
                        </div>
                    </div>

                </div>

                <div class="py-2 sm:divide-y sm:divide-gray-200 sm:dark:divide-gray-700" v-if="['radio', 'select', 'checkbox'].includes(meta.type)">

                    <div class="block border-0 px-2 py-2 mb-2">

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
                            @click="useMeta.addDefaultValue(meta, langs)"
                        >
                            <PlusCircleIcon
                                class="-ml-1 mr-2 h-5 w-5"
                                aria-hidden="true"
                            />
                            Create
                        </button>

                    </div>

                    <div
                        v-for="value, index in meta.default.values"
                        :key="index"
                        class="block px-2 py-2"
                    >

                        <div class="my-2 sm:grid sm:grid-cols-2 sm:gap-4">
                            <label
                                :for="`default-${index}`"
                                class="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    dark:text-gray-400
                                    mb-2
                                    select-none
                                "
                            >
                                Option ({{ index }}) value
                            </label>

                            <div class="flex border p-0 border-gray-300 dark:border-gray-700 rounded-md shadow-sm group hover:ring-2 hover:ring-offset-gray-50 hover:ring-sky-500 dark:hover:ring-sky-700">

                                <div class="flex-1">
                                    <input
                                        :id="`default-${index}`"
                                        name="option-value"
                                        type="text"
                                        autocomplete="off"
                                        placeholder="Enter option value"
                                        class="
                                            w-full
                                            sm:text-sm
                                            dark:text-gray-400
                                            dark:bg-gray-900
                                            border-0
                                            focus:ring-sky-500
                                            focus:border-sky-500
                                            rounded-l-md
                                        "
                                        v-model="meta.default.values[index].value"
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
                                            focus:ring-red-500
                                            text-white"

                                        :class="index === 0 ? 'cursor-not-allowed text-gray-300 dark:text-gray-700 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800': 'bg-red-600 hover:bg-red-700 text-white'"
                                        :disabled="index === 0"
                                        @click="useMeta.removedDefaultValue(meta, index)"
                                        >
                                        <TrashIcon
                                            class="-ml-1 mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Remove
                                    </button>
                                </div>
                            </div>


                        </div>


                        <div
                            class="
                                sm:border-t sm:border-gray-200 sm:dark:border-gray-900
                                sm:grid sm:grid-cols-2 sm:gap-4
                                py-2
                            "
                            v-for="name, nameKey in meta.default.values[index].names"
                            :key="nameKey"
                        >
                            <label
                                :for="`default-name-${index}-${nameKey}`"
                                class="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    dark:text-gray-400
                                    mb-2
                                    select-none
                                "
                            >
                                Option name ({{ nameKey }})
                            </label>


                            <div class="mt-1 sm:mt-0">
                                <input
                                    :id="`default-name-${index}-${nameKey}`"
                                    :name="`default-name-${index}-${nameKey}`"
                                    type="text"
                                    autocomplete="off"
                                    :placeholder="`Enter option ${nameKey} name`"
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
                                    v-model="meta.default.values[index].names[nameKey]"
                                />
                            </div>
                        </div>
                    </div>

                </div>


                <div class="py-2 sm:divide-y sm:divide-gray-200 sm:dark:divide-gray-700" v-if="['bool'].includes(meta.type)">
                    <span class="text-md">Bool options</span>
                </div>


            </div>

        </div>

        <!--  v-if="['text', 'blob', 'file', 'files', 'bool'].includes(meta.type)" -->

    </div>

</template>

<script>
import { ref, reactive, toRef, toRefs } from "vue";
import { useRoute, useRouter } from 'vue-router';
import useMeta from '../composables/use-meta';
import utils from '../composables/utils';

import { ColorPicker } from 'vue-color-kit';
import 'vue-color-kit/dist/vue-color-kit.css';

import {
    PlusCircleIcon,
    TrashIcon,
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
        ColorPicker,
        PlusCircleIcon,
        TrashIcon,
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
        },

        changeSingleColor(color) {

            const { r, g, b, a } = color.rgba;
            this.meta.default.values[0].value = `rgba(${r}, ${g}, ${b}, ${a})`;
            console.log(this.meta.default.values[0]);
        },


        openSucker(isOpen) {
            if (isOpen) {
                // ... canvas be created
                // this.suckerCanvas = canvas
                // this.suckerArea = [x1, y1, x2, y2]
            } else {
                // this.suckerCanvas && this.suckerCanvas.remove
            }
        },

        lowerCase(e) {
            e.target.value = e.target.value.toLowerCase();
        },
    },

    async setup(props, { emit }) {

        const route = useRoute();
        const meta = toRef(props, 'meta');
        const langs = props.langs;
        const apiUrl = route.meta.apiUrl;
        const darkTheme = JSON.parse(localStorage.getItem('darkTheme')) || false

        const colorPicker = {
            color: '#000000',
            suckerCanvas: null,
            suckerArea: [],
            isSucking: false,
        }

        return {
            langs,
            meta,
            apiUrl,
            colorPicker,
            darkTheme,
            useMeta: useMeta(),
       }
    }
}
</script>