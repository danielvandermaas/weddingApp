import React, {Component} from 'react';
import './App.css';
import Login from './components/Login'
import Programma from './components/Programma'
import Menu from './components/Menu'
import Fotoboek from './components/Fotoboek'
import Gastenboek from './components/Gastenboek'
import Tuin from './components/Tuin'
import Foto from './components/Foto';
import Chat from './components/Chat';
import Video from './components/Video';
import Ceremonie from './components/Ceremonie';

import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DefaultTheme from './theme';

const theme = createMuiTheme(DefaultTheme);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      token:'',
      password:'',
      onScreen:['login'],
      mapId: 'dd3cee74-98ec-4fd6-bd7a-7fdd3bb409d1',
      imageId: 'een id',

      imageType: null,

      openChat: false,

      firstTime: null
    }

    this.fotoboek = React.createRef();
  }

  setPosition = (e)=>{
    this.setState({ position:e })
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
        if(this.state.name.length <2){
          alert("Vul een naam in van op zijn minst 2 letters")
        }else{
        res = await res.json()
        this.setState({token: 'Bearer ' + res.token, onScreen:['programma', 'chat', 'menu' ]})
      }
    }
  }

  setImageType = (imageType) => {
    if (imageType !== this.state.imageType)
    {
      this.setState({imageType: imageType})
    }
  }

  setImageId = (imageId)=>{
    this.setState({imageId:imageId})
  }

  setOnScreen = (onScreen) => {
    let firstTime = this.state.firstTime;

    if (onScreen.includes('tuin')) {
      if (firstTime === null) {
        firstTime = true;
      }
      else if (firstTime) {
        firstTime = false;
      }
    }

    this.setState({ onScreen: onScreen, firstTime });
  }

  addOnScreen = (e) =>{
    let onScreen = [...this.state.onScreen]
    onScreen.push('foto')
    this.setState({onScreen: onScreen})
  }

  removeFromScreen = (e)=>{
    let onScreen = [...this.state.onScreen]
    onScreen = onScreen.filter((el) => el !== 'foto')
    this.setState({onScreen: onScreen})
  }

  onToggleChat = () => {
    this.setState({ openChat: !this.state.openChat });
  }

  render() {
    let isLogin = this.state.onScreen.includes('login');

    let menu = null;
    let chatButton = null;
    let chat = null;

    if (!isLogin){
      menu = <Menu setOnScreen={this.setOnScreen} onScreen={this.state.onScreen}/>
      chatButton = (
        <div className='wedding-chat-button'>
          <Button
            variant='contained'
            color='primary'
            onClick={this.onToggleChat}
          >
            <ChatIcon/>
          </Button>
        </div>
      );

      if (this.state.openChat) {
        chat = (
          <Chat
            mapId={this.state.mapId}
            token = {this.state.token}
            name = {this.state.name}
            addOnScreen = {this.addOnScreen}
            setImageId = {this.setImageId}
          />
        );
      }
    }

    let programma;
    if(this.state.onScreen.includes('programma')){
      programma = <Programma name={this.state.name} setOnScreen = {this.setOnScreen}/>
    }
    let login;
    if(this.state.onScreen.includes('login')){
      login = <Login name={this.state.name} setName={this.setName} token = {this.state.token} setToken = {this.setToken} password = {this.state.password} setPassword = {this.setPassword} />
    }

    let fotoboek;
    if(this.state.onScreen.includes('fotoboek')){
      fotoboek = <Fotoboek ref={this.fotoboek} mapId={this.state.mapId} token = {this.state.token} setOnScreen = {this.setOnScreen} addOnScreen = {this.addOnScreen} setImageId = {this.setImageId} setImageType={this.setImageType}/>
    }

    let gastenboek;
    if(this.state.onScreen.includes('gastenboek')){
      gastenboek = <Gastenboek mapId={this.state.mapId} token = {this.state.token} setOnScreen = {this.setOnScreen} addOnScreen = {this.addOnScreen} setImageId = {this.setImageId} name = {this.state.name}/>
    }

    let tuin;
    if(this.state.onScreen.includes('tuin')){
      tuin = (
        <Tuin
          mapId={this.state.mapId}
          token={this.state.token}
          setOnScreen = {this.setOnScreen}
          addOnScreen={this.addOnScreen}
          setImageId={this.setImageId}
          firstTime={this.state.firstTime}
        />
      );
    }
    let foto;
    if(this.state.onScreen.includes('foto')){
      foto = <Foto setOnScreen = {this.setOnScreen} imageId = {this.state.imageId} mapId = {this.state.mapId} removeFromScreen = {this.removeFromScreen} token = {this.state.token} imageType={this.state.imageType} fotoboekRef={this.fotoboek} setImageId = {this.setImageId} setImageType={this.setImageType}/>
    }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <section id='content'>
          {menu}
          {login}
          {programma}
          {foto}
          {fotoboek}
          {gastenboek}
          {tuin}
          {this.state.onScreen.includes('video') ? <Video setOnScreen = {this.setOnScreen}/> : null}
          {this.state.onScreen.includes('ceremonie') ? <Ceremonie setOnScreen = {this.setOnScreen}/> : null}
        </section>
        <section id='chat'>
          {chat}
          {chatButton}
        </section>
      </ThemeProvider>
    </div>
  );
}
}
export default App;
