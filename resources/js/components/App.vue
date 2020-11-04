<template>
    <div>
        <CanvasSize />
        <Font />
        <editor ref="editor" :config="config" :initialized="onInitialized" :ready="onReady" />
    </div>
</template>

<script>
    import Header from '@editorjs/header';
    import Marker from '@editorjs/marker';
    import Table from '@editorjs/table';
    import Underline from '@editorjs/underline';
    import SimpleImage from '@editorjs/simple-image';
    import RedTextColor from '../../plugins/redTextColor/index.js';
    import DragDrop from 'editorjs-drag-drop';
    import Paragraph from 'editorjs-paragraph-with-alignment';
    import ColorPlugin from 'editorjs-text-color-plugin';
    import TextAlign from '@canburaks/text-align-editorjs';
    import Strikethrough from '@itech-indrustries/editorjs-strikethrough';
    import Delimiter from '@editorjs/delimiter';
    import Spacer from '@veryard/spacer';

    import CanvasSize from './CanvasSize.vue';
    import Font from './Font.vue';

    export default {
        components: {
            CanvasSize,
            Font
        },
        data() {
            return {
                config: {
                    inlineToolbar: ['link', 'marker', 'bold', 'italic', 'redTextColor', 'color', 'textAlign', 'strikethrough'],
                    tools: {
                        spacer: Spacer,
                        delimiter: Delimiter,
                        strikethrough: {
                            class: Strikethrough
                        },
                        textAlign: {
                            class: TextAlign
                        },
                        color: {
                            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
                            config: {
                                colorCollections: ['#FF1300','#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
                                defaultColor: '#FF1300',
                                type: 'text',
                            }
                        },
                        marker: {
                            class: ColorPlugin,
                            config: {
                                defaultColor: '#FFBF00',
                                type: 'marker',
                            }
                        },
                        redTextColor: {
                            class: RedTextColor
                        },
                        image: {
                            class: SimpleImage,
                            config: {
                            }
                        },
                        /*
                        marker: {
                            class: Marker,
                            shortcut: 'CMD+SHIFT+M',
                        },
                        */
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
                            },
                            {
                                "type" : "paragraph",
                                "data" : {
                                    "text" : "Ich bin ein Editor."
                                }
                            }
                        ],
                        "version" : "2.18.0"
                    }
                }
            }
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
    body {
        background-color:hsla(0,0%, 50%,0.2);
    }

    #vue-editor-js {
        background-color:hsla(0,0%, 100%,1);
        /**/height: 842px;
        width: 	595px;
        position: relative;
        margin-top: 25px;
        margin-bottom: 25px;
        padding: 0;
        box-shadow: 5px 10px 18px #888888;
        margin-left: 20%;
    }

    .ce-toolbar__plus {
        transform: translate3d(-12px, calc(17px - 50%), 0px) !important;
    }

    .codex-editor {
        padding: 10px 20px;
        /**/height: 842px;
    }

    @media(min-width: 651px) {
        .codex-editor--narrow .codex-editor__redactor {
            margin-right: 0px;
        }
    }

    @media(min-width: 651px) {
        .codex-editor--narrow .ce-toolbar__actions {
            right: 0px;
        }
    }

    .ce-block__content {
        margin: 0;
        max-width: 100%;
    }
</style>
