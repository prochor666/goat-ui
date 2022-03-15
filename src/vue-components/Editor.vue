<template>
    <editor-content :editor="editor" />
</template>

<script>
import { useEditor, Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

export default {
    components: {
        EditorContent,
    },

    props: {
        modelValue: {
            type: String,
            default: '',
        },
    },

    watch: {
        modelValue(value) {
        // HTML
        const isSame = this.editor.getHTML() === value

        if (isSame) {
            return
        }

        this.editor.commands.setContent(value, false)
        },
    },

    setup(props) {
        const editor = useEditor({
            content: props.modeValue,
            extensions: [StarterKit],
        });

        return { editor };
    },
};
</script>
