/**
 * Build styles
 */
require('./index.css').toString();

const handleBlockSize  = require('../functions/hangblockSize');

/**
 * SimpleImage Tool for the Editor.js
 * Works only with pasted image URLs and requires no server-side uploader.
 *
 * @typedef {object} SimpleImageData
 * @description Tool's input and output data format
 * @property {string} url — image URL
 * @property {string} caption — image caption
 * @property {boolean} withBorder - should image be rendered with border
 * @property {boolean} withBackground - should image be rendered with background
 * @property {boolean} stretched - should image be stretched to full width of container
 */
class SimpleImage {
    /**
     * Render plugin`s main Element and fill it with saved data
     *
     * @param {{data: SimpleImageData, config: object, api: object}}
     *   data — previously saved data
     *   config - user config for Tool
     *   api - Editor.js API
     *   readOnly - read-only mode flag
     */
    constructor({ data, config, api, readOnly }) {
        /**
         * Editor.js API
         */
        this.api = api;
        this.readOnly = readOnly;

        this.wrapper = undefined;

        /**
         * When block is only constructing,
         * current block points to previous block.
         * So real block index will be +1 after rendering
         *
         * @todo place it at the `rendered` event hook to get real block index without +1;
         * @type {number}
         */
        this.blockIndex = this.api.blocks.getCurrentBlockIndex() + 1;

        /**
         * Styles
         */
        this.CSS = {
            baseClass: this.api.styles.block,
            loading: this.api.styles.loader,
            input: this.api.styles.input,
            settingsButton: this.api.styles.settingsButton,
            settingsButtonActive: this.api.styles.settingsButtonActive,

            /**
             * Tool's classes
             */
            wrapper: 'cdx-simple-image',
            imageHolder: 'cdx-simple-image__picture',
        };

        /**
         * Nodes cache
         */
        this.nodes = {
            wrapper: null,
            imageHolder: null,
            image: null,
        };

        /**
         * Tool's initial data
         */
        this.data = {
            url: data.url || '',
            withBorder: data.withBorder !== undefined ? data.withBorder : false,
            withBackground: data.withBackground !== undefined ? data.withBackground : false,
            stretched: data.stretched !== undefined ? data.stretched : false,
            small: data.small !== undefined ? data.small : true,
            medium: data.medium !== undefined ? data.medium : false,
            large: data.large !== undefined ? data.large : false,
            start: data.start !== undefined ? data.start : true,
            center: data.center !== undefined ? data.center : false,
            end: data.end !== undefined ? data.end : false,
            colWidth: data.colWidth !== undefined ? data.colWidth : 12,
        };

        /**
         * Available Image settings
         */
        this.settings = [
            {
                name: 'small',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">sm</text></svg>`,
            },
            {
                name: 'medium',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">md</text></svg>`,
            },
            {
                name: 'large',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">lg</text></svg>`,
            },
            {
                name: 'start',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">st</text></svg>`,
            },
            {
                name: 'center',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">ce</text></svg>`,
            },
            {
                name: 'end',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">en</text></svg>`,
            },
            {
                name: 'enlarge',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">en</text></svg>`,
            },
            {
                name: 'shrink',
                icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><text x="0" y="10">sh</text></svg>`,
            },
        ];
    }

    /**
     * Creates a Block:
     *  1) Show preloader
     *  2) Start to load an image
     *  3) After loading, append image and caption input
     *
     * @public
     */
    render() {
        const wrapper = this._make('div', [this.CSS.baseClass, this.CSS.wrapper]),
            loader = this._make('div', this.CSS.loading),
            imageHolder = this._make('div', this.CSS.imageHolder),
            image = this._make('img');

        wrapper.appendChild(loader);

        if (this.data.url) {
            image.src = this.data.url;
        }

        image.onload = () => {
            wrapper.classList.remove(this.CSS.loading);
            imageHolder.appendChild(image);
            wrapper.appendChild(imageHolder);
            loader.remove();
            console.log('onload');
            this._acceptTuneView();
        };

        image.onerror = (e) => {
            // @todo use api.Notifies.show() to show error notification
            console.log('Failed to load an image', e);
        };

        this.nodes.imageHolder = imageHolder;
        this.nodes.wrapper = wrapper;
        this.nodes.image = image;

        return wrapper;
    }

    /**
     * @public
     * @param {Element} blockContent - Tool's wrapper
     * @returns {SimpleImageData}
     */
    save(blockContent) {
        const image = blockContent.querySelector('img');

        if (!image) {
            return this.data;
        }

        return Object.assign(this.data, {
            url: image.src,
        });
    }

    validate(savedData) {
        if(!savedData.url.trim()) {
            return false;
        }
        return true;
    }

    /*
    static get toolbox() {
        return {
            title: 'Image',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }
     */

    /**
     * Sanitizer rules
     */
    static get sanitize() {
        return {
            url: {},
            withBorder: {},
            withBackground: {},
            stretched: {},
            small: {},
            medium: {},
            large: {},
            start: {},
            center: {},
            end: {},
            colWidth: {}
        };
    }

    /**
     * Notify core that read-only mode is suppoorted
     *
     * @returns {boolean}
     */
    static get isReadOnlySupported() {
        return true;
    }

    /**
     * Read pasted image and convert it to base64
     *
     * @static
     * @param {File} file
     * @returns {Promise<SimpleImageData>}
     */
    onDropHandler(file) {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        return new Promise(resolve => {
            reader.onload = (event) => {
                resolve({
                    url: event.target.result,
                });
            };
        });
    }

    /**
     * On paste callback that is fired from Editor.
     *
     * @param {PasteEvent} event - event with pasted config
     */
    onPaste(event) {
        switch (event.type) {
            case 'tag': {
                const img = event.detail.data;

                this.data = {
                    url: img.src,
                };
                break;
            }

            case 'pattern': {
                const { data: text } = event.detail;

                this.data = {
                    url: text,
                };
                break;
            }

            case 'file': {
                const { file } = event.detail;

                this.onDropHandler(file)
                    .then(data => {
                        this.data = data;
                    });

                break;
            }
        }
    }

    /**
     * Returns image data
     *
     * @returns {SimpleImageData}
     */
    get data() {
        return this._data;
    }

    /**
     * Set image data and update the view
     *
     * @param {SimpleImageData} data
     */
    set data(data) {
        this._data = Object.assign({}, this.data, data);

        if (this.nodes.image) {
            this.nodes.image.src = this.data.url;
        }
    }

    /**
     * Specify paste substitutes
     *
     * @see {@link ../../../docs/tools.md#paste-handling}
     * @public
     */
    static get pasteConfig() {
        return {
            patterns: {
                image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i,
            },
            tags: [ 'img' ],
            files: {
                mimeTypes: [ 'image/*' ],
            },
        };
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

            el.classList.add(this.CSS.settingsButton);
            el.innerHTML = tune.icon;

            el.addEventListener('click', () => {
                this._toggleTune(tune.name, el);
                el.classList.toggle(this.CSS.settingsButtonActive);
            });

            el.classList.toggle(this.CSS.settingsButtonActive, this.data[tune.name]);

            wrapper.appendChild(el);
        });

        return wrapper;
    };

    /**
     * Helper for making Elements with attributes
     *
     * @param  {string} tagName           - new Element tag name
     * @param  {Array|string} classNames  - list or name of CSS classname(s)
     * @param  {object} attributes        - any attributes
     * @returns {Element}
     */
    _make(tagName, classNames = null, attributes = {}) {
        const el = document.createElement(tagName);

        if (Array.isArray(classNames)) {
            el.classList.add(...classNames);
        } else if (classNames) {
            el.classList.add(classNames);
        }

        for (const attrName in attributes) {
            el[attrName] = attributes[attrName];
        }

        return el;
    }

    /**
     * Click on the Settings Button
     *
     * @private
     * @param tune
     */
    _toggleTune(tune, el) {
        this.data[tune] = !this.data[tune];
        if(tune === "small" || tune === "medium" || tune === "large") {
            console.log('size')
            this.handleImageSize(tune, el);
        }
        if(tune === "start" || tune === "center" || tune === "end") {
            console.log('align')
            this.handleImageAlign(tune, el);
        }
        if(tune === "enlarge" || tune === "shrink") {
            console.log('colwidth')
            this.data['colWidth'] = handleBlockSize.default.handleColWidth(tune, this.data['colWidth']);
        }

        this._acceptTuneView();
    }

    handleImageSize(tune, el) {
        const nodes = el.parentElement.childNodes;
        const small = nodes[0];
        const medium = nodes[1];
        const large = nodes[2];

        if(tune === 'small') {
            medium.classList.remove(this.CSS.settingsButtonActive);
            large.classList.remove(this.CSS.settingsButtonActive);
            this.data['medium'] = false;
            this.data['large'] = false;
        }
        else if(tune === 'medium') {
            small.classList.remove(this.CSS.settingsButtonActive);
            large.classList.remove(this.CSS.settingsButtonActive);
            this.data['small'] = false;
            this.data['large'] = false;
        }
        else if(tune === 'large') {
            small.classList.remove(this.CSS.settingsButtonActive);
            medium.classList.remove(this.CSS.settingsButtonActive);
            this.data['small'] = false;
            this.data['medium'] = false;
        }

        if(this.data['small'] === false && this.data['medium'] === false && this.data['large'] === false) {
            this.data['small'] = true;
            small.classList.toggle(this.CSS.settingsButtonActive);
        }
    }

    handleImageAlign(tune, el) {
        const nodes = el.parentElement.childNodes;
        const start = nodes[3];
        const center = nodes[4];
        const end = nodes[5];

        if(tune === 'start') {
            center.classList.remove(this.CSS.settingsButtonActive);
            end.classList.remove(this.CSS.settingsButtonActive);
            this.data['center'] = false;
            this.data['end'] = false;
        }
        else if(tune === 'center') {
            start.classList.remove(this.CSS.settingsButtonActive);
            end.classList.remove(this.CSS.settingsButtonActive);
            this.data['start'] = false;
            this.data['end'] = false;
        }
        else if(tune === 'end') {
            start.classList.remove(this.CSS.settingsButtonActive);
            center.classList.remove(this.CSS.settingsButtonActive);
            this.data['start'] = false;
            this.data['center'] = false;
        }

        if(this.data['start'] === false && this.data['center'] === false && this.data['end'] === false) {
            this.data['start'] = true;
            start.classList.toggle(this.CSS.settingsButtonActive);
        }
    }

    /**
     * Add specified class corresponds with activated tunes
     *
     * @private
     */
    _acceptTuneView() {
        this.settings.forEach(tune => {
            if (tune.name === 'shrink' || tune.name === 'enlarge') {
                handleBlockSize.default.handleColClass(this.nodes.wrapper.parentNode.parentNode.classList, this.data['colWidth']);
            }
            else {
                this.nodes.imageHolder.classList.toggle(this.CSS.imageHolder + '--' + tune.name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`), !!this.data[tune.name]);
            }
        });
    }
}

module.exports = SimpleImage;
