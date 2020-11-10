const handleBlockSize = {
    handleColWidth: (tune, colWidth) => {
        if(colWidth <= 12 && colWidth >= 2 && tune === 'shrink') {
            return colWidth - 1;
        }

        else if(colWidth <= 11 && colWidth >= 1 && tune === 'enlarge') {
            return colWidth + 1;
        }
        else {
            return colWidth;
        }
    },
    handleColClass: (classes, colWidth) => {
        for(let i = 0; classes.length>i; i++) {
            if(classes[i].includes("es-col-")) {
                classes.remove(classes[i]);
                break;
            }
        }
        classes.add('es-col-' + colWidth);
    },
    handleColSettings: {
        enlarge: {
            name: 'enlarge',
            icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">en</text></svg>`,
        },
        shrink: {
            name: 'shrink',
            icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">sh</text></svg>`,
        }
    }
}

export default handleBlockSize;
