class TabItem {
  constructor(element) {
    this.element = element;
  }

  select() {
    this.element.classList.add('Tabs__item--selected');
  }

  deselect() {
    this.element.classList.remove('Tabs__item--selected');
  }
}

class TabLink {
  constructor(element) {
    this.element = element;

    this.element.addEventListener('click', (event) => {
      event.tabData = this.element.dataset.tab;
    });
  };

  select() {
    this.element.classList.add('Tabs__link--selected');
  }

  deselect() {
    this.element.classList.remove('Tabs__link--selected');
  }
}

class Tabs {
  constructor(element) {
    this.element = element;
    
    this.links = element.querySelectorAll('.Tabs__link');
    this.links = Array.from(this.links).reduce((obj, link) => {
      obj[link.dataset.tab] = new TabLink(link);
      return obj;
    }, {});
    

    this.items = document.querySelectorAll('.Tabs__item');
      this.items = Array.from(this.items).reduce((obj, item) => {
      obj[item.dataset.tab] = new TabItem(item);
      return obj;
    }, {});

   
    this.element.addEventListener('click', (event) => {
      if (event.tabData) {
        this.updateActive(event.tabData);
        event.stopPropagation();
      }
    });

    this.activeData = element.querySelector('.Tabs__default');
    this.activeData = this.activeData ? this.activeData.dataset.tab : null;
    this.updateActive(this.activeData);


  }

  updateActive(data) {
    if (data === null) return;
    if (this.activeData) {
      
      this.links[this.activeData].deselect();
      this.items[this.activeData].deselect();
    }

    this.links[data].select();
    this.items[data].select();
    this.activedata = data;
  }

  
}

let tabs = document.querySelectorAll('.Tabs');
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
