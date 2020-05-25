import React, {Component} from 'react';


class Login extends Component {



render(){  return (
  <div>
  <h1> Welkom op de bruiloft van Roos en Eefke </h1>
  <input type = "text" name = "naam" placeholder = "Voer je naam in, deze wordt gebruikt om aan andere gasten te tonen" value = {this.props.name} onChange = {this.props.setName}/>
  <input type = "text" name = "wachtwoord" placeholder = "Voer het wachtwoord uit de email in." value = {this.props.password} onChange = {this.props.setPassword}/>
   <input type="button" value= "Ga naar de bruiloft!" onClick = {this.props.setToken} />
  </div>
  );
}
}
export default Login;
