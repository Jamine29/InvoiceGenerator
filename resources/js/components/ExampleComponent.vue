<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        I'm an example component.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import EditorJS from "../../editorjs/types";
import RedTextColor from "../../plugins/redTextColor";
import SimpleImage from "@editorjs/simple-image";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import Paragraph from "editorjs-paragraph-with-alignment";
import DragDrop from "editorjs-drag-drop";

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
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
