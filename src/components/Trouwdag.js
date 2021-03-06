import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import './Trouwdag.css';
import { CircularProgress } from '@material-ui/core';

class Trouwdag extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,

      messages: []
    };
  }

  componentDidMount() {
    this.getFeed()
  }

  getFeed = async () => {
    let messageInfo = await fetch('https://api.ellipsis-earth.com/v2/geomessage/ids',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify({'mapId':this.props.mapId, 'type': 'polygon', 'filters':{ 'polygonIds':[35]}})});
    messageInfo = await messageInfo.json();
    let messageIds = messageInfo.messages.map((x) =>{return(x.id)})
    let messages = await fetch('https://api.ellipsis-earth.com/v2/geomessage/get',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify({'mapId':this.props.mapId, 'type': 'polygon', 'messageIds': messageIds })})
    messages = await messages.json()
    this.setState({ messages:messages, init: true });
  }

  showPhoto = async (imageId, type) => {
    if (type){this.props.setImageType(type)}
    this.props.addOnScreen('fotoTrouwdag')
    this.props.setImageId(imageId)
  }


  render(){
    return (
      <div className='wedding-content' id='fotoBoek'>


        <Container maxWidth="md">
        <div className='fotoboek-grid'>
          {
            this.state.init ?
              <Grid container spacing={3} justify='center'>
              {
                this.state.messages.map((message, index) => {
                  let type = 'normal';
                  if (index === 0) {type = 'first'};
                  if (index === this.state.messages.length - 1){type = 'last'}

                  return(
                    <Grid item key={'fotoboekRij_' + index}>
                      <Paper>
                        <Button onClick = {() => this.showPhoto(message.id, type)}>
                          <img style={{ width: '100%' }} src = {message.thumbnail}/>
                        </Button>
                        <p>{message.message}</p>
                      </Paper>
                    </Grid>
                  )
                })
              }
              </Grid> :
              <CircularProgress color='primary' style={{ marginTop: '80px', width: '100px', height: '100px' }} />
          }
        </div>
        <iframe
          width='100%'
          height='500px'
          src="https://www.youtube.com/embed/JvmrvzGfjpI?autoplay=0"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title='cermonieFrame'
        />

        </Container>

      </div>
    );
  }
}
export default Trouwdag;
