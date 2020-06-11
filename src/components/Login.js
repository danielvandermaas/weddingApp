import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import './Login.css';

class Login extends Component {

render() {
  return (
    <Container maxWidth="md" className='login-container'>
      <Typography variant='h1' component='h1' color='primary' className='brush'>
        Roos &hearts; Eefke<br/>
        Bruiloft
      </Typography>
      <TextField
      
        name='naam'
        fullWidth
        placeholder="Uw naam"
        helperText='Wordt gebruikt in de chat'
        value = {this.props.name}
        onChange = {this.props.setName}
        className='loginInput'
      />
      <TextField
        name='wachtwoord'
        fullWidth
        placeholder="Wachtwoord"
        helperText='Deze heeft u gekregen in de uitnodigings email'
        value = {this.props.password}
        onChange = {this.props.setPassword}
        className='loginInput'
      />
      <Button
        className='login-button'
        variant='contained'
        color='primary'
        onClick={this.props.setToken}
      >
        Ga naar bruiloft!
      </Button>
    </Container>
    );
  }
}
export default Login;
