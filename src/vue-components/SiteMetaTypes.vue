<template>

    <div class="block py-2" :key="meta.type">

        <div
            class="sm:grid sm:grid-cols-2 sm:gap-4"
        >
            <div class="py-1">

                <div v-for="option, index in meta.options" :key="`opt-${option.id}`" class="py-2">

                    <label class="inline-block mb-2 text-sm font-medium" :for="`name-${option.alpha2}`">
                        Name ({{ option.lang }})
                    </label>

                    <input
                        :id="`name-${option.alpha2}`"
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
                        v-model="meta.options[index].name"
                    />

                </div>
            </div>

            <div class="mt-1">

                <div class="block" v-if="['blob', 'text', 'file', 'files', 'color'].includes(meta.type)">

                    <div
                        class="
                            sm:border-t sm:border-gray-200 sm:dark:border-gray-900
                            sm:pt-5
                        "
                    >
                        <label
                            :for="`default-${meta.options[0].alpha2}`"
                            class="
                                block
                                text-sm
                                font-medium
                                text-gray-700
                                dark:text-gray-400
                                mb-2
                            "
                        >
                            Default value
                        </label>
                        <div class="mt-1 sm:mt-0">
                            <input
                                :id="`default-${meta.options[0].alpha2}`"
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
                                v-if="['text'].includes(meta.type)"
                                v-model="meta.options[0].defaults[0].value"
                            />

                            <ColorPicker
                                :theme="darkTheme === true ? 'dark': 'light'"
                                :color="colorPicker.color"
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
                                name="default"
                                :id="`default-${meta.options[0].alpha2}`"
                                rows="6"
                                :placeholder="`Enter default value`"
                                class="border-gray-300 dark:border-gray-700 focus:ring-sky-500 focus:border-sky-500 flex-1 block w-full max-w-lg min-w-0 rounded-md sm:text-sm dark:text-gray-400 dark:bg-gray-900"
                                v-if="['blob'].includes(meta.type)"
                                v-model="meta.options[0].defaults[0].value"
                            ></textarea>

                            <span class="text-sm" v-if="['file', 'files'].includes(meta.type)">This type has no default value</span>
                        </div>
                    </div>

                </div>




                <div class="block" v-if="['radio', 'select'].includes(meta.type)">

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

import { ColorPicker } from 'vue-color-kit';
import 'vue-color-kit/dist/vue-color-kit.css';

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
        ColorPicker,
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

            this.meta.options = this.meta.options.map((option, x) => {
                option.defaults = option.defaults.map((def, i) => {
                    def.value = `rgba(${r}, ${g}, ${b}, ${a})`;
                    return def;
                });
                return option;
            });
            console.log(this.meta.options);
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
        const meta = reactive(props.meta);
        const langs = props.langs;
        const apiUrl = route.meta.apiUrl;
        const darkTheme = JSON.parse(localStorage.getItem('darkTheme')) || false


        const colorPicker = {
            color: '#59c7f9',
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
       }
    }
}
</script>