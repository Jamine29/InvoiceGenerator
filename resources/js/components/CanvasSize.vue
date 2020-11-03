<template>
    <div class="style-select">
        <label for="canvasSize">Choose Canvas Size:</label>
        <select id="canvasSize" v-model="selectedCanvasType" @change="handleCanvasSize">
            <option v-for="option in canvasSizeOptions" v-bind:value="option.value">
                {{ option.text }}
            </option>
        </select>
        <div v-if="selectedCanvasType === 'Custom'">
            <form v-on:submit.prevent="handleCustomCanvasSize" v-on:keydown.13="handleCustomCanvasSize">
                <label for="customHeight">Height:</label>
                <input id="customHeight" type="text" v-model="customSize.height"/>
                <label for="customWidth">Width:</label>
                <input id="customWidth" type="text" v-model="customSize.width"/>
                <button type="submit">Set Size</button>
            </form>
            <div v-if="customErrorMessage.show === true">
                {{ customErrorMessage.text }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                canvasSizes: {
                    a3: {
                        width: 842,
                        height: 1191
                    },
                    a4: {
                        width: 595,
                        height: 842
                    },
                    a5: {
                        width: 420,
                        height: 595
                    }
                },
                canvasSizeOptions: [
                    {text: 'A3', value: 'A3'},
                    {text: 'A4', value: 'A4'},
                    {text: 'A5', value: 'A5'},
                    {text: 'Custom', value: 'Custom'}
                ],
                selectedCanvasType: 'A4',
                customSize: {
                    height: 0,
                    width: 0
                },
                customErrorMessage: {
                    text: 'Only Numbers.',
                    show: false
                },
            }
        },
        methods: {
            handleCanvasSize() {
                switch (this.selectedCanvasType) {
                    case 'A3':
                        this.setCanvasSize(this.canvasSizes.a3.height.toString(), this.canvasSizes.a3.width.toString());
                        break;
                    case 'A4':
                        this.setCanvasSize(this.canvasSizes.a4.height.toString(), this.canvasSizes.a4.width.toString());
                        break;
                    case 'A5':
                        this.setCanvasSize(this.canvasSizes.a5.height.toString(), this.canvasSizes.a5.width.toString());
                }
            },
            handleCustomCanvasSize() {
                if(!isNaN(Number(this.customSize.height)) && !isNaN(Number(this.customSize.width))) {
                    this.setCanvasSize(this.customSize.height.toString(), this.customSize.width.toString());
                    this.customErrorMessage.show = false;
                }
                else {
                    this.customErrorMessage.show = true;
                }
            },
            setCanvasSize(height, width) {
                document.getElementById("vue-editor-js").style.height = height+"px";
                document.getElementById("vue-editor-js").style.width = width+"px";
            }
        }
    }
</script>

<style>
    .style-select {
        margin-left: 20%;
        margin-top: 2%;
    }
</style>
