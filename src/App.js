import React, {Component} from 'react';
import './App.css';
import ToDos from './components/ToDos'

class App extends Component {

state = {todos:[
  {'title': 'taak1', 'id':1, 'completed': false},
  {'title': 'taak2', 'id':2, 'completed': false},
  {'title': 'taak3', 'id':3, 'completed': true},
  {'title': 'taak4', 'id':4, 'completed': false},
]}


markComplete = (id) => {
  this.setState({todos: this.state.todos.map(todo =>{
  if(todo.id ===id){
    todo.completed = ! todo.completed
  }
  return(todo)
  })})
  console.log(this.state)
}


  render(){
  return (
    <div className="App">
    <h1>
    app
    </h1>
    <ToDos todos={this.state.todos} markComplete = {this.markComplete}/>
    </div>
  );
}
}
export default App;
