import React, {Component} from 'react';

class Foto extends Component {


render(){  return (
  <div>
  <h1> Foto </h1>
  <p> {this.props.imageId}</p>
  <input type="button" value= "Sluit" />
  </div>

  );
}
}
export default Foto;
