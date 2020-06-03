import React, {Component} from 'react';

class Video extends Component {
  render() {
    return (
      <div className='wedding-content'>
        <iframe 
          width='100%' 
          height='500px' 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
          frameborder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        >

        </iframe>
      </div>
    );
  }
}

export default Video;
