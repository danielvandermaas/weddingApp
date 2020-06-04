import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import './Fotoboek.css';

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
    <div className='wedding-content'>
    <Button
      style={{ marginTop: '24px'  }}
      variant='contained'
      color='primary'
      onClick={() => this.props.setOnScreen(['tuin'])}
    >
      Terug naar de tuin
    </Button>

      <div className='fotoboek-grid'>
        <Grid container spacing={3}>
          {
            this.state.messages.map((message) => {
              return(
                <Grid item xs={3}>
                  <Paper>
                    <a onClick = {this.showPhoto.bind(this, message.id)}>
                      <img style={{ width: '100%' }} src = {message.thumbnail}/>
                    </a>
                    <p>{message.message}</p>
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    </div>
  );
}
}
export default Fotoboek;
