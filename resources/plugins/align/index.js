require('./index.css').toString();

class Align {

    static get isInline() {
        return true;
    }

    static get CSS() {
        return 'cdx-align';
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

        this.tag = 'Align';
        this.class = 'cdx-align';
    }

    render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.textContent = 'A';

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
        const align = document.createElement(this.tag);

        align.classList.add(this.class);
        align.appendChild(selectedText);
        range.insertNode(align);

        this.api.selection.expandToTag(align);
    }

    unwrap(range) {
        const align = this.api.selection.findParentTag(this.tag, this.class);
        const text = range.extractContents();

        align.remove();

        range.insertNode(text);
    }


    checkState() {
        const align = this.api.selection.findParentTag(this.tag);

        this.state = !!align;
    }
}

module.exports = Align;
