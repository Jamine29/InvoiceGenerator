<template>
    <div>
        <CanvasSize />
        <Font />
        <div id="editorjs"></div>
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

    import CanvasSize from './CanvasSize.vue';
    import Font from './Font.vue';

    //import EditorJS from '@editorjs/editorjs';
    import EditorJS from '../../editorjs';

    let editor = new EditorJS({
        /**
         * Create a holder for the Editor and pass its ID
         */
        holder : 'editorjs',

        fixedTitleBlock:true,

        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
        tools: {
            align: {
                class: RedTextColor
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

        /**
         * Previously saved data that should be rendered
         */
        data: {
            config: {
                inlineToolbar: ['link', 'marker', 'bold', 'italic', 'align'],
                tools: {
                    align: {
                        class: RedTextColor
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
    });

    export default {
        components: {
            CanvasSize,
            Font
        },
        data() {
            return {

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
