<template>
    <jodit-editor v-model="content" :editorOptions="options"></jodit-editor>
</template>


<script>
import { JoditEditor } from 'jodit-vue3';
export default {
  name:'Edit',
  components: {
      JoditEditor
  },
  data(){
    return{
      content:"",
      options:{
        textIcons: false,
        iframe: false,
        iframeStyle: '*,.jodit_wysiwyg {color:red;}',
        height: 'auto',
        minHeight:400,
        maxHeight:600,
        defaultMode: JoditEditor.MODE_WYSIWYG,
        imageDefaultWidth:'100%',
        observer: {
            timeout: 100
        },
        commandToHotkeys: {
            'openreplacedialog': 'ctrl+p'
        },
      }
    }
  }
}
</script>