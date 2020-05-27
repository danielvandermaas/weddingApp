import React, {Component} from 'react';
import {
  Map,
  TileLayer,
  Pane,
  Marker,
  Popup,
  Circle,
  GeoJSON
} from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';


class Tuin extends Component {

  leafletMap = null

  constructor(props) {
    super(props);

    this.leafletMap = React.createRef();

    this.state = {'ceremonie':[], 'ontvangst':[], 'receptie':[], 'photoMarkers':[], 'position':{'coords': [51.98126,5.82501], 'zoom':18}}
  }

  componentDidMount() {
  this.flyToPos(this.state.position)
  this.getMarkers('ceremonie')
  this.getMarkers('ontvangst')
  this.getMarkers('receptie')
  this.getPhotoMarkers()
  }

componentWillUnmount(){
  this.props.setPosition(this.state.position)

}

  showPhoto = async (imageId) => {
  this.props.addOnScreen('foto')
  this.props.setImageId(imageId)
  }

  openWindow = (url) => {
    var win = window.open('https://' + url, '_blank');
    win.focus();
  }

getMarkers= async (layer) =>{
  let body = {'mapId':this.props.mapId, 'layer':layer, 'type':'polygon'}
  let ids = await fetch('https://api.ellipsis-earth.com/v2/geometry/ids',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify(body)});
  ids = await ids.json()
  ids = ids.ids
  body = {'mapId':this.props.mapId, 'elementIds':ids, 'type':'polygon'}
  let geojson = await fetch('https://api.ellipsis-earth.com/v2/geometry/get',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify(body)});
  geojson = await geojson.json()

  let geoJsonElements = geojson.features.map((feature) => {
    let position = feature.geometry.coordinates
    position.reverse()
    return (
      <Marker map={this.refs.map} position={position} onClick= {this.openWindow.bind(this, feature.properties.link)} >
         <Popup>
           <span>{layer}</span>
         </Popup>
       </Marker>
    );
    this.setState({ceremonie:geoJsonElements})
  });

  if(layer == 'ceremonie'){
    this.setState({ceremonie:geoJsonElements})
  }
  if(layer == 'ontvangst'){
    this.setState({ontvangst:geoJsonElements})
  }
  if(layer == 'receptie'){
    this.setState({receptie:geoJsonElements})
  }

}

getPhotoMarkers = async () =>{
  let body = {'mapId':this.props.mapId, 'layer':'foto', 'type':'polygon'}
  let ids = await fetch('https://api.ellipsis-earth.com/v2/geometry/ids',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify(body)});
  ids = await ids.json()
  ids = ids.ids

  body = {'mapId':this.props.mapId, 'elementIds':ids, 'type':'polygon'}
  let geojson = await fetch('https://api.ellipsis-earth.com/v2/geometry/get',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify(body)});
  geojson = await geojson.json()

  let geoJsonElements = geojson.features.map( async (feature) => {
    //with feature id collect messageId
  body = {'mapId':this.props.mapId, 'type':'polygon', 'filters':{'polygonIds':[feature.properties.id]}}
  let messages = await fetch('https://api.ellipsis-earth.com/v2/geoMessage/ids',{method:'POST',  headers: {'Content-Type': 'application/json', 'Authorization': this.props.token}, body:JSON.stringify(body)});
  messages = await messages.json()
    let position = feature.geometry.coordinates
    position.reverse()
    return (
      <Marker map={this.refs.map} position={position} onClick= {this.showPhoto.bind(this, messages.messages[0].id)} >
         <Popup>
           <span>foto</span>
         </Popup>
       </Marker>
    );
  });
  let result = await Promise.all(geoJsonElements)
  this.setState({foto:result})

}

  flyToPos = async (pos) => {
    let leafletElement = this.leafletMap.current.leafletElement
    leafletElement.flyTo(pos.coords, pos.zoom, {'duration':6});
  }



checkState = () => {
  console.log('hoi')
}

  render(){
    let fullStyle = { height: '1000px', width: '1000px' };
    return(
      <div style = {fullStyle}>
      <input type='button' value = 'check state' onClick={this.checkState}/>
      <Map center={this.props.position.coords} zoom={this.props.position.zoom} style={fullStyle} ref={this.leafletMap} maxNativeZoom={21} maxZoom={21}>
      <Pane style = {{'zIndex':100}}>
        <TileLayer
          url='https://www.google.com/maps/vt?lyrs=y@189&x={x}&y={y}&z={z}'
        />
        </Pane>
        <Pane style = {{'zIndex':150}}>
          <TileLayer
          url={'https://api.ellipsis-earth.com/v2/tileService/dd3cee74-98ec-4fd6-bd7a-7fdd3bb409d1/3/rgb/{z}/{x}/{y}?token=' + this.props.token.substring(7,this.props.token.length)}
          />
          </Pane>
        <Pane style={{ zIndex: 200 }}>
          {this.state.ceremonie}
          {this.state.ontvangst}
          {this.state.receptie}
          {this.state.foto}
        </Pane>
        </Map>
      </div>
    )
  }

};
export default Tuin;
