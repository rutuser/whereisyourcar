import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React = require('react');
import * as ENV from '../../../config/env';
import { MapStore } from '../stores/MapStore';
import { observer, inject } from 'mobx-react';

export interface MapContainerProps {
	google: any;
	mapStore?: MapStore;
}


const style = {
	width: '98.99vw',
	height: '91.4vh',
};

@inject('mapStore')
@observer
class MapContainer extends React.Component<MapContainerProps, {}> {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.mapStore.geolocation();
	}

	render() {
		return (
			<Map google={this.props.google}
				style={style}
				center={{
					lat: this.props.mapStore.lat,
					lng: this.props.mapStore.lng
				}}
				zoom={this.props.mapStore.zoom}
			>

				<Marker key={this.props.mapStore.markers.id}	position={{ lat: this.props.mapStore.markers.lat, lng: this.props.mapStore.markers.lng }} />


				{this.props.mapStore.parkMarkers.map(marker => <Marker key={marker.id}
					position={{ lat: marker.lat, lng: marker.lng }} />)}

			</Map>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: ENV.APIKEY
})(MapContainer);