<template>
    <div>
        <CanvasSize />
        <CanvasFont />
        <div id="editorjs"></div>


            <div class="demo" style="height: 500px; background: red; width: 500px;margin-left:50px">
                <div id="demo 2" style="width: 300px; height: 300px; background: yellow;">
                    <div class="resize-drag" style="width: 50px; height: 50px; background: blue;">
                        Resize from any edge or corner
                    </div>
                </div>
            </div>

    </div>
</template>

<script>
    /* Font und Size noch ändern*/

    import Header from '@editorjs/header';
    import Marker from '@editorjs/marker';
    import Table from '@editorjs/table';
    import Underline from '@editorjs/underline';
    import SimpleImage from '@editorjs/simple-image';
    import RedTextColor from '../../plugins/redTextColor/index.js';
    import DragDrop from 'editorjs-drag-drop';
    import Paragraph from 'editorjs-paragraph-with-alignment';

    import CanvasSize from './CanvasSize.vue';
    import CanvasFont from './CanvasFont.vue';

    //import EditorJS from '@editorjs/editorjs';
    import EditorJS from '../../editorjs';

    const interact = require('interactjs');

    interact('.resize-drag')
        .resizable({
            // resize from all edges and corners
            edges: { left: true, right: true, bottom: true, top: true },

            listeners: {
                move (event) {
                    var target = event.target
                    var x = (parseFloat(target.getAttribute('data-x')) || 0)
                    var y = (parseFloat(target.getAttribute('data-y')) || 0)

                    // update the element's style
                    target.style.width = event.rect.width + 'px'
                    target.style.height = event.rect.height + 'px'

                    // translate when resizing from top or left edges
                    x += event.deltaRect.left
                    y += event.deltaRect.top

                    target.style.webkitTransform = target.style.transform =
                        'translate(' + x + 'px,' + y + 'px)'

                    target.setAttribute('data-x', x)
                    target.setAttribute('data-y', y)
                    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
                }
            },
            modifiers: [
                // keep the edges inside the parent
                interact.modifiers.restrictEdges({
                    outer: 'parent'
                }),

                // minimum size
                interact.modifiers.restrictSize({
                    min: { width: 100, height: 50 }
                })
            ],

            inertia: true
        })
        .draggable({
            listeners: { move: dragMoveListener },
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: '#editor1',
                    endOnly: true
                })
            ]

        })
    function dragMoveListener (event) {
        var target = event.target
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)'

        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    }

    window.dragMoveListener = dragMoveListener;

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

        fixedFooterBlock: true,

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
                    //new DragDrop(editor);
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
                    //new DragDrop(editorheader);
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
            CanvasFont,
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
.demo{}
.resize-drag {
    width: 120px;
    border-radius: 8px;
    padding: 20px;
    margin: 1rem;
    background-color: #29e;
    color: white;
    font-size: 20px;
    font-family: sans-serif;

    touch-action: none;

    /* This makes things *much* easier */
    box-sizing: border-box;
}

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
