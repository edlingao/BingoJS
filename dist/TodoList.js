import { BingoComponent } from "./Bingo.js";

export class TodoList extends BingoComponent {
  constructor() {
    super();
    this.state.todos = [];
    this.addTodo({
      name: 'asd',
      checked: false,
      id: 1
    });
  }

  static get tag() {
    return 'bingo-todo'
  }

  get styleSheet() {
    return `
      li {
        transition: opacity 1s;
      }
      .fading {
        opacity: 0;
      }
    `
  }

  get template() {
    return `
      <div>
        <ul>
          ${this.state.todos && this.state.todos.map(item => `
            <li class="${item.checked ? 'fading' : ''}">
              <label>
                <input type="checkbox" ${item.checked && 'checked'} id="${item.id}"/>
                ${item.name}
              </label>
            </li>`
          ).join('')}
        </ul>
        <button class="add-task">Add</button>
      </div>
    `;
  }

  setEvents(element) {
    element.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', (e) => {
        const target = e.target;
        this.state.todos = this.state.todos.map((todo) => e.target.id == todo.id ? {...todo, checked: e.target.checked} : todo);
        let count = 1;
        // const interval = setInterval(() => {
        //   count -= .1;
        //   if(count <= 0) {
        //     this.state.todos = this.state.todos.filter((todo) => target.id != todo.id );
        //     clearInterval(interval)
        //   }
        // },100)
      })
    })

    element.querySelector('.add-task').addEventListener('click', () => {
      this.addTodo({
        id: Math.random() * 10,
        name: 'hola',
        checked: false,
      })
    })

    return element;
  }

  addTodo(todo) {
    this.state.todos = [...this.state.todos, todo]
  }
}