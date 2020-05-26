import React, {Component} from 'react';

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
  <div>
  <h3> Stuur bericht </h3>
  <input type = "text" name = "wachtwoord" placeholder = "Type een berichtje." value = {this.state.bericht} onChange = {this.setName}/>
  <input type="file" id="img" name="img" accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG" onChange = {this.upload}/>
   <input type="button" value= "stuur!" onClick = {this.sent} />
  </div>

  );
}
}
export default SubmitMessage;