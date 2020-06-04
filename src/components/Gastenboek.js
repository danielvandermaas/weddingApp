import React, {Component} from 'react';
import SubmitMessage from './SubmitMessage';
import moment from 'moment';

import Button from '@material-ui/core/Button';


import './Gastenboek.css'

class Gastenboek extends Component {

  firstTime = false

  constructor(props) {
    super(props);

    this.messageEnd = React.createRef();
  }

  state = {'time':2, 'messages':[{'form': {'answers':[{'anwser':''}, {'anwser':''}]} }]}

  componentDidMount() {
    this.getFeed()
    setInterval(this.getFeed, 60000);

  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  getFeed = async (scroll) =>{
    let messageInfo = await fetch('https://api.ellipsis-earth.com/v2/geomessage/ids',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify({'mapId':this.props.mapId, 'type': 'polygon', 'limit':30, 'filters':{ 'polygonIds':[14]}})});
    messageInfo = await messageInfo.json();
    let messageIds = messageInfo.messages.map((x) =>{return(x.id)})
    let messages = await fetch('https://api.ellipsis-earth.com/v2/geomessage/get',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify({'mapId':this.props.mapId, 'type': 'polygon', 'messageIds': messageIds })})
    messages = await messages.json();
    // messages = messages.reverse();
    this.setState({ messages:messages }, () => {
      if (!this.firstTime) {
        // setTimeout(() => this.messagesEnd.scrollIntoView(), 100);
        this.firstTime = true;
      }
      else if (scroll) {
        // setTimeout(() => this.messagesEnd.scrollIntoView({ behavior: "smooth" }), 100);
      }
    })
  }

  showPhoto = async (imageId) => {
    this.props.addOnScreen('foto')
    this.props.setImageId(imageId)
  }

  render() {
    let messages = this.state.messages.map((message) => {
      let user = message.form.answers[0].answer;
      let text = message.form.answers[1].answer;

      let messageClass = 'gastenboek-message';

      if (user === this.props.name) {
        messageClass += ' gastenboek-message-own';
      }

      return (
        <div className={messageClass}>
          <div className='gastenboek-message-title'>{`${user} ${moment(message.date).format('MM-DD HH:mm')}`}</div>
          <div className='gastenboek-message-text'>{text}</div>
          {
            message.image ?
              <div className='gastenboek-message-foto' >
                <a onClick = {this.showPhoto.bind(this, message.id)}>
                  <img src = {message.thumbnail}/>
                </a>
              </div> : null
          }
        </div>
      )
    })

    return (
      <div className='wedding-content'>
      <Button
        style={{ marginTop: '24px'  }}
        variant='contained'
        color='primary'
        onClick={() => this.props.setOnScreen(['tuin'])}
      >
        Terug naar de tuin
      </Button>


        <div className='gastenboek-chat-container'>
          {messages}
          <div ref={(el) => { this.messagesEnd = el; }}></div>
        </div>

        <div className='gastenboek-submit-container'>
          <SubmitMessage
            mapId = {this.props.mapId}
            token = {this.props.token}
            getFeed = {() => this.getFeed(true)}
            name = {this.props.name}
            type = 'gastenboek'
          />

        </div>
      </div>
    );
  }
}

export default Gastenboek;
