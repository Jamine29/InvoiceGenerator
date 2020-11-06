<template>
    <div>
        <CanvasSize />
        <CanvasFont />
        <div id="editorjs"></div>
    </div>
</template>

<script>
    /* Font und Size funktioniert nicht*/
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
    import CanvasFont from './CanvasFont.vue';
    //import EditorJS from '@editorjs/editorjs';
    import EditorJS from '../../editorjs';
    let editor = new EditorJS({
        readOnly: false,
        /**
         * Create a holder for the Editor and pass its ID
         */
        holder : 'editorjs',
        autofocus: true,
        /*
        fixedTitleBlock:{
            placeholder: "Header"
        },
        */
        fixedTitleBlock: true,
        fixedFooterBlock:{
            placeholder: "Footer"
        },
        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
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
        },
        onReady: function(){
            let editorheader = new EditorJS({
                readOnly: false,
                /**
                 * Create a holder for the Editor and pass its ID
                 */
                holder : 'editor1',
                //autofocus: true,
                fixedTitleBlock: false,
                fixedFooterBlock: false,
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
                },
                onReady: function(){
                    console.log('hier header');
                    console.log('in ready');
                    //const editor = this.$refs.editor.state.editor;
                    new DragDrop(editorheader);
                },
                onChange: function() {
                    console.log('something changed');
                }
            });
            let editorfooter = new EditorJS({
                readOnly: false,
                /**
                 * Create a holder for the Editor and pass its ID
                 */
                holder : 'editor2',
                autofocus: false,
                fixedTitleBlock: false,
                fixedFooterBlock: false,
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
                },
                onReady: function(){
                    console.log('hier footer');
                    console.log('in ready');
                    //const editor = this.$refs.editor.state.editor;
                    new DragDrop(editorfooter);
                },
                onChange: function() {
                    console.log('something changed');
                }
            });
        },
        onChange: function() {
            console.log('something changed');
        }
    });
    export default {
        components: {
            CanvasSize,
            CanvasFont
        },
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>

<style>
    body {
        background-color:hsla(0,0%, 50%,0.2);
    }
    #vue-editor-js {
        background-color:hsla(0,0%, 100%,1);
        /*height: 842px;*/
        height: 714px;
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
        /*height: 842px;*/
        height: 714px; /* wie kann ich die ausgangsgröße einstellen? */
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
    /**/
    .fixed-title-block-container {
        margin: 0;
    }
    .fixed-footer-block-container {
        margin: 0;
    }
    #fixed-footer-block {
        padding: 0px 20px;
    }
    .codex-editor {
        padding-top: 0 !important;
        height: auto !important;
        background: white;
    }
    .codex-editor__redactor {
        padding-bottom: 600px !important;
    }
    #editorjs {
        width: 650px;
        margin-left: 206px;
    }
    .fixed-title-block-container {
        background: white;
    }
    .fixed-footer-block-container {
        background: white;
    }
</style>
