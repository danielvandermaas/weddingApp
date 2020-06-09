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

  closeModal = (e, override = false) => {
    if(override || (e.target.tagName === 'DIV' && e.target.className && e.target.className.includes('modal-view-content')))
    {
      this.props.onModalChange(null);
    }
  }

  render() {
    let children = this.props.children;

    if (!children) {
      return null;
    }

    return (
      <div className='modal-view' onClick={this.closeModal}>
        <div className='modal-view-close-button-container'>
          <IconButton color='secondary' onClick={(e) => this.closeModal(e, true)}>
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
