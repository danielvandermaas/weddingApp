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

    this.state = {'ceremonie':[]}

  }

  componentDidMount() {
  this.flyToPos([51.98126,5.82501])
  this.getMarkers('ceremonie')
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
    return (
      <GeoJSON
        key={feature.properties.id}
        data={feature}
        onEachFeature = {this.checkState}
      />
    );
  });


  if(layer == 'ceremonie'){
    this.setState({ceremonie:geoJsonElements})
  }

}

  flyToPos = (pos, zoom = 18) => {
    let leafletElement = this.leafletMap.current.leafletElement
    leafletElement.flyTo(pos, zoom, {'duration':6});
  }

checkState = () => {
  console.log('hoi')
//  console.log(this.state)
}

  render(){
    let fullStyle = { height: '1000px', width: '1000px' };

    return(
      <div style = {fullStyle}>
      <input type='button' value = 'check state' onClick={this.checkState}/>
      <Map center={[52.05249,5.53711]} zoom={6} style={fullStyle} ref={this.leafletMap} maxNativeZoom={21} maxZoom={21}>
      <Pane style = {{'zIndex':100}}>
        <TileLayer
          url='https://www.google.com/maps/vt?lyrs=y@189&x={x}&y={y}&z={z}'
        />
        </Pane>
        <Pane style = {{'zIndex':150}}>
          <TileLayer
          url='https://www.google.com/maps/vt?lyrs=y@189&x={x}&y={y}&z={z}'
          />
          </Pane>
        <Pane style={{ zIndex: 200 }}>
          {this.state.ceremonie}
        </Pane>
        <Pane style={{zIndex:250}}>
        <Marker map={this.refs.map} position={[52.05249,5.53711]} >
           <Popup>
             <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
           </Popup>
         </Marker>
         </Pane>
        </Map>
      </div>
    )
  }

};
export default Tuin;
