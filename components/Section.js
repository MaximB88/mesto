export class Section {
    constructor({data, renderer}, containerSelector) {
        this._data = data;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems() {
        this._data.forEach(item => this._renderer(item));
    }
    
    addItem(item) {
        this._container.prepend(item);
    }


}