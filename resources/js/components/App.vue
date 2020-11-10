<template>
    <div>
        <CanvasSize />
        <CanvasFont />
        <button @click="saveData">Save</button>
        <div id="editor">
            <div id="editorHeader"></div>
            <div id="editorBody"></div>
            <div id="editorFooter"></div>
        </div>
    </div>
</template>

<script>
    //import Header from '@editorjs/header';
    import Header from '../../plugins/header/index.js';
    import Marker from '@editorjs/marker';
    import Table from '@editorjs/table';
    import Underline from '@editorjs/underline';
    //import SimpleImage from '@editorjs/simple-image';
    import SimpleImage from '../../plugins/simpleImage/index.js';
    import RedTextColor from '../../plugins/redTextColor/index.js';
    import DragDrop from 'editorjs-drag-drop';
    import Paragraph from 'editorjs-paragraph-with-alignment';

    import ColorPlugin from 'editorjs-text-color-plugin';
    import TextAlign from '@canburaks/text-align-editorjs';
    import Strikethrough from '@itech-indrustries/editorjs-strikethrough';

    import CanvasSize from './CanvasSize.vue';
    import CanvasFont from './CanvasFont.vue';
    import EditorJS from '@editorjs/editorjs';
    //import EditorJS from '../../editorjs';

    let editorHeader = new EditorJS({
        readOnly: false,
        /**
         * Create a holder for the Editor and pass its ID
         */
        holder : 'editorHeader',
        autofocus: true,
        fixedTitleBlock: true,
        fixedFooterBlock:true,
        inlineToolbar: ['marker', 'bold', 'italic', 'align'],
        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
        tools: {
            strikethrough: {
                class: Strikethrough
            },
            textAlign: {
                class: TextAlign
            },
            color: {
                class: ColorPlugin,
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
            underline: {
                class: Underline
            },
            image: {
                class: SimpleImage,
                config: {
                }
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
            "time": 1591362820044,
            "blocks": [
                {
                    "type" : "header",
                    "data" : {
                        "text" : "Header",
                        "level" : 2
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : "Ich bin der Header."
                    }
                }
            ],
            "version" : "2.18.0"
        },
        onReady: () => {
            console.log('in header ready');
            new DragDrop(editorHeader);
        },
        onChange: function() {
            console.log('something changed');
        }
    });
    let editorBody = new EditorJS({
        readOnly: false,
        /**
         * Create a holder for the Editor and pass its ID
         */
        holder : 'editorBody',
        autofocus: true,
        fixedTitleBlock: true,
        fixedFooterBlock:true,
        inlineToolbar: ['marker', 'bold', 'italic', 'align'],
        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
        tools: {
            strikethrough: {
                class: Strikethrough
            },
            textAlign: {
                class: TextAlign
            },
            color: {
                class: ColorPlugin,
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
            underline: {
                class: Underline
            },
            image: {
                class: SimpleImage,
                config: {
                }
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
            "time": 1591362820044,
            "blocks": [
                {
                    "type" : "header",
                    "data" : {
                        "text" : "Body",
                        "level" : 2
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : "Ich bin der Body."
                    }
                }
            ],
            "version" : "2.18.0"
        },
        onReady: () => {
            new DragDrop(editorBody);

        },
        onChange: function() {
            console.log('something changed');
        }
    });
    let editorFooter = new EditorJS({
        readOnly: false,
        /**
         * Create a holder for the Editor and pass its ID
         */
        holder : 'editorFooter',
        autofocus: true,
        fixedTitleBlock: true,
        fixedFooterBlock:true,
        inlineToolbar: ['marker', 'bold', 'italic', 'align'],
        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
        tools: {
            strikethrough: {
                class: Strikethrough
            },
            textAlign: {
                class: TextAlign
            },
            color: {
                class: ColorPlugin,
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
            underline: {
                class: Underline
            },
            image: {
                class: SimpleImage,
                config: {
                }
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
            "time": 1591362820044,
            "blocks": [
                {
                    "type" : "header",
                    "data" : {
                        "text" : "Footer",
                        "level" : 2
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : "Ich bin der Footer."
                    }
                }
            ],
            "version" : "2.18.0"
        },
        onReady: () => {
            new DragDrop(editorFooter);
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
            saveData() {
                console.log(editorHeader);
                editorHeader.save()
                    .then((savedData) => {
                        console.log('data');
                        console.log(savedData);
                    })
                    .catch((error) => {
                        console.error('Saving error', error);
                    });
            }
        }
    }
</script>

<style>
    body {
        background-color: hsla(0,0%, 50%,0.2);
    }

    #editor {
        background-color: white;
        margin: 0 auto;
        max-width: 650px;
    }

    /* Editor CSS */
    #editorHeader {
        max-width: 650px;
        margin: 0 auto;
    }
    /* .codex-editor__redactor{display: flex;flex-wrap: wrap;flex-direction: row;} */
    .codex-editor__redactor{}
    /* .ce-block{width: 100%;padding-left: 0;padding-right: 0;} */

    .ce-block {
        width: 100%;
        float: left;
        padding-left: 0;
        padding-right: 0;
    }

    .cdx-settings-input {
        border: 1px solid rgba(201,201,204,.48);
        -webkit-box-shadow: inset 0 1px 2px 0 rgba(35,44,72,.06);
        box-shadow: inset 0 1px 2px 0 rgba(35,44,72,.06);
        border-radius: 3px;
        padding: 3px 8px;
        outline: none;
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .cdx-small {
        font-size: .6rem
    }
    .ce-block__content {
        max-width: 100%
    }

    .cdx-settings-button.disabled,.ce-settings__button.disabled {
        pointer-events: none;
        opacity: .5
    }

    .cdx-settings-sidebar {
        position: absolute;
        left: 100%;bottom:0;
        background: #fff;
        width: 108px;
        height: 145px;
        box-shadow: 0 3px 15px -3px rgba(13,20,33,.13);
        border-radius: 0 4px 4px 0;
        z-index: 0;
    }
    /* Editor CSS - END */
</style>
