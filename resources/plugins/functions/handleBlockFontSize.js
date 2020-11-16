const handleBlockFontSize = {
    handleFontSize: (tune, fontSize) => {
        if(fontSize <= 24 && fontSize >= 9 && tune === 'shrinkFont') {
            return fontSize - 1;
        }

        else if(fontSize <= 15 && fontSize >= 8 && tune === 'increaseFont') {
            return fontSize + 1;
        }
        else {
            return fontSize;
        }
    },
    handleFontSizeClass: (classes, fontSize) => {
        for(let i = 0; classes.length>i; i++) {
            if(classes[i].includes("font-size-")) {
                classes.remove(classes[i]);
                break;
            }
        }
        classes.add('font-size-' + fontSize);
    },
    handleFontSizeSettings: {
        increaseFont: {
            name: 'increaseFont',
            icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">IF</text></svg>`,
        },
        shrinkFont: {
            name: 'shrinkFont',
            icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">SF</text></svg>`,
        }
    }
}

export default handleBlockFontSize;
