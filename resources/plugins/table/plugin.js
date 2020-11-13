const TableConstructor = require('./tableConstructor').TableConstructor;

const CSS = {
    input: 'tc-table__inp',

    table: 'tc-table',
    inputField: 'tc-table__inp',
    cell: 'tc-table__cell',
    wrapper: 'tc-table__wrap',
    area: 'tc-table__area',
};


/**
 *  Tool for table's creating
 *
 *  @typedef {object} TableData - object with the data transferred to form a table
 *  @property {string[][]} content - two-dimensional array which contains table content
 */
class Table {
    /**
     * Notify core that read-only mode is supported
     *
     * @returns {boolean}
     */
    static get isReadOnlySupported() {
        return true;
    }

    /**
     * Allow to press Enter inside the CodeTool textarea
     *
     * @returns {boolean}
     * @public
     */
    static get enableLineBreaks() {
        return true;
    }

    /**
     * Get Tool toolbox settings
     * icon - Tool icon's SVG
     * title - title to show in toolbox
     *
     * @returns {{icon: string, title: string}}
     */
    static get toolbox() {
        return {
            icon: '<svg width="18" height="14"><path d="M2.833 8v1.95a1.7 1.7 0 0 0 1.7 1.7h3.45V8h-5.15zm0-2h5.15V2.35h-3.45a1.7 1.7 0 0 0-1.7 1.7V6zm12.3 2h-5.15v3.65h3.45a1.7 1.7 0 0 0 1.7-1.7V8zm0-2V4.05a1.7 1.7 0 0 0-1.7-1.7h-3.45V6h5.15zM4.533.1h8.9a3.95 3.95 0 0 1 3.95 3.95v5.9a3.95 3.95 0 0 1-3.95 3.95h-8.9a3.95 3.95 0 0 1-3.95-3.95v-5.9A3.95 3.95 0 0 1 4.533.1z"/></svg>',
            title: 'Table',
        };
    }

    /**
     * Render plugin`s main Element and fill it with saved data
     *
     * @param {TableData} data — previously saved data
     * @param {object} config - user config for Tool
     * @param {object} api - Editor.js API
     * @param {boolean} readOnly - read-only mode flag
     */
    constructor({ data, config, api, readOnly }) {
        /**/
        /** Tool's initial data */
        this.data = {
            position: data.head !== undefined ? data.head.includes('position') : true,
            description: data.head !== undefined  ? data.head.includes('description') : true,
            articleNumber: data.head !== undefined  ? data.head.includes('articleNumber') : true,
            size: data.head !== undefined  ? data.head.includes('size') : false,
            amount: data.head !== undefined  ? data.head.includes('amount') : false,
            price: data.head !== undefined  ? data.head.includes('price') : false,
            valueAddedTax: data.head !== undefined  ? data.head.includes('valueAddedTax') : false,
            discount: data.head !== undefined ? data.head.includes('discount') : false,
            total: data.head !== undefined ? data.head.includes('total') : false,
        };

        let initDataAsArray = Object.entries(this.data);
        let initCols = [];

        for(let p = 0; p < initDataAsArray.length; p++) {
            if(initDataAsArray[p][1]) {
                initCols.push(initDataAsArray[p][0])
            }
        }
        data['head'] = initCols;
        /**/

        this.api = api;
        this.readOnly = readOnly;
        this._tableConstructor = new TableConstructor(data, config, api, readOnly);

        /** Style Buttons */
        this._CSS = {
            settingsButton: this.api.styles.settingsButton,
            settingsButtonActive: this.api.styles.settingsButtonActive,
        };

        /** Available Image settings */
        this.settings = [
            {
                name: 'position',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">position</text></svg>`,
            },
            {
                name: 'description',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">description</text></svg>`,
            },
            {
                name: 'articleNumber',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">articleNumber</text></svg>`,
            },
            {
                name: 'size',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">size</text></svg>`,
            },
            {
                name: 'amount',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">amount</text></svg>`,
            },
            {
                name: 'price',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">price</text></svg>`,
            },
            {
                name: 'valueAddedTax',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">valueAddedTax</text></svg>`,
            },
            {
                name: 'discount',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">discount</text></svg>`,
            },
            {
                name: 'total',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">total</text></svg>`,
            }
        ];
    }

    /**
     * Makes buttons with tunes: add background, add border, stretch image
     *
     * @returns {HTMLDivElement}
     */
    renderSettings() {
        const wrapper = document.createElement('div');

        this.settings.forEach(tune => {
            const el = document.createElement('div');

            el.classList.add(this._CSS.settingsButton);
            el.innerHTML = tune.icon;

            el.addEventListener('click', () => {
                this._toggleTune(tune.name, el);
                el.classList.toggle(this._CSS.settingsButtonActive);
            });

            el.classList.toggle(this._CSS.settingsButtonActive, this.data[tune.name]);

            wrapper.appendChild(el);
        });

        return wrapper;
    };

    /**
     * Click on the Settings Button
     *
     * @private
     * @param tune
     */
    _toggleTune(tune, el) {
        let oldTuneValue = this.data[tune];

        this.data[tune] = !this.data[tune];

        if(this.data[tune]) {
            // user wants to remove column
            this.handleAddTableColumn(tune);
        }
        else {
            // user wants to remove column
            this.handleRemoveTableColumn(tune);
        }
    }

    handleAddTableColumn(tune) {
        const tdElements = document.querySelectorAll("[data-colName='" + tune + "']");

        let dataAsArray = Object.entries(this.data);
        let currentCols = [];
        let indexNewElement = null;

        for(let k = 0; k < dataAsArray.length; k++) {
            if(tune === dataAsArray[k][0]) {
                indexNewElement = k;
            }
            if(dataAsArray[k][1] && tune !== dataAsArray[k][0]) {
                currentCols.push([dataAsArray[k][0], dataAsArray[k][1], k])
            }
        }

        let before = null;
        let after = null;

        let afterNodeIndex = null;

        for(let m = 0; m < currentCols.length; m++) {
            let currentCol = currentCols[m];

            if(currentCols[m][2] < indexNewElement) {
                before = currentCols[m][2];
            }

            if(currentCols[m][2] > indexNewElement && after === null) {
                after = currentCols[m][2];
                afterNodeIndex = m;
            }
        }

        //td
        let cell = document.createElement('td');
        cell.classList.add(CSS.cell);
        cell.setAttribute('data-colName', dataAsArray[indexNewElement][0]);

        //div area
        let area = document.createElement("div");
        area.classList.add(CSS.area);

        //div input
        let inputField = document.createElement("div");
        inputField.classList.add(CSS.inputField);
        inputField.innerHTML = dataAsArray[indexNewElement][0];

        cell.appendChild(area);
        area.appendChild(inputField);

        // append child
        if(after === null) {
            /* append at the end */
            this._tableConstructor._table._table.tHead.childNodes[0].appendChild(cell);
        }
        else if(after !== null) {
            /* append before after sibling */
            this._tableConstructor._table._table.tHead.childNodes[0].insertBefore(cell, this._tableConstructor._table._table.tHead.childNodes[0].childNodes[afterNodeIndex]);
        }
    }

    handleRemoveTableColumn(tune) {
        const tdElements = document.querySelectorAll("[data-colName='" + tune + "']");

        for(let r = 0; r < tdElements.length; r++) {
            tdElements[r].remove();
        }

        // if no columns destroy table
        const allTdElements = document.querySelectorAll("[data-colName]");
        if(allTdElements.length === 0) {
            this.api.blocks.delete();
        }
    }
    /** End */

    /**
     * Return Tool's view
     *
     * @returns {HTMLDivElement}
     * @public
     */
    render() {
        return this._tableConstructor.htmlElement;
    }

    /**
     * Extract Tool's data from the view
     *
     * @param {HTMLElement} toolsContent - Tool HTML element
     *
     * @returns {TableData} - saved data
     */
    save(toolsContent) {
        const table = toolsContent.querySelector('table');
        const data = [];
        const rows = table.tBodies[0].rows;

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const cols = Array.from(row.cells);
            const inputs = cols.map(cell => cell.querySelector('.' + CSS.input));

            /*
             - dont save empty lines
             - Array.every() => returns true when all items in the array pass the test with true
             */
            const isWorthless = inputs.every(this._isEmpty);

            if (isWorthless) {
                continue;
            }
            // end dont save empty lines

            data.push(inputs.map(input => input.innerHTML));
        }

        /**/
        let tableHeadRows = table.tHead.rows;

        let tableHeadData = [];

        for (let col in this.data) {
            if(this.data[col]) {
                console.log(data[col]);
                //tableHeadData[col] = this.data[col];
                tableHeadData.push(col);
            }
        }

        //tableHeadData.push(this.data.map(tune => [tune.name, tune.value]));

        /*
        for (let i = 0; i < tableHeadRows.length; i++) {
            const tableHeadRow = tableHeadRows[i];
            const cols = Array.from(tableHeadRow.cells);
            const inputs = cols.map(cell => cell.querySelector('.' + CSS.input));
            const isWorthless = inputs.every(this._isEmpty);
            if (isWorthless) {
                continue;
            }
            // end dont save empty lines
            tableHeadData.push(inputs.map(input => input.innerHTML));
        }
        */

        /**/
        return {
            head: tableHeadData,
            content: data,
        };
    }

    /**
     * @private
     * @param {HTMLElement} input - input field
     * @returns {boolean}
     */
    _isEmpty(input) {
        return !input.textContent.trim();
    }
}

module.exports = Table;
