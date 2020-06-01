import React, {Component} from 'react';

import ModalView from './ModalView/ModalView';

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

onModalChange = () => {
  this.props.removeFromScreen();
}


render() {  
  if (!this.state.image) {
    return null;
  }

  return (
    <ModalView onModalChange={this.onModalChange}>
      <img src={this.state.image}/>
    </ModalView>
    );
  }
}
export default Foto;
