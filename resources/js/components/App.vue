<template>
    <div>
        <CanvasSize />
        <CanvasFont />
        <button @click="saveData">Save</button>
        <div id="editorjs"></div>
    </div>
</template>

<script>
    // haben Bugs
    import TextAlign from '@canburaks/text-align-editorjs';
    import RedTextColor from '../../plugins/redTextColor/index.js';
    import ColorPlugin from 'editorjs-text-color-plugin';
    //

    import Strikethrough from '@itech-indrustries/editorjs-strikethrough';
    import Header from '../../plugins/header/index.js';
    import Paragraph from '../../plugins/paragraph/index.js';
    import Table from '../../plugins/table/plugin.js';
    import Underline from '@editorjs/underline';
    import SimpleImage from '../../plugins/simpleImage/index.js';
    import DragDrop from 'editorjs-drag-drop';
    import Undo from 'editorjs-undo';
    import CanvasSize from './CanvasSize.vue';
    import CanvasFont from './CanvasFont.vue';
    import EditorJS from '@editorjs/editorjs';

    let customer = {
        personalData: {
            firstname: 'Lisa',
            lastname: 'Schmidt',
            address: {
                street: 'Kurt-Schumacher-Platz 9',
                postCode: '13403 Berlin'

            },
            number: '12345678'
        },
        invoiceData: {
            orderNumber: '102030',
            invoiceNumber: '87654321',
            data: '11.11.2020'
        },
    }

    let content = {
        title: "Rechnung",
        firstParagraph: "Hallo " + customer.personalData.firstname + ",",
        secondParagraph: "viel Freude mit deiner Bestellung!",
        thirdParagraph: "Dein Nike Team",
        tableOrders: {
            head: ["position", "articleNumber", "description"],
            content: [
                /*
                ["1", "4057318179535", "Air Force 1 '07"],
                ["2", "4057318179536", "Tech Fleece"],
                ["3", "4057318179537", "Rundhalsshirt mit Swoosh"],
                ["4", "4057318179538", "Winter-Hoodie mit Halbreißverschluss"],
                */
            ]
        },
        invoiceData: {
            billingAddress: '<b>Rechnungsadresse:</b>' +
                            '<br>' + customer.personalData.firstname + " " + customer.personalData.lastname +
                            '<br>' + customer.personalData.address.street +
                            '<br>' + customer.personalData.address.postCode,
            deliveryAddress:'<b>Lieferadresse:</b>' +
                            '<br>' + customer.personalData.firstname + " " + customer.personalData.lastname +
                            '<br>' + customer.personalData.address.street +
                            '<br>' + customer.personalData.address.postCode,
            customerData:   '<b>Kundendaten:</b>' +
                            '<br>' + 'Rechnungsnr.:' +
                            '<br>' + 'Auftragsnr.:' +
                            '<br>' + 'Kundennr.:' +
                            '<br>' + 'Datum:',
            customerDataInput:   '<b> </b>' +
                            '<br>' + customer.invoiceData.invoiceNumber +
                            '<br>' + customer.invoiceData.orderNumber +
                            '<br>' + customer.personalData.number +
                            '<br>' + customer.invoiceData.data,
            footertext: '<b>Persönlich Haftende Gesellschafterin:</b> Nike Bernd Freier SARL, 73, Rud L-130 Luxenburg' +
                        '<br>' + 'Geschaftsführer: Claus Hans Dach(Vorsitzender), Mathias Rohe,  Marie Salt' +
                        '<br>' + 'Sitz: Nike Straße 1, D97228 Rotterdam - AG Würzburg - Ust-Id Nr: DE 811-123 234'
        }
    }

    let editor = new EditorJS({
        readOnly: false,
        holder: 'editorjs',
        autofocus: true,
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
        data: {
            "time": 1591362820044,
            "blocks": [
                {
                    "type": "image",
                    "data": {
                        "center": true,
                        "colWidth": 12,
                        "end": false,
                        "large": false,
                        "medium": true,
                        "small": false,
                        "start": false,
                        "stretched": false,
                        "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiYAAAImCAMAAABQELF0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAQmaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpDb21wcmVzc2lvbj41PC90aWZmOkNvbXByZXNzaW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzI8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj41NTA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjU1MDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxk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",
                        "withBackground": false,
                        "withBorder": false,
                    }
                },
                {
                    "type" : "header",
                    "data" : {
                        "text" : content.title,
                        "colWidth": 12,
                        alignment: "left"
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : content.invoiceData.billingAddress,
                        "colWidth": 4,
                        alignment: "left"
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : content.invoiceData.deliveryAddress,
                        "colWidth": 4,
                        alignment: "left"
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : content.invoiceData.customerData,
                        "colWidth": 2,
                        alignment: "left"
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : content.invoiceData.customerDataInput,
                        "colWidth": 2,
                        alignment: "left"
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : content.firstParagraph,
                        "colWidth": 12,
                        alignment: "left"
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : content.secondParagraph,
                        "colWidth": 12,
                        alignment: "left"
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : content.thirdParagraph,
                        "colWidth": 12,
                        alignment: "left"
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : "",
                        "colWidth": 12,
                        alignment: "left"
                    }
                },
                {
                    "type" : "table",
                    "data" : content.tableOrders
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : content.invoiceData.footertext,
                        "colWidth": 12,
                        alignment: "center"
                    }
                },
            ],
            "version" : "2.18.0"
        },
        onReady: () => {
            console.log('in header ready');
            new DragDrop(editor);
            new Undo({ editor });
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
                console.log(editor);
                editor.save()
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
    @media (min-width: 651px) {
        .codex-editor--narrow .codex-editor__redactor {
            margin-right: 0px;
        }
    }

    .ce-toolbar {
        /*transform: translate3d(31px, 452px, 0px) !important;*/
    }

    @media (min-width: 651px) {
        .codex-editor--narrow .ce-block--focused {
            margin-right: -50px;
            padding-right: 0px !important;
        }
    }

    @media (min-width: 651px) {
        .codex-editor--narrow .ce-toolbar__actions {
            right: -32px;
        }
    }

    #editorjs {
        height: 842px;
        padding: 0 20px;
        overflow-y: scroll;
    }
    body {
        background-color: hsla(0,0%, 50%,0.2);
    }
    #editorjs {
        background-color: white;
        margin: 0 auto;
        width: 595px;
        margin-bottom: 100px;
    }

    /* Editor CSS */
    #editorHeader {
        max-width: 650px;
        margin: 0 auto;
    }
    .codex-editor__redactor{}
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
