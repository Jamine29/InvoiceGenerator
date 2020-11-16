require('./index.css').toString();

class RedTextColor {

    static get isInline() {
        return true;
    }

    static get CSS() {
        return 'cdx-redTextColor';
    };

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;

        this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
    }

    constructor({api}) {
        this.api = api;
        this.button = null;
        this._state = false;

        this.tag = 'RedTextColor';
        this.class = 'cdx-redTextColor';
    }

    render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.textContent = 'RedText';

        return this.button;
    }

    surround(range) {
        if (this.state) {
            this.unwrap(range);
            return;
        }

        this.wrap(range);
    }

    wrap(range) {
        const selectedText = range.extractContents();
        const redTextColor = document.createElement(this.tag);

        redTextColor.classList.add(this.class);
        redTextColor.appendChild(selectedText);
        range.insertNode(redTextColor);

        this.api.selection.expandToTag(redTextColor);
    }

    unwrap(range) {
        const redTextColor = this.api.selection.findParentTag(this.tag, this.class);
        const text = range.extractContents();

        redTextColor.remove();

        range.insertNode(text);
    }


    checkState() {
        const redTextColor = this.api.selection.findParentTag(this.tag);

        this.state = !!redTextColor;
    }
}

module.exports = RedTextColor;
