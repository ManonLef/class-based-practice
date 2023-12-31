import { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = { count: props.amount };
  }

  render() {
    return <div>counter: {this.state.count}</div>;
  }
}

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { name: "test 1", id: crypto.randomUUID(), editing: false },
        { name: "test 2", id: crypto.randomUUID(), editing: true },
        { name: "test 3", id: crypto.randomUUID(), editing: false },
        { name: "test 4", id: crypto.randomUUID(), editing: false },
      ],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  handleEdit(key) {
    event.preventDefault();
    const taskIndex = this.state.todos.findIndex((x) => x.id === key);
    const newTodos = [...this.state.todos];
    newTodos[taskIndex].editing = !newTodos[taskIndex].editing;
    this.setState(() => ({
      todos: newTodos,
    }));
  }

  editTask(key, e) {
    const taskIndex = this.state.todos.findIndex((x) => x.id === key);
    const newTodos = [...this.state.todos];
    newTodos[taskIndex].name = e.target.value;
    this.setState(() => ({
      todos: newTodos,
    }));
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat({
        name: state.inputVal,
        id: crypto.randomUUID(),
        editing: false,
      }),
      inputVal: "",
    }));
  }

  handleRemove(key) {
    const newTodos = this.state.todos.filter((todo) => todo.id !== key);
    this.setState(() => ({
      todos: newTodos,
    }));
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <Counter key={this.state.todos} amount={this.state.todos.length} />
        <ul>
          {this.state.todos.map((todo) =>
            todo.editing ? (
              <li key={todo.id}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.handleEdit(todo.id);
                  }}>
                  <label htmlFor="task-edit"></label>
                  <input
                    type="text"
                    name="task-edit"
                    value={todo.name}
                    onChange={(e) => this.editTask(todo.id, e)}
                  />
                  <button onClick={() => this.handleEdit(todo.id)}>edit</button>
                </form>
              </li>
            ) : (
              <li key={todo.id}>
                {todo.name}{" "}
                <button onClick={() => this.handleRemove(todo.id)}>
                  delete
                </button>
                <button onClick={() => this.handleEdit(todo.id)}>edit</button>
              </li>
            )
          )}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
