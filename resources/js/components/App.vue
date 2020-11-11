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
                        "level" : 2,
                        "colWidth": 4
                    }
                },
                {
                    "type" : "image",
                    "data" : {
                        "center": false,
                        "colWidth": 4,
                        "end": false,
                        "large": false,
                        "medium": false,
                        "small": true,
                        "start": true,
                        "stretched": false,
                        "url": "data:image/jpeg;base64,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",
                        "withBackground": false,
                        "withBorder": false,
                    }
                },
                {
                    "type" : "header",
                    "data" : {
                        "text" : "Header",
                        "level" : 2,
                        "colWidth": 4
                    }
                },
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
