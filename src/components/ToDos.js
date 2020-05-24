import React, {Component} from 'react';
import ToDoItem from './ToDoItem'


class ToDos extends Component {



render(){  return (
  <h1> Taken </h1>,

  this.props.todos.map((todo) =>(
    <ToDoItem todo = {todo} markComplete = {this.props.markComplete}/>
  ))

  );
}
}
export default ToDos;
