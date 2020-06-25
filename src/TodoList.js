import React from 'react';
import TodoForm from './TodoForm'
import Todo from './Todo'
export default class TodoList extends React.Component{
  state = {
    todos: [],
    todosToShow: "all"
  };

  addTodo = (todo) =>{
    this.setState({
      todos:[todo, ...this.state.todos]
    })
  }

  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id ===id){
          return {
            id:todo.id,
            text: todo.text,
            complete: !todo.complete
          }
        }else {
          return todo;
        }
      })
    })
  };

  updateTodosToShow = (value) =>{
    this.setState({
      todosToShow:value
    })
  };

  render () {
    let todos = [];
    if (this.state.todosToShow === "all") {
      todos = this.state.todos;
    } else if (this.state.todosToShow === "active"){
      todos = this.state.todos.filter(todo => !todo.complete && todo.text !== '');
    } else {
      todos = this.state.todos.filter(todo => todo.complete && todo.text !== '');
    }
    return (<div>

      <TodoForm onSubmit={this.addTodo}/>
      {todos.map(todo => (
        <Todo
        key={todo.id}
        toggleComplete={() =>this.toggleComplete(todo.id)}
        todo={todo}/>
      ))}
      <div>Active left:
      {this.state.todos.filter(todo=> !todo.complete && todo.text !== '').length}
      </div>
      <button onClick={()=>this.updateTodosToShow("all")}>All</button>
      <button onClick={()=>this.updateTodosToShow("active")}>Active</button>
      <button onClick={()=>this.updateTodosToShow("completed")}>Completed</button>
    </div>);
  }
}
