export default class Section{
  constructor({items, rendered}, containerSelector){
    this._items = items;
    this.rendered = rendered;
    this._containerSelector = document.querySelector(containerSelector);

  }

  addItem(item){
    this._containerSelector.prepend(item)
  }

  renderItem(){
    this._items.forEach(item => {
      this.rendered(item)
    });
  }
}