import { BingoComponent } from './Bingo.js'
import { TodoList } from './TodoList.js';
// web component
class Counter extends BingoComponent {

  constructor() {
    super();
    this.state.example = "Example";
  }

  static get tag() {
    return 'bingo-counter'
  } 
  
  get template() {
    return `
      <div>
        <h1>${this.state.count}</h1>
        <p>${this.state.text}</p>
        <p>${this.state.example}</p>
        <button class="add">Agregar</button>
        <button class="remove">Quitar</button>
        <button class="change-text">Cambiar texto</button>
      </div>
    `;
  }

  setEvents(element) {
    // if(element) {
      element.querySelector('.remove').addEventListener('click', () => this.add(-1))
      element.querySelector('.add').addEventListener('click', () => this.add(1))
      element.querySelector('.change-text').addEventListener('click', () => {
        this.state.text = 'Text changed'
      });
    // }
    return element
  }

  add(num) {
    return this.state.count = parseInt(this.state.count) + num
  }

  // connect component
  connectedCallback() {
    // this.textContent = `Hello ${ this.name }!`;
  }
  
}

// register component
customElements.define( Counter.tag, Counter );
customElements.define( TodoList.tag, TodoList );

// document.querySelector('input').addEventListener('click', (e) => {
//   data.count += 1;
// })