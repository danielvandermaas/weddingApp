import React, {Component} from 'react';

class Menu extends Component {

openWindow = (url) => {
  console.log(url)
  var win = window.open(url, '_blank');
  win.focus();
}

render(){  return (
  <div>
  <h1> Menu </h1>
  <input type="button" value= "Programma" onClick = {this.props.setOnScreen.bind(this, ['programma', 'chat'])}/>
  <input type="button" value= "Gastenboek" onClick = {this.props.setOnScreen.bind(this, ['gastenboek', 'chat'])}/>
  <input type="button" value= "Fotoboek" onClick = {this.props.setOnScreen.bind(this, ['fotoboek', 'chat'])} />
  <input type="button" value= "Bekijk de tuin" onClick =  {this.openWindow.bind(this, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')} />
  </div>

  );
}
}
export default Menu;
