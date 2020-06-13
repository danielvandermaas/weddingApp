import React, {Component} from 'react';

import Fab from '@material-ui/core/Fab';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ModalView from './ModalView/ModalView';

import './FotoTrouwdag.css';

class FotoTrouwdag extends Component {

state = {'image': ''}

getPhoto = async (id = this.props.imageId) =>{
  let body = {'mapId': this.props.mapId, 'geoMessageId': id, 'type':'polygon'}
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

componentDidUpdate(prevProps) {
  if(prevProps.imageId !== this.props.imageId)
   {
    this.getPhoto()
   }
}

onModalChange = () => {
  this.props.removeFromScreen();
  this.props.setImageType(null);
}

chevronClick = (e, type) => {
  let messages = this.props.fotoboekRef.current.state.messages;
  let index = messages.map(message => message.id).indexOf(this.props.imageId) + type;
  let imageType = 'normal';
  if (index === 0) {imageType = 'first'};
  if (index === messages.length - 1) {imageType = 'last'};
  this.props.setImageType(imageType);
  if(messages[index]){this.props.setImageId(messages[index].id)};
}


render() {
  if (!this.state.image) {
    return null;
  }

  return (
    <ModalView onModalChange={this.onModalChange}>
      {
        this.props.imageType && this.props.imageType !== 'first'
        ? <Fab color="primary" className='left' onClick={(e)=> {this.chevronClick(e, -1)}}>
            <ChevronLeftIcon />
          </Fab>
        : null
      }
      <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={this.state.image}/>
      {
        this.props.imageType && this.props.imageType !== 'last'
        ? <Fab color="primary" className='right' onClick={(e)=> {this.chevronClick(e, 1)}}>
            <ChevronRightIcon />
          </Fab>
        : null
      }
    </ModalView>);
  }
}
export default FotoTrouwdag;
