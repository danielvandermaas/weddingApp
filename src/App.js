import React, {Component} from 'react';
import './App.css';
import Login from './components/Login'
import Programma from './components/Programma'
import Menu from './components/Menu'
import Fotoboek from './components/Fotoboek'
import Chat from './components/Chat'
import Gastenboek from './components/Gastenboek'
import Tuin from './components/Tuin'

class App extends Component {

state = {
  'name': 'daan',
  'token':'',
  'password':'rooseneefke2020',
  'onScreen':['login'],
  'mapId': 'dd3cee74-98ec-4fd6-bd7a-7fdd3bb409d1'
}

setName = (e)=>{
  this.setState({name:e.target.value})
}

setPassword = (e)=>{
  this.setState({password:e.target.value})
}

setToken = async (e) =>{
  e.preventDefault();
  let res = await fetch('https://api.ellipsis-earth.com/v2/account/login',{method:'POST',  headers: {'Content-Type': 'application/json'}, body:JSON.stringify({'username':'bruiloft', 'password':this.state.password})})
    if(res.status === 400){
      alert("Verkeerd wachtwoord, in de verstuurde mail staat het juiste wachtwoord. Letop dat je geen spaties in je wachtwoord hebt. Houd ook rekening met hoofdletters.")
    }
    else{
      res = await res.json()
      this.setState({token: 'Bearer ' + res.token, onScreen:['programma', 'chat']})
  }
}

setOnScreen = (e) =>{

this.setState({onScreen: e})
}

checkState = () =>{
  console.log(this.state)
}

  render(){

    let programma;
    if(this.state.onScreen.includes('programma')){
      programma = <Programma name={this.state.name} setOnScreen = {this.setOnScreen}/>
    }
    let login;
    if(this.state.onScreen.includes('login')){
      login = <Login name={this.state.name} setName={this.setName} token = {this.state.token} setToken = {this.setToken} password = {this.state.password} setPassword = {this.setPassword} />
    }
    let menu;
    if(this.state.onScreen.includes('menu')){
      menu = <Menu setOnScreen = {this.setOnScreen}/>
    }
    let fotoboek;
    if(this.state.onScreen.includes('fotoboek')){
      fotoboek = <Fotoboek mapId={this.state.mapId} token = {this.state.token} setOnScreen = {this.setOnScreen}/>
    }
    let chat;
    if(this.state.onScreen.includes('chat')){
      chat = <Chat mapId={this.state.mapId} token = {this.state.token} name = {this.state.name}/>
    }
    let gastenboek;
    if(this.state.onScreen.includes('gastenboek')){
      gastenboek = <Gastenboek mapId={this.state.mapId} token = {this.state.token} setOnScreen = {this.setOnScreen}/>
    }
    let tuin;
    if(this.state.onScreen.includes('tuin')){
      tuin = <Tuin/>
    }

  return (
    <div className="App">
    {login}
    {programma}
    {menu}
    {fotoboek}
    {gastenboek}
    {tuin}
    {chat}
    </div>
  );
}
}
export default App;
