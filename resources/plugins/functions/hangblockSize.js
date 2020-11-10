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
    }
}

export default handleBlockSize;
