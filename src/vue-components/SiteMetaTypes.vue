<template>

    <div class="block" v-if="type == 'text'">
        <span class="text-md">Text</span>
    </div>

    <div class="block" v-if="type === 'blob'">
        <span class="text-md">Blob</span>
    </div>

    <div class="block" v-if="type === 'option'">
        <span class="text-md">Option</span>
    </div>

    <div class="block" v-if="type === 'options'">
        <span class="text-md">Multiple options</span>
    </div>

    <div class="block" v-if="type === 'files'">
        <span class="text-md">Files</span>
    </div>

    <div class="block" v-if="type === 'color'">
        <span class="text-md">Color</span>
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
            default: [],
        },
        type: {
            type: String,
            default: 'text',
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
        const _all = await utils().loadHelper('langs');
        const type = props.type;
        const langs = props.langs;
        const allLangs = _all.langs;
        const apiUrl = route.meta.apiUrl;

        const isSelected = function(_langs, _lang) {

            for (let i in _langs) {

                if (_lang.alpha2 === _langs[i].alpha2) {

                    return true;
                }
            }

            return false;
        };

        for (let i in allLangs) {

            if (isSelected(langs, allLangs[i])) {

                allLangs[i].selected = true;
            }
        }


        return {
            langs,
            type,
            allLangs,
            apiUrl,
       }
    }
}
</script>