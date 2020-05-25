import React, {Component} from 'react';

class Programma extends Component {


render(){  return (
  <div>
  <h3> Lieve {this.props.name},</h3>
  <p>
Wat leuk dat je naar de half-digitale bruiloft van Eefke en Roos bent gekomen! We hebben jullie er graag bij en hebben daarom naast de tuin ook een digitale tuin ingericht vanuit waar jullie gezellig mee kunnen doen.
</p>
<p>
De digitale tuin bestaat uit een kaart met enkele markers. Als je op deze markers klikt kom je in een videogesprek op een laptop op die precieze locatie.
</p>
Buiten videobellen zijn er ook andere manieren om mee te doen. Zoals de live chat en het gastenboek (waar we jullie willen vragen om een berichtje achter te laten :) ).
<p>
We hopen dat we op deze manier wat van jullie aanwezigheid mee krijgen!
</p>
Het programma hiernaast geeft een leidraad waar in de digitale tuin je op welk moment moet zijn. De eerste stap is om naar de inloop marker aan het begin van de tuin te gaan.
<p>
Mocht je technische problemen ondervinden in de digitale tuin bel dan Minghai op +31 6 58807827.
</p>

  <h3>Programma</h3>
<ul>
<li>Inloop 14:00-14:30</li>
<li>Ceremonie 14:30-15:00</li>
<li>Receptie 15:00-17:00</li>
</ul>
<input type="button" value= "Ga naar de tuin" onClick = {this.props.setOnScreen.bind(this,['menu','tuin','chat'])} />

  </div>
  );
}
}
export default Programma;
