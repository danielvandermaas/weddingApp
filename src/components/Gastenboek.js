import React, {Component} from 'react';
import SubmitMessage from './SubmitMessage';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';


import './Gastenboek.css'

const FONT = [
  `'Dancing Script', cursive`,
  `'Amatic SC', cursive`,
  `'Architects Daughter', cursive`,
  `'Caveat', cursive`,
  `'Indie Flower', cursive`,
  `'Parisienne', cursive`,
  `'Shadows Into Light', cursive`
];

class Gastenboek extends Component {

  firstTime = false

  constructor(props) {
    super(props);

    this.messageEnd = React.createRef();

    this.state = {
      int: false,

      time: 2,
      messages: []
    };
  }

  componentDidMount() {
    this.getFeed()
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  getFeed = async (scroll) => {
    let messageInfo = await fetch('https://api.ellipsis-earth.com/v2/geomessage/ids',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify({'mapId':this.props.mapId, 'type': 'polygon', 'limit':30, 'filters':{ 'polygonIds':[14]}})});
    messageInfo = await messageInfo.json();
    let messageIds = messageInfo.messages.map((x) =>{return(x.id)})

    let messages = [];
    
    if (messageIds.length > 0) {
      messages = await fetch('https://api.ellipsis-earth.com/v2/geomessage/get',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify({'mapId':this.props.mapId, 'type': 'polygon', 'messageIds': messageIds })})
      messages = await messages.json();
    }

    // messages = messages.reverse();
    this.setState({ messages: messages, init: true }, () => {
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
    let messages = this.state.messages.map((message, index) => {
      let user = message.form.answers[0].answer;
      let text = message.form.answers[1].answer;

      if (!user) {
        return null;
      }

      let fontIndex = user[0].toLowerCase().charCodeAt(0) % FONT.length;
      let font = FONT[fontIndex];

      //console.log(fontIndex);

      let messageClass = 'gastenboek-message';

      if (user === this.props.name) {
        messageClass += ' gastenboek-message-own';
      }

      return (
        <div className={messageClass} style={{ fontFamily: font }} key={'gastenBoekEntry_' + index}>
          <div className='gastenboek-message-text'>{text}</div>
          {
            message.image ?
              <div className='gastenboek-message-foto' >
                <a onClick = {this.showPhoto.bind(this, message.id)}>
                  <img src = {message.thumbnail}/>
                </a>
              </div> : null
          }
          <div className='gastenboek-message-title'>{`${user} ${moment(message.date).format('MM-DD HH:mm')}`}</div>
        </div>
      )
    })

    return (
      <div className='wedding-content' id='gastenBoek'>
      <Container maxWidth="md">
        <Button
          variant='contained'
          color='primary'
          onClick={() => this.props.setOnScreen(['tuin'])}
        >
          Terug naar de tuin
        </Button>

        <div className='gastenboek-submit-container'>
          <SubmitMessage
            mapId = {this.props.mapId}
            token = {this.props.token}
            getFeed = {() => this.getFeed(true)}
            name = {this.props.name}
            type = 'gastenboek'
          />
        </div>

        <div className='gastenboek-chat-container'>
          {
            this.state.init ?
              <React.Fragment>
                {messages}
                <div ref={(el) => { this.messagesEnd = el; }}></div>
              </React.Fragment> :
              <CircularProgress color='primary' style={{ marginTop: '80px', width: '100px', height: '100px' }} />
          }

        </div>

      </Container>
    </div>);
  }
}

export default Gastenboek;
