<template>

    <div class="block py-2" :key="meta.type">

        <div
            class="sm:grid sm:grid-cols-3 sm:gap-4"
        >
            <div class="py-2">
                <div class="pt-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                    {{ meta.default.titles[lang] }}
                </div>
                <div class="pt-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                    {{ meta.target }}/{{ meta.tag }}
                </div>
            </div>

            <div class="py-2 sm:col-span-2">

                <div class="block py-2" v-if="['text', 'blob', 'files'].includes(meta.type)">

                    <div
                        class="
                            block
                        "
                    >
                        <div class="mt-1 sm:mt-0 flex">
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
                                    sm:text-sm
                                    rounded-md
                                    text-gray-900
                                    dark:text-gray-400
                                    dark:bg-gray-900
                                "
                                :class="[valid === false ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500']"
                                v-if="['text', 'color'].includes(meta.type)"
                                v-model="meta.realvalue.value"
                            />

                            <textarea
                                type="text"
                                name="default-blob-value"
                                :id="`default-${meta.type}-value`"
                                rows="6"
                                :placeholder="`Enter default value`"
                                class="flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900"
                                :class="[valid === false ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500']"
                                v-if="['blob'].includes(meta.type)"
                                v-model="meta.realvalue.value"
                            ></textarea>

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
                                    sm:text-sm
                                    rounded-md
                                    text-gray-900
                                    dark:text-gray-400
                                    dark:bg-gray-900
                                "
                                :class="[valid === false ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500': 'border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500']"
                                v-if="['files'].includes(meta.type)"
                                v-model="meta.realvalue.value"
                            />
                        </div>
                    </div>
                </div>




                <div class="block py-2" v-if="['color'].includes(meta.type)">

                    <div
                        class="
                            block
                        "
                    >
                        <div class="mt-1 sm:mt-0 flex">

                            <div class="flex
                                border p-0
                                border-gray-300
                                dark:border-gray-700
                                rounded-md shadow-sm
                                focus-within:ring-2
                                "
                                :class="[valid === false ? 'border-red-300 dark:border-red-700 focus-within:ring-red-500 focus-within:border-red-500': 'border-gray-300 dark:border-gray-700 focus-within:ring-sky-500 focus-within:border-sky-500 dark:focus-within:ring-sky-700']"
                            >

                                <div class="flex-1">
                                    <input
                                        :id="`default-${meta.type}-value`"
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
                                            focus:border-0
                                            focus:ring-0
                                            rounded-l-md
                                        "
                                        v-model="meta.realvalue.value"
                                    />
                                </div>

                                <div class="flex-none pt-1 pl-2">
                                    <color-picker
                                        v-model:pureColor="meta.realvalue.value"
                                        v-model:gradientColor="defaultGradient"
                                        pickerType="fk"
                                        useType="pure"
                                        shape="circle"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                <div class="py-2 sm:divide-y sm:divide-gray-200 sm:dark:divide-gray-700" v-if="['selection', 'multiple'].includes(meta.type)">

                    <div
                        :class="[valid === false ? 'block p-2 rounded-md border border-red-300 dark:border-red-700': 'block p-2 ']"
                        v-if="meta.widget === 'select'"
                    >
                        <select
                            id="meta_target"
                            name="meta_target"
                            class="
                                block
                                focus:ring-sky-500
                                focus:border-sky-500
                                w-full
                                shadow-sm
                                sm:max-w-lg
                                sm:text-sm
                                border-gray-300
                                rounded-md
                                text-gray-900
                                dark:text-gray-400
                                dark:bg-gray-900
                                dark:border-gray-700
                            "
                            v-model="meta.realvalue.value"
                        >
                            <option v-for="option, index in meta.default.values" :key="index" :value="option.value">{{ option.names[lang] }}</option>
                        </select>

                    </div>


                    <div
                        :class="[valid === false ? 'block p-2 rounded-md border border-red-300 dark:border-red-700': 'block p-2']"
                        v-if="meta.widget === 'radio'"
                    >

                        <div v-for="option, index in meta.default.values" :key="index" class="flex items-start py-2">
                            <div class="flex items-center">
                                <input :id="`radio-option-${index}`" :aria-describedby="`radio-option-${index}`" :value="option.value" name="radio-option" type="radio" :checked="option.value == meta.realvalue.value"
                                @change="meta.realvalue.value = option.value"
                                class="focus:ring-sky-800/50
                                    dark:focus:ring-sky-600/50
                                    focus:outline-none
                                    h-4
                                    w-4
                                    text-sky-600
                                    dark:text-sky-800
                                    border-gray-300
                                    dark:border-gray-700
                                    dark:bg-gray-700
                                    checked:bg-sky-600
                                    dark:checked:bg-sky-800"
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label
                                    :for="`radio-option-${index}`"
                                    class="font-medium text-gray-700 dark:text-gray-400 select-none">
                                    {{ option.names[lang] }}
                                </label>
                            </div>
                        </div>

                    </div>


                    <div
                        :class="[valid === false ? 'block p-2 rounded-md border border-red-300 dark:border-red-700': 'block p-2']"
                        v-if="meta.widget === 'checkbox'"
                    >

                        <div v-for="option, index in meta.default.values" :key="index" class="flex items-start py-2">
                            <div class="flex items-center">
                                <input :id="`checkbox-option-${index}`" :aria-describedby="`checkbox-option-${index}`" :value="option.value" name="checkbox-option" type="checkbox" v-model="meta.realvalue.value"
                                @change="log(meta.realvalue.value)"
                                class="focus:ring-sky-800/50
                                    dark:focus:ring-sky-600/50
                                    focus:outline-none
                                    h-4
                                    w-4
                                    text-sky-600
                                    dark:text-sky-800
                                    border-gray-300
                                    dark:border-gray-700
                                    dark:bg-gray-700
                                    checked:bg-sky-600
                                    dark:checked:bg-sky-800
                                    rounded"
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label
                                    :for="`checkbox-option-${index}`"
                                    class="font-medium text-gray-700 dark:text-gray-400 select-none">
                                    {{ option.names[lang] }}
                                </label>
                            </div>
                        </div>

                    </div>

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

import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

import {
    PlusCircleIcon,
    TrashIcon,
    XIcon,
} from '@heroicons/vue/outline';

export default{

    props: {
        lang: {
            type: String,
            default: '',
        },
        meta: {
            type: Object,
            default: {},
        },
        valid: {
            type: Boolean,
            default: true,
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

        lowerCase(e) {
            e.target.value = e.target.value.toLowerCase();
        },

        log(m) {
            console.log('Reported meta change', m);
        }
    },

    async setup(props, { emit }) {

        //const metaTypes = useMeta().types();

        const route = useRoute();
        const meta = toRef(props, 'meta');
        const valid = toRef(props, 'valid');
        const lang = props.lang;
        const apiUrl = route.meta.apiUrl;
        const darkTheme = JSON.parse(localStorage.getItem('darkTheme')) || false;

        console.log(`Meta attach recipe ${meta.value.tag}`, meta.value.default, meta.value.realvalue);

        if (meta.type !== 'multiple') {

            meta.value.realvalue.value = meta.value.realvalue.value !== null ? meta.value.realvalue.value: meta.value.default.values[0].value;
        }

        // Stfu picker
        const defaultGradient = ref("linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)");

        return {
            lang,
            meta,
            valid,
            apiUrl,
            defaultGradient,
            darkTheme,
            useMeta: useMeta(),
       }
    }
}
</script>