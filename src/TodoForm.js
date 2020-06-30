import React from 'react';
import shortid from 'shortid';
export default class TodoForm extends React.Component{
  state = {
    text: ''
  }
  handleChange = (event) => {
    this.setState ({
      [event.target.name]:event.target.value
    })
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
      id: shortid.generate(),
      text:this.state.text,
      complete:false
    });
    this.setState({
      text:""
    })
  };
  render () {
    return(
      <div  style={{display:"flex", justifyContent:'center'}}>
    <form onSubmit={this.handleSubmit}>
      <input
         name="text"
         onChange = {this.handleChange}
         value= {this.state.text }
         placeholder= "todo..."
       />
       <button onClick={this.handleSubmit}>Add Todo</button>
     </form>
     </div>
   );
  }
}
