export class BingoComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.state = new Proxy({}, {
      get:(target, property, reciver) => {
        return target[property];
      },
      set: (target, property, newValue, reciver) => {
        target[property] = newValue;
        this.render();
        return target[property];
    }});
    [...this.attributes].forEach( ({name, value}) => {
      this.state[name] = value;
    })

    const styles = document.createElement('style');
    styles.innerHTML = this.styleSheet;
    this.shadow.appendChild(styles);
    this.shadow.appendChild(this.element);
    this.render()
  }

  static get tag() {
    return ''
  }
  get styleSheet() {
    return '';
  }
  get template() {
    return null
  }

  get element() {
    const element = this.createElement();
    return element ? this.setEvents(element) : element;
  }

  createElement() {
    const div = document.createElement('div')
    div.innerHTML = this.template;
    return  div.firstElementChild;
  }

  render() {
    const newElement = this.element;

    if(this.shadow.childNodes[1]) {
      this.shadow.childNodes[1].childNodes.forEach((shadowNode, i) => {
        newElement.childNodes.forEach(node => {
          if(this.sameTypeAndNoText(node, shadowNode) && this.newNodeIsRecent(node, shadowNode)) {
            shadowNode.replaceWith(node);
          }
        })
      })
    }
  }

  sameTypeAndNoText(node, shadowNode) {
    return node.nodeName === shadowNode.nodeName && (node.nodeName != '#text')
  }

  newNodeIsRecent(node, shadowNode) {
    console.log( 'New node', node.innerHTML, 'Shadow', shadowNode.innerHTML)
    return shadowNode == null ? true : node.innerHTML != shadowNode.innerHTML;
  }

  setEvents(element) {
    return element
  }
}