import React, {Component} from 'react';

class Foto extends Component {

state = {'image': ''}

getPhoto = async () =>{
  let body = {'mapId': this.props.mapId, 'geoMessageId': this.props.imageId, 'type':'polygon'}
  let image = await fetch('https://api.ellipsis-earth.com/v2/geomessage/image',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify(body)});
  let blob = await image.blob()

  var reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = ()=> {
      var base64data = reader.result;
    this.setState({image:base64data})
  }

}

componentDidMount() {
this.getPhoto()
}


render(){  return (
  <div>
  <h1> Foto </h1>
  <img src = {this.state.image}/>
  <input type="button" value= "Sluit" onClick={this.props.removeFromScreen} />
  </div>

  );
}
}
export default Foto;
