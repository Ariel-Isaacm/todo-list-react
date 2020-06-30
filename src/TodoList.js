import React from 'react';
import TodoForm from './TodoForm'
import Todo from './Todo'
export default class TodoList extends React.Component{
  state = {
    todos: [],
    todosToShow: "all",
    toggleAll: true
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
    });
  };

  handleDeleteTodo =(id) => {
    this.setState(state =>({
      todos:state.todos.filter(todo => todo.id !== id)
    }));
  };

  removeAllTodoThatAreCompleted = () => {
    this.setState(state => ({
      todos:this.state.todos.filter(todo => !todo.complete)
    }));
  };

  toggleAll = () => {
    this.setState(state =>({
      todos: state.todos.map((todo) => {
        return {
          id:todo.id,
          text: todo.text,
          complete: state.toggleAll
        };
      }),
      toggleAll: !state.toggleAll
    }));
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
        onDelete={()=>{this.handleDeleteTodo(todo.id)}}
        toggleComplete={() =>this.toggleComplete(todo.id)}
        todo={todo}/>
      ))}
      <div  style={{display:"flex", justifyContent:'center'}}>Active left:
      {this.state.todos.filter(todo=> !todo.complete && todo.text !== '').length}
      </div>
      <div  style={{display:"flex", justifyContent:'center'}}>
        <button onClick={()=>this.updateTodosToShow("all")}>All</button>
        <button onClick={()=>this.updateTodosToShow("active")}>Active</button>
        <button onClick={()=>this.updateTodosToShow("completed")}>Completed</button>
      </div>
      {this.state.todos.some(todo => todo.complete) ? (<div  style={{display:"flex", justifyContent:'center'}}>
        <button onClick={this.removeAllTodoThatAreCompleted}>Remove all complete todos</button>
      </div>) :null}
      <div style={{display:"flex", justifyContent:'center'}}>
        <button onClick={this.toggleAll}>Toggle All</button>
      </div>
    </div>

  );
  }
}
