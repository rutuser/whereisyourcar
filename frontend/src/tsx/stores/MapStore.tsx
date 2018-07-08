import { action, observable } from 'mobx';
import * as superagent from 'superagent';
import { USER_TOKEN, USER_ID } from './LoginStore';
import * as ENV from '../../../config/env';
import { VehicleStore } from './VehicleStore';
import { inject } from 'mobx-react';


export class MapStore {
	@observable lat: number;
	@observable lng: number;
	@observable zoom: number;

	@observable markers: {
		lat: number,
		lng: number,
		id: string
	};

	@observable parkMarkers: [{
		lat: number,
		lng: number,
		id: string
	}];

	constructor() {
		this.zoom = 8;
		this.markers = {
			lat: 0,
			lng: 0,
			id: '0'
		};
		this.parkMarkers = [{
			lat: -130, // Latitud inexistente para que no cargue por defecto
			lng: 0,
			id: '0'
		}];
	}

	addCurrentMarker(lat, lng, id) {
		if (this.markers !== undefined) {
			this.markers = { lat, lng, id };
		}
	}

	addParkMarkers(lat, lng, id) {
		if (this.parkMarkers !== undefined) {
			this.parkMarkers.push({ lat, lng, id });
		}
	}

	@action geolocation() {
		navigator.geolocation.getCurrentPosition(position => {
			this.lat = position.coords.latitude;
			this.lng = position.coords.longitude;
			this.zoom = 14;
			this.addCurrentMarker(this.lat, this.lng, '0'); // FIXME arreglar id
			console.log(window.localStorage.getItem(USER_ID));
		});
	}

	@action parked(id) {
		superagent
			.post(`${ENV.API}/record/add`)
			.send({ lat: this.lat, lng: this.lng, id_user: window.localStorage.getItem(USER_ID), id})
			.then(alert('Ubicación guardada'))
			.catch(err => alert('No se ha podido determinar la ubicación ' + err));
	}


	@action setOffLocation() {
		superagent
			.post(`${ENV.API}/vehicle/offpark`)
			.send()
			.then(response => response) // FIXME
			.catch(err => alert('no se ha podido desacivar la localizacion' + err));
	}

	@action parkRemainder() {
		superagent
			.get(`${ENV.API}/vehicle/mypark`)
			.set()
			.then(response => {
				this.lat = response.body.lat;
				this.lng = response.body.lng;
			})
			.catch(err => alert('no se ha podido recordar su ubicación' + err));
		this.addCurrentMarker(this.lat, this.lng, '0');
	}

	@action parkSuggestion() {
		superagent
			.get(`${ENV.API}/vehicle/mysuggestions`)
			.set()
			.then(response => {
				response.map(coords => this.addParkMarkers(coords.lat, coords.lng, '0')); // FIXME areglar id
			})
			.catch(err => alert('no se han podido cargar las ubicaciones' + err));
	}
}