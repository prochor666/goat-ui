<template>
    <div>
        --- editor area ---
    </div>
</template>

<script setup>
import { onMounted, toRef, ref } from "vue";

const props = defineProps({
    htmlContent: {
        type: String,
        default: '<p>Default text</p>',
    },
    toolbar: {
        type: Object,
        default: [],
    },
});

const setEditorContent = (content) => {
    //console.log('Update', this.internalEditor, this.htmlContent, content);
    this.$emit('updated', content);
};

const emit = defineEmits(['updated']);


const internalEditor= ref(null);
const htmlContent = props.htmlContent;
const toolbar = props.toolbar;

console.log('Setting initial content', htmlContent);

/*
export default {
    components: {

    },

    props: {
        htmlContent: {
            type: String,
            default: '<p>Default text</p>',
        },
        toolbar: {
            type: Object,
            default: [],
        }
    },


    setup(props, { emit }) {
        const internalEditor= ref(null);
        const htmlContent = props.htmlContent;
        const toolbar = props.toolbar;

        console.log('Setting initial content', htmlContent);

        return {
            htmlContent,
            toolbar,
            internalEditor,
        };
    },
};
*/
</script>


