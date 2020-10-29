<template>
    <div>
        <p>Rechnungsgenerator</p>
        <editor ref="editor" :config="config" :initialized="onInitialized" />
    </div>
</template>

<script>
    import Header from '@editorjs/header';
    import SimpleImage from '@editorjs/simple-image';
    import Marker from '@editorjs/marker';
    import Table from '@editorjs/table';
    import Underline from '@editorjs/underline';

    export default {
        data() {
            return {
                config: {
                    tools: {
                        header: {
                            class: Header,
                            config: {
                                placeholder: 'Enter a header',
                                levels: [2, 3, 4],
                                defaultLevel: 3
                            }
                        },
                        image: {
                            class: SimpleImage,
                            config: {
                            }
                        },
                        table: {
                            class: Table,
                            inlineToolbar: true,
                            config: {
                                rows: 2,
                                cols: 3,
                            },
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
                            }
                        ],
                        "version" : "2.18.0"
                    }
                }
            }
        },
        methods: {
            onInitialized (editor) {
                console.log(editor)
            }
        }
    }
</script>
