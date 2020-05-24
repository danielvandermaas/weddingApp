import React, {Component} from 'react';

class ToDoItem extends Component {


render(){  return (
  <div>
  <input type = "checkbox" onChange = {this.props.markComplete.bind(this,this.props.todo.id)}/>
  <p> {this.props.todo.title} </p>
  </div>
  );
}
}
export default ToDoItem;
