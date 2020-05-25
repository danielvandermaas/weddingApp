import React, {Component} from 'react';

class SubmitMessage extends Component {

state = {'bericht':''}

setName = (e)=>{
  this.setState({bericht:e.target.value})
}

sent = async (e)=>{
  let form = {'formName':'chat' , 'answers':[{'type':'text','question':'Naam', 'answer':this.props.name},{'type':'text', 'question':'Bericht', 'answer':this.state.bericht}]}
  let res = await fetch('https://api.ellipsis-earth.com/v2/geomessage/add',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify({'mapId':this.props.mapId, 'timestamp': 0, 'type':'polygon', 'elementId':16, 'form':form })})
  console.log(res.status)
}


render(){  return (
  <div>
  <h3> Stuur bericht </h3>
  <input type = "text" name = "wachtwoord" placeholder = "Type een berichtje." value = {this.props.password} onChange = {this.setName}/>
   <input type="button" value= "stuur!" onClick = {this.sent} />
  </div>

  );
}
}
export default SubmitMessage;



//  this.props.getFeed()
