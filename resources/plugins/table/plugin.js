const TableConstructor = require('./tableConstructor').TableConstructor;

const CSS = {
  input: 'tc-table__inp',
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
    this.api = api;
    this.readOnly = readOnly;
    this._tableConstructor = new TableConstructor(data, config, api, readOnly);

    /** Style Buttons */
    this._CSS = {
        settingsButton: this.api.styles.settingsButton,
        settingsButtonActive: this.api.styles.settingsButtonActive,
    };

    console.log('ihsdja')
    console.log(data);

    /** Tool's initial data */
    this.data = {
        position: data.head.position !== undefined ? data.head.position : false,
        description: data.head.description !== undefined ? data.head.description : false,
        articleNumber: data.head.articleNumber !== undefined ? data.head.articleNumber : false,
        size: data.head.size !== undefined ? data.head.size : true,
        amount: data.head.amount !== undefined ? data.head.amount : false,
        price: data.head.price !== undefined ? data.head.price : false,
        valueAddedTax: data.head.valueAddedTax !== undefined ? data.head.valueAddedTax : true,
        discount: data.head.discount !== undefined ? data.head.discount : false,
        total: data.head.total !== undefined ? data.head.total : false,
    };

    /** */
    console.log('pl data');
    console.log(this.data);

    /**/

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

  /** Start */
      updated() {
          console.log('updated');
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
                console.log('click');
                console.log(this);
                console.log(tune.name);
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
        console.log('in toogleTune');

        let oldTuneValue = this.data[tune];
        console.log('old va')
        console.log(oldTuneValue)

        this.data[tune] = !this.data[tune];
        console.log('new va')
        console.log(this.data[tune])

        console.log('this._tableConstructor.htmlElement');
        console.log(this._tableConstructor.htmlElement);

        console.log('tbody');
        console.log(this._tableConstructor.htmlElement.childNodes[0].childNodes[0].rows[0]);

        console.log('tbody1');
        //console.log(this._tableConstructor.htmlElement.childNodes);

        console.log('tbody');
        //console.log(this._tableConstructor.htmlElement.childNodes[0].childNodes[0].childNodes);

        if(this.data[tune]) {
            // user wants to remove column
            console.log('add column')
            this.handleAddTableColumn();
        }
        else {
            // user wants to remove column
            console.log('remove column')
            this.handleRemoveTableColumn();
        }
    }

    handleAddTableColumn() {
        console.log('in handleAddColumn');
    }

    handleRemoveTableColumn() {
        console.log('remove table');


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
      console.log(table.tHead.rows);
      let tableHeadRows = table.tHead.rows;
      console.log('row')
      console.log(tableHeadRows)

      let tableHeadData = [];

      console.log('datae')
      console.log(this.data)
      for (let col in this.data) {
          if(this.data[col]) {
              console.log(data[col]);
              //tableHeadData[col] = this.data[col];
              tableHeadData.push(col);
          }
      }

      //tableHeadData.push(this.data.map(tune => [tune.name, tune.value]));

      console.log(tableHeadData);
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
        head: this.data,
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
