<template>
    <div>
        <div id="container" class="container" ref="container">
        </div>
    </div>
</template>

<script>
import Header from '@editorjs/header';
import Marker from '@editorjs/marker';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';
import SimpleImage from '@editorjs/simple-image';
import Align from '../../plugins/align/index.js';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
const Paragraph = require('editorjs-paragraph-with-alignment');

export default {
    data() {
        return {
            config: {
                inlineToolbar: ['link', 'marker', 'bold', 'italic', 'align'],
                tools: {
                    align: {
                        class: Align
                    },
                    image: {
                        class: SimpleImage,
                        config: {
                        }
                    },
                    marker: {
                        class: Marker,
                        shortcut: 'CMD+SHIFT+M',
                    },
                    underline: {
                        class: Underline
                    },
                    header: {
                        class: Header,
                        inlineToolbar: ['bold', 'italic', 'underline'],
                        config: {
                            placeholder: 'Enter a header',
                            levels: [2, 3, 4],
                            defaultLevel: 3
                        }
                    },
                    table: {
                        class: Table,
                        inlineToolbar: true,
                        config: {
                            rows: 2,
                            cols: 3,
                        }
                    },
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true,
                    }
                },
                onReady: () => {
                    console.log('in ready');
                    const editor = this.$refs.editor.state.editor;
                    new DragDrop(editor);
                    new Undo({ editor });

                },
                data: {
                    "time": 1591362820044,
                    "blocks": [
                        {
                            "type" : "header",
                            "data" : {
                                "text" : "Editor.js",
                                "level" : 2
                            }
                        }
                    ],
                    "version" : "2.18.0"
                }
            }
        }
    },
    mounted() {
    },
    methods: {
        onInitialized(editor) {
            console.log(editor);
        },
        onReady() {
        }
    }
}
</script>

<style>
.container {
    margin-top: 100px;
    height: 600px;
    width: 600px;
    border: solid 3px black;
    border-radius: 8px;
}
</style>
