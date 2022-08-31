export default class Section{
  constructor({rendered}, containerSelector){
    // this._items = items;
    this.rendered = rendered;
    this._containerSelector = document.querySelector(containerSelector);

  }

  addItem(item){
    this._containerSelector.prepend(item)
  }

  renderItem(items){
    
    items.forEach(item => {
      this.rendered(item)
    });
  }


}
