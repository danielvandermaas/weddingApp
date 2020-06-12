import React, {Component} from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import './Menu.css';

class Menu extends Component {

  openWindow = (url) => {
    console.log(url)
    var win = window.open(url, '_blank');
    win.focus();
  }

  onTabClick = (e, newValue) => {
    if (newValue === 0) {
      this.props.setOnScreen(['programma']);
    }
    else if (newValue === 1) {
      this.props.setOnScreen(['gastenboek']);
    }
    else if (newValue === 2) {
      this.props.setOnScreen(['fotoboek']);
    }
    else if (newValue === 3) {
      this.props.setOnScreen(['video']);
    }
    else if (newValue === 4) {
      this.props.setOnScreen(['ceremonie']);
    }
  }

  render() {
    let onScreen = this.props.onScreen;

    let value = 0;

    if (onScreen) {
      if (onScreen.includes('gastenboek')) {
        value = 1;
      }
      else if (onScreen.includes('fotoboek')) {
        value = 2;
      }
      else if (onScreen.includes('video')) {
        value = 3;
      }
      else if (onScreen.includes('ceremonie')) {
        value = 4;
      }
    }


    return (
      <div className='menu-container'>
        <Typography variant='h1' component='h1' color='primary'>
          Roos &hearts; Eefke
        </Typography>
        <Tabs
          variant='scrollable'
          scrollButtons="auto"
          indicatorColor='primary'
          textColor='primary'
          value={value}
          onChange={this.onTabClick}
          className='menu-tabs'
        >
          <Tab label="Programma"/>
          <Tab label="Gastenboek"/>
          <Tab label="Fotoboek"/>
          <Tab label="Bekijk de tuin"/>
          <Tab label="Ceremonie"/>
        </Tabs>
      </div>
    );
  }
}
export default Menu;
