import React, {Component} from 'react';
import {
  Map,
  TileLayer,
  Pane,
  Marker,
  Popup,
} from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  // shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const WEDDING_POSITION = {
  coords: [51.98126, 5.82501], 
  zoom: 18
}

class Tuin extends Component {

  leafletMap = null
  ontvangstPopup = null

  constructor(props) {
    super(props);

    this.leafletMap = React.createRef();
    this.ontvangstPopup = React.createRef();

    this.state = {
      ceremonie: [], 
      ontvangst: [], 
      receptie: [], 
      photoMarkers: [],
      timestamp: 3
    }
  }

  componentDidMount() {
    if (this.props.firstTime) {
      this.flyToPos(WEDDING_POSITION);

      this.openPopupTimeout = setTimeout(() => {
        let leafletMap = this.leafletMap.current.leafletElement;
        let ontvangstPopup = this.ontvangstPopup.current.leafletElement;

        ontvangstPopup
          .setLatLng(this.state.ontvangstPopup.position)
          .setContent(this.state.ontvangstPopup.content)
          .openOn(leafletMap);

      }, 5500)
    }

    this.getMarkers('ceremonie')
    this.getMarkers('ontvangst')
    this.getMarkers('receptie')
    this.getPhotoMarkers();

    let leafletElement = this.leafletMap.current.leafletElement;
    
    leafletElement.attributionControl.setPrefix(false);
  }

  componentWillUnmount = () => {
    if (this.openPopupTimeout) {
      clearTimeout(this.openPopupTimeout);
    }
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
    geojson = await geojson.json();

    let layerCounters = {};

    let geoJsonElements = geojson.features.map((feature) => {
      let position = feature.geometry.coordinates
      position.reverse();

      if (!layerCounters[layer]) {
        layerCounters[layer] = 1;
      }

      let counter = layerCounters[layer];
      layerCounters[layer] = layerCounters[layer] + 1;

      let title = `Meeting link: ${layer} locatie ${counter}`;
      let ref = null;
      if (layer === 'ontvangst') {
        title = `Meeting link: ${layer}`;
        ref = this.ontvangstPopup;

        this.setState({ ontvangstPopup: {
          position: position,
          content: `
            <div>${title}</div>
            <a href=https://${feature.properties.link} target='_blank'>
              https://${feature.properties.link}
            </a>
          `
        }})
      }

      return (
        <Marker 
          map={this.refs.map} 
          position={position}
        >
          <Popup ref={ref}>
            <div>{title}</div>
            <a href={`https://${feature.properties.link}`} target='_blank'>
              {`https://${feature.properties.link}`}
            </a>
          </Popup>
        </Marker>
      );
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
      messages = await messages.json();
      let position = feature.geometry.coordinates
      position.reverse()

      return (
        <Marker 
          map={this.refs.map} 
          position={position}
        >
          <Popup>
            <a href='#' onClick={this.showPhoto.bind(this, messages.messages[0].id)}>Foto van locatie</a>
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

  updateTimestamp = (e)=>{
    this.setState({timestamp:e.target.value})
  }


  render() {
    let zoom = this.props.firstTime ? 6 : 18;
    let center = [51.98126, 5.82501];    

    let fullStyle = { height: '100%', width: '100%' };
    return (
      <div className='wedding-content'>
        <Map 
          center={center} 
          zoom={zoom} 
          style={fullStyle} ref={this.leafletMap} 
        >
          <Pane style = {{'zIndex':100}}>
          <TileLayer
            url='https://www.google.com/maps/vt?lyrs=y@189&x={x}&y={y}&z={z}' maxNativeZoom={21} maxZoom={21}
          />
          </Pane>
          <Pane style = {{'zIndex':150}}>
            <TileLayer maxNativeZoom={19} maxZoom={21}
            url={'https://api.ellipsis-earth.com/v2/tileService/dd3cee74-98ec-4fd6-bd7a-7fdd3bb409d1/' + this.state.timestamp + '/rgb/{z}/{x}/{y}?token=' + this.props.token.substring(7,this.props.token.length)}
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
