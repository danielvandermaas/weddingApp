import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import './Programma.css'

class Programma extends Component {
  render(){
    return (<section className='wedding-content' id='programma'>
      <Container maxWidth="md">
        <Typography
          variant="h1"
          component="h1"
          color='primary'
          gutterBottom
          className='brush'
        >
          Lieve {this.props.name},
        </Typography>
        <section>
          <Typography gutterBottom>
            Wat leuk dat je naar de half-digitale bruiloft van Eefke en Roos bent gekomen! We hebben jullie er graag bij en hebben daarom naast de tuin ook een digitale tuin ingericht vanuit waar jullie gezellig mee kunnen doen.
          </Typography>
          <Typography gutterBottom>
            De digitale tuin bestaat uit een kaart met enkele markers. Als je op deze markers klikt kom je in een videogesprek op een laptop op die precieze locatie.
          </Typography>
          <Typography gutterBottom>
            Buiten videobellen zijn er ook andere manieren om mee te doen. Zoals de live chat en het gastenboek (waar we jullie willen vragen om een berichtje achter te laten :) ).
          </Typography>
          <Typography gutterBottom>
            We hopen dat we op deze manier wat van jullie aanwezigheid mee krijgen!
          </Typography>
          <Typography gutterBottom>
            Het programma hieronder geeft aan waar je op welk moment moet zijn.De eerste stap is om hieronder op de knop 'naar de tuin' te klikken en vervolgens op de rode marker. Deze marker geeft je een meeting link. Klik hierop om contact te maken met de ceremonie meester.
          </Typography>
          <Typography gutterBottom>
            Mocht je technische problemen ondervinden in de digitale tuin bel dan Minghai op <Link color='primary' href='tel:+31658807827'>+31 6 58807827</Link>.
          </Typography>
        </section>

        <Typography
          variant="h1"
          component="h1"
          color='primary'
          className='brush'
          style={{ marginTop: '0px' }}
        >
          Programma
        </Typography>
        <table className='programme-table'>
{/*          <thead>
            <tr>
              <th colSpan="2">
              </th>
            </tr>
          </thead>*/}
          <tbody>
            <tr>
              <td><Typography>Inloop</Typography></td>
              <td className='time'><Typography>14:00 - 14:30</Typography></td>
            </tr>
            <tr>
              <td><Typography>Ceremonie</Typography></td>
              <td className='time'><Typography>14:30 - 15:30</Typography></td>
            </tr>
            <tr>
              <td><Typography>Receptie</Typography></td>
              <td className='time'><Typography>15:30 - 17:00</Typography></td>
            </tr>
          </tbody>
        </table>

        {/*<Button
          variant='contained'
          color='primary'
          onClick={() => this.props.setOnScreen(['tuin'])}
        >
          Ga naar de tuin
        </Button>*/}
      </Container>
    </section>);
  }
}
export default Programma;
