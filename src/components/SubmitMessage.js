import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './SubmitMessage.css';

class SubmitMessage extends Component {

state = {'bericht':'', 'image':''}

setName = (e)=>{
  this.setState({bericht:e.target.value})
}

sent = async (e)=>{
  let form = {'formName':'chat' , 'answers':[{'type':'text','question':'Naam', 'answer':this.props.name},{'type':'text', 'question':'Bericht', 'answer':this.state.bericht}]}
  let polygonId
  if(this.props.type ==='chat'){
    polygonId = 16
}else{
  polygonId = 14
}
let body
if(this.state.image ===''){
  body = {'mapId':this.props.mapId, 'timestamp': 0, 'type':'polygon', 'elementId':polygonId, 'form':form }
}else{
  body = {'mapId':this.props.mapId, 'timestamp': 0, 'type':'polygon', 'elementId':polygonId, 'form':form, 'image':this.state.image }
}
this.setState({bericht:'', image:''})

  let res = await fetch('https://api.ellipsis-earth.com/v2/geomessage/add',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify(body)})
  this.props.getFeed()

}

upload = (evt) =>{
let reader = new FileReader()
let file = evt.target.files[0]
let self = this
reader.onload = function(upload) {
    self.setState({image: upload.target.result})
};
reader.readAsDataURL(file)

  //this.setState({image:e.target.value})

}

render(){  return (
  <div className='gastenboek-submitmessage'>
    <TextField
      className='gastenboek-submitmessage-textfield'
      placeholder='Laat bericht achter'
      multiline
      rowsMax={4}
      value={this.state.bericht}
      onChange = {this.setName}
    />

    <div className='gastenboek-submitmessage-buttons'>
      <div>
        <input
          accept='image/*'
          style={{ display: 'none' }}
          id='photo-upload-input'
          type='file'
          onChange={this.upload}
          capture='camera'
        />
        <label htmlFor='photo-upload-input'>
          <Button 
            className='gastenboek-submitmessage-photo-button'
            variant='contained' 
            color='primary' 
            component='span'
          >
            Voeg foto toe
          </Button>
        </label>
      </div>
      <div>
      <Button 
        className='gastenboek-submitmessage-submit-button'
        variant='contained' 
        color='primary'
        onClick={this.sent}
      >
        Verstuur
      </Button>
      </div>
    </div>


  </div>

  );
}
}
export default SubmitMessage;
