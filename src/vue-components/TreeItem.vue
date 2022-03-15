<template>
    <li>
        <div
            class="text-sm my-1"
        >
            <span
                class="font-bold cursor-pointer w-4 inline-block text-center"
                @click="toggle">
                {{ isOpen ? '-' : '+' }}
            </span>
            <span @click="itemActionHandler(action, domains_id, model.rel)">{{ model.basename }}</span>
        </div>
        <ul
            class="ml-4 list-none list-inside pl-2"
            v-if="isOpen"
        >
            <li class="text-left" v-if="model.children.length === 0">
                <span class="inline-block py-px px-2 text-center text-xs  whitespace-nowrap align-baseline font-bold bg-gray-800 text-gray-400 rounded mr-2">empty</span>
            </li>
            <!--
            A component can recursively render itself using its
            "name" option (inferred from filename if using SFC)
            -->
            <TreeItem
                class="item"
                v-for="item, key in model.children"
                :model="item"
                :loader="loader"
                :action="action"
                :domains_id="domains_id"
                :itemActionHandler="itemActionHandler"
                :key="key">
            </TreeItem>
        </ul>
    </li>
</template>

<script>
import { ref } from 'vue';

export default {
    props: {
        model: {
            type: Object,
            default: {},
        },
        domains_id: {
            type: Number,
            default: 0,
        },
        action: {
            type: String,
            default: 'none',
        },
        loader: {
            type: Function,
            default: function () {
                return {};
            },
        },
        itemActionHandler: {
            type: Function,
            default: function(domains_id, item, action) {
                console.log('Default item action', domains_id, item, action);
            }
        }
    },

    async setup(props) {
        const isOpen = ref(false);
        const loader = props.loader;
        const itemActionHandler = props.itemActionHandler;
        const model = ref(props.model);
        const domains_id = props.domains_id;
        const action = ref(props.action);

        const toggle = async function() {
            if (isOpen.value === false) {
                model.value.children = await loader(model.value.rel);
                //console.log(model.value.children);
            }
            isOpen.value = !isOpen.value;
        }

        return {
            model,
            toggle,
            isOpen,
            loader,
            itemActionHandler,
            domains_id,
            action,
        };
    },
};
</script>
