import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import './ModalView.css';

class ModalView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: false,
      message: ''
    };
  }
  
  componentDidMount() {

  }

  closeModal = () => {
    this.props.onModalChange(null);
  }

  render() {
    let children = this.props.children;

    if (!children) {
      return null;
    }

    return (
      <div className='modal-view' onClick={this.closeModal}>
        <div className='modal-view-close-button-container'>
          <IconButton color='secondary' onClick={this.closeModal}>
            <CloseIcon/>
          </IconButton>
        </div>
        <div className='modal-view-content'>
          {children}
        </div>
      </div>
    );
  }
}

export default ModalView;
