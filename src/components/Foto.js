import React, {Component} from 'react';

class Foto extends Component {

getPhoto = async () =>{
  console.log(this.props.mapId)
  let body = {'mapId': this.props.mapId, 'geoMessageId': this.props.imageId, 'type':'polygon'}
  let image = await fetch('https://api.ellipsis-earth.com/v2/geomessage/image',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify(body)});
  console.log(image)
}

componentDidMount() {

}


render(){  return (
  <div>
  <h1> Foto </h1>
  <p> {this.props.imageId}</p>
  <input type="button" value= "Sluit" onClick={this.props.removeFromScreen} />
  </div>

  );
}
}
export default Foto;
