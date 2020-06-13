import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

class Inzendingen extends Component {
  render() {
    return (
      <div className='wedding-content'>
      <h2> Herineringen Arthur </h2>
      <a href = "https://public.ellipsis-earth.com/huwelijk.pdf" target="_blank" >
      <Button
        variant='contained'
        color='primary'
        component='span'
      >
      Bekijk
    </Button>
    </a>
    <h2> Speech Opa (maas) </h2>
    <a href = "https://public.ellipsis-earth.com/opa.pdf" target="_blank" >
    <Button
      variant='contained'
      color='primary'
      component='span'
    >
    Bekijk
  </Button>
  </a>
  <h2> Speech Daan </h2>
  <a href = "https://public.ellipsis-earth.com/speech.pdf" target="_blank" >
  <Button
    variant='contained'
    color='primary'
    component='span'
  >
  Bekijk
</Button>
</a>

    <h2> Filmpje Suzanne </h2>
      <Container maxWidth="md">
        {/*<Button
          style={{ marginBottom: '24px'  }}
          variant='contained'
          color='primary'
          onClick={() => this.props.setOnScreen(['tuin'])}
        >
          Terug naar de tuin
        </Button>*/}
        <iframe
          width='100%'
          height='500px'
          src="https://public.ellipsis-earth.com/bruiloft.mp4"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title='cermonieFrame'
        />
      </Container>
    </div>
  );
  }
}

export default Inzendingen;
