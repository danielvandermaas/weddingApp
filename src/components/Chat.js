import React, {Component} from 'react';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import SubmitMessage from './SubmitMessage';

import './Chat.css';

class Chat extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      firstTime: false,

      time: 2, 
      messages: [{
        form: {
          answers: [{ anwser: '' }, { anwser: '' }] 
        } 
      }]
    };

    this.messageEnd = React.createRef();
  }


  componentDidMount() {
    this.getFeed()
    setInterval(this.getFeed, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getFeed = async (scroll) =>{
    let messageInfo = await fetch('https://api.ellipsis-earth.com/v2/geomessage/ids',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify({'mapId':this.props.mapId, 'type': 'polygon', 'limit':40, 'filters':{ 'polygonIds':[16]}})});
    messageInfo = await messageInfo.json();
    let messageIds = messageInfo.messages.map((x) =>{return(x.id)})
    let messages = await fetch('https://api.ellipsis-earth.com/v2/geomessage/get',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify({'mapId':this.props.mapId, 'type': 'polygon', 'messageIds': messageIds })})
    messages = await messages.json();
    messages = messages.reverse();

    this.setState({ messages:messages }, () => {
      if (!this.state.firstTime) {
        setTimeout(() => this.messagesEnd.scrollIntoView(), 10);
        this.setState({ firstTime: true });
      }
      else if (scroll) {
        setTimeout(() => this.messagesEnd.scrollIntoView({ behavior: "smooth" }), 10);
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

      let messageClass = 'chat-message';

      if (user === this.props.name) {
        messageClass += ' chat-message-own';
      }

      return (
        <div className={messageClass}>
          <div className='chat-message-title'>{`${user} ${moment(message.date).format('MM-DD HH:mm')}`}</div>
          <div className='chat-message-text'>{text}</div>
          {
            message.image ? 
              <div className='chat-message-foto' >
                <a onClick = {this.showPhoto.bind(this, message.id)}>
                  <img src = {message.thumbnail}/>
                </a>
              </div> : null
          }             
        </div>
      )
    });

    let containerClass = 'chat-container';
    if (!this.state.firstTime) {
      containerClass += ' chat-container-hidden';
    }

    return (
      <Paper className={containerClass}>
        <Typography variant='h1' component='h1' color='primary'>
          Live Chat        
        </Typography>
       
        <div className='chat-messages-container'>
          {messages}
          <div ref={(el) => { this.messagesEnd = el; }}></div>   
        </div>

        <div>
          <SubmitMessage 
            mapId = {this.props.mapId} 
            token = {this.props.token} 
            getFeed = {() => this.getFeed(true)} 
            name = {this.props.name} 
            type = 'chat'
          />  
        </div>

      </Paper>
    );
  }
}

export default Chat;


{/* <SubmitMessage mapId = {this.props.mapId} token = {this.props.token} getFeed = {this.getFeed} name = {this.props.name} type = 'chat'/> */}