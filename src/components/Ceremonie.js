import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

class Ceremonie extends Component {
  render() {
    return (<div className='wedding-content'>
      <Container maxWidth="md">
        <Button
          style={{ marginBottom: '24px'  }}
          variant='contained'
          color='primary'
          onClick={() => this.props.setOnScreen(['tuin'])}
        >
          Terug naar de tuin
        </Button>
        <iframe
          width='100%'
          height='500px'
          src="https://www.youtube.com/embed/JvmrvzGfjpI?autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title='cermonieFrame'
        />
      </Container>
    </div>);
  }
}

export default Ceremonie;
