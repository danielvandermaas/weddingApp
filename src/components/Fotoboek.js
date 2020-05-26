import React, {Component} from 'react';

class Fotoboek extends Component {

state = {'messages':['x']}

componentDidMount(props){
  this.getFeed()
}

getFeed = async () =>{
    let messageInfo = await fetch('https://api.ellipsis-earth.com/v2/geomessage/ids',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify({'mapId':this.props.mapId, 'type': 'polygon', 'filters':{ 'polygonIds':[15]}})});
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
    <h1> Fotoboek </h1>
    <input type="button" value= "Ga terug naar de tuin" onClick = {this.props.setOnScreen.bind(this,['menu','tuin','chat'])} />
    <ul>{
    this.state.messages.map((message) => {
        return(
          <div>
          <li>
            <a onClick = {this.showPhoto.bind(this, message.id)}>
                <img src = {message.thumbnail}/>
              </a>
                <p>{message.message}</p>
                </li>
            </div>
        )
      })
    }</ul>
    </div>
  );
}
}
export default Fotoboek;
