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
        { name: "test 1", id: crypto.randomUUID() },
        { name: "test 2", id: crypto.randomUUID() },
        { name: "test 3", id: crypto.randomUUID() },
        { name: "test 4", id: crypto.randomUUID() },
      ],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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
      }),
      inputVal: "",
    }));
  }

  handleRemove(key) {
    const newTodos = this.state.todos.filter((todo) => todo.id !== key);
    console.log(newTodos);
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
          {this.state.todos.map((todo) => (
            <li key={todo.id}>
              {todo.name}{" "}
              <button onClick={() => this.handleRemove(todo.id)}>delete</button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
