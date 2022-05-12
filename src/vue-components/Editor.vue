<template>
    <div>
        <QuillEditor theme="snow" :toolbar="toolbar" contentType="html" :content="htmlContent" ref="internalEditor" @update:content="setEditorContent($event)" />
    </div>
</template>

<script>
import { onMounted, toRef, ref } from "vue";
import { QuillEditor } from '@vueup/vue-quill';
//import BlotFormatter from 'quill-blot-formatter';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
    components: {
        QuillEditor,
    },

    props: {
        htmlContent: {
            type: String,
            default: '<p>Default text</p>',
        },
        toolbar: {
            type: Object,
            default: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'align': [] }],

                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

                ['link' , 'image', 'video'],

                ['clean']                                         // remove formatting button
            ],
        }
    },

    methods: {

        setEditorContent(content) {
            //console.log('Update', this.internalEditor, this.htmlContent, content);
            this.$emit('updated', content);
        }

    },


   emits: [
        'updated',
    ],

    setup(props, { emit }) {
        const internalEditor= ref(null);
        const htmlContent = props.htmlContent;
        const toolbar = props.toolbar;

        const modules = {
            /* name: 'blotFormatter',
            module: BlotFormatter,
            options: {} */
        }

        console.log('Setting initial content', htmlContent);

        return {
            htmlContent,
            toolbar,
            modules,
            internalEditor,
        };
    },
};
</script>
