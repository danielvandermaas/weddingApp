import React, {Component} from 'react';
import SubmitMessage from './SubmitMessage'

class Chat extends Component {

state = {'time':2, 'messages':[{'form': {'answers':[{'anwser':''}, {'anwser':''}]} }]}

componentDidMount() {
  this.getFeed()
  setInterval(this.getFeed, 3000);
}

componentWillUnmount() {
  clearInterval(this.interval);
}


getFeed = async () =>{
    let messageInfo = await fetch('https://api.ellipsis-earth.com/v2/geomessage/ids',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify({'mapId':this.props.mapId, 'type': 'polygon', 'limit':40, 'filters':{ 'polygonIds':[16]}})});
    messageInfo = await messageInfo.json();
    let messageIds = messageInfo.messages.map((x) =>{return(x.id)})
    let messages = await fetch('https://api.ellipsis-earth.com/v2/geomessage/get',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify({'mapId':this.props.mapId, 'type': 'polygon', 'messageIds': messageIds })})
    messages = await messages.json()
    this.setState({messages:messages})
  }

showPhoto = async (imageId) => {
this.props.addOnScreen('foto')
this.props.setImageId(imageId)
}

render(){
  return (
    <div>
    <h1> Chat </h1>
    <SubmitMessage mapId = {this.props.mapId} token = {this.props.token} getFeed = {this.getFeed} name = {this.props.name} type = 'chat'/>
    <ul>{
    this.state.messages.map((message)=>{
        return(
          <div>
          <li>
                <p> {message.form.answers[0].answer}</p>
                <p>{message.form.answers[1].answer}</p>
                <a onClick = {this.showPhoto.bind(this, message.id)}>
                <img src = {message.thumbnail}/>
                </a>
                </li>
            </div>
        )
      })
    }</ul>
    </div>
  );
}
}
export default Chat;