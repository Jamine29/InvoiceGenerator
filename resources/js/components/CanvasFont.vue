<template>
    <div class="style-select-canvasFont">
        <label for="canvasFont">Choose Canvas Font:</label>
        <select id="canvasFont" v-model="selectedCanvasFont" @change="handleCanvasFont">
            <option v-for="option in canvasFontOptions" v-bind:value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                canvasFontOptions: [
                    {text:'Roboto', value:'Roboto'},
                    {text:'Open Sans', value:'Open Sans'},
                    {text:'Dancing Script', value:'Dancing Script'},
                    {text:'Indie Flower', value:'Indie Flower'},
                ],
                selectedCanvasFont: 'Roboto'
            }
        },
        methods: {
            handleCanvasFont() {
                document.getElementById("editorjs").style.fontFamily = this.selectedCanvasFont;
            }
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,500;1,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

    .style-select-canvasFont {
        margin-left: 20%;
        margin-top: 2%;
    }
</style>
