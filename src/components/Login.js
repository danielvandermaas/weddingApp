import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Login.css';

class Login extends Component {

render() {  
  return (
    <div className='login-container'>
      <Typography variant='h1' component='h1' color='primary'>
        Roos &hearts; Eefke        
      </Typography>
      <Typography variant='h1' component='h1' color='primary'>
        Bruiloft       
      </Typography>
      <TextField
        className='login-textfield'
        name='naam'
        placeholder="Voer je naam in, deze wordt gebruikt om aan andere gasten te tonen" 
        value = {this.props.name} 
        onChange = {this.props.setName}
      />
      <TextField
        className='login-textfield'
        name='wachtwoord'
        placeholder="Voer het wachtwoord uit de email in."
        value = {this.props.password} 
        onChange = {this.props.setPassword}
      />
      <Button
        className='login-button'
        variant='contained'
        color='primary'
        onClick={this.props.setToken}
      >
        Ga naar bruiloft!
      </Button>
    </div>
    );
  }
}
export default Login;
