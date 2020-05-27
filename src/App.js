import React, {Component} from 'react';
import './App.css';
import Login from './components/Login'
import Programma from './components/Programma'
import Menu from './components/Menu'
import Fotoboek from './components/Fotoboek'
import Chat from './components/Chat'
import Gastenboek from './components/Gastenboek'
import Tuin from './components/Tuin'
import Foto from './components/Foto'

class App extends Component {

state = {
  'name': 'daan',
  'token':'',
  'password':'rooseneefke2020',
  'onScreen':['login'],
  'mapId': 'dd3cee74-98ec-4fd6-bd7a-7fdd3bb409d1',
  'imageId': 'een id'
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
      if(this.state.name.length <4){
        alert("Vul een naam in van op zijn minst 4 letters")
      }else{
      res = await res.json()
      this.setState({token: 'Bearer ' + res.token, onScreen:['programma', 'chat']})
    }
  }
}

setImageId = (imageId)=>{
  this.setState({imageId:imageId})
}

setOnScreen = (e) =>{
this.setState({onScreen: e})
}

addOnScreen = (e) =>{
 let onScreen = [...this.state.onScreen]
 onScreen.push('foto')
 this.setState({onScreen: onScreen})
}

removeFromScreen = (e)=>{
let onScreen = [...this.state.onScreen]
onScreen = onScreen.map((el)=>{
  if(el != 'foto'){
    return(el)
  }
})
this.setState({onScreen: onScreen})
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
      fotoboek = <Fotoboek mapId={this.state.mapId} token = {this.state.token} setOnScreen = {this.setOnScreen} addOnScreen = {this.addOnScreen} setImageId = {this.setImageId}/>
    }
    let chat;
    if(this.state.onScreen.includes('chat')){
      chat = <Chat mapId={this.state.mapId} token = {this.state.token} name = {this.state.name} addOnScreen = {this.addOnScreen} setImageId = {this.setImageId}/>
    }
    let gastenboek;
    if(this.state.onScreen.includes('gastenboek')){
      gastenboek = <Gastenboek mapId={this.state.mapId} token = {this.state.token} setOnScreen = {this.setOnScreen} addOnScreen = {this.addOnScreen} setImageId = {this.setImageId} name = {this.state.name}/>
    }
    let tuin;
    if(this.state.onScreen.includes('tuin')){
      tuin = <Tuin mapId = {this.state.mapId} token = {this.state.token}/>
    }
    let foto;
    if(this.state.onScreen.includes('foto')){
      foto = <Foto setOnScreen = {this.setOnScreen} imageId = {this.state.imageId} mapId = {this.state.mapId} removeFromScreen = {this.removeFromScreen} token = {this.state.token}/>
    }

  return (
    <div className="App">
    {login}
    {programma}
    {foto}
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
