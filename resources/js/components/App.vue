<template>
    <div>
        <div>
            <editor ref="editor" :config="config" :initialized="onInitialized" :ready="onReady" />
        </div>

        <div class="container">
            <vue-draggable-resizable :w="100" :h="100" @dragging="onDrag" @resizing="onResize" :parent="true">
                <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
                    X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
            </vue-draggable-resizable>
            <vue-draggable-resizable :w="100" :h="100" @dragging="onDrag" @resizing="onResize" :parent="true">
                <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
                    X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
            </vue-draggable-resizable>
            <vue-draggable-resizable :w="100" :h="100" @dragging="onDrag" @resizing="onResize" :parent="true">
                <img src="../../../public/img/image.jpg" v-bind:width="width" v-bind:heigth="height">
            </vue-draggable-resizable>
            <vue-draggable-resizable :w="100" :h="100" @dragging="onDrag" @resizing="onResize" :parent="true">
                <input type="text"/>
            </vue-draggable-resizable>
        </div>
    </div>
</template>

<script>
    const Header = require('../../plugins/header/index.js');
    //import Header from '@editorjs/header';
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
                width: 100,
                height: 100,
                x: 0,
                y: 0,
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
                            /*
                            {
                                "type" : "header",
                                "data" : {
                                    "text" : "Editor.js",
                                    "level" : 2
                                }
                            }
                            */
                        ],
                        "version" : "2.18.0"
                    }
                }
            }
        },
        methods: {
            onResize: function (x, y, width, height) {
                this.x = x
                this.y = y
                this.width = width
                this.height = height
            },
            onDrag: function (x, y) {
                this.x = x
                this.y = y
            },
            onInitialized(editor) {
                console.log(editor);
            },
            onReady() {
            }
        }
    }
</script>

<style>
    body {
        background-color:hsla(0,0%, 50%,0.2);
    }

    #vue-editor-js {
        background-color:hsla(0,0%, 100%,1);
        height: 842px;
        width: 	595px;
        position: relative;
        margin-top: 25px;
        margin-bottom: 25px;
        padding: 0;
        box-shadow: 5px 10px 18px #888888;
        margin-left: 20%;
    }

    .container {
        background-color:hsla(0,0%, 100%,1);
        height: 842px;
        width: 	595px;
        position: relative;
        margin-top: 25px;
        margin-bottom: 25px;
        padding: 0;
        box-shadow: 5px 10px 18px #888888;
    }

    @media (min-width: 651px) {
        .codex-editor--narrow .codex-editor__redactor {
            margin-right: 0px;
        }
    }
</style>
