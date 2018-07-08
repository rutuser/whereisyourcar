import { action, observable, remove } from 'mobx';
import * as superagent from 'superagent';
import { USER_TOKEN } from './LoginStore';
import * as ENV from '../../../config/env';

export class VehicleStore {
	@observable vehicles = [{id: '5b2bf4df0912330fcc56b336', identifier: 'Ford'}];
	@observable open = false;
	@action openNewVehicle() {
		this.open = !this.open;
	}

	@action loadVehicles() {
		const token = window.localStorage.getItem(USER_TOKEN);
		superagent.get(`${ENV.API}/vehicle/all`)
			.set('Authorization', `Bearer ${token}`)
			.then(response => {
				this.vehicles = response.body;
			})
			.catch(err => console.error('No se han podido obtener los vehículos', err));
	}

	@action newVehicle(identifier: string) {
		const token = window.localStorage.getItem(USER_TOKEN);
		superagent.post(`${ENV.API}/vehicle/add`)
			.set('Authorization', `Bearer ${token}`)
			.send({ identifier })
			.then(response => {
				console.log('New vehicle', response, identifier);
				this.loadVehicles();
			})
			.catch(err => console.error('No se ha podido añadir el vehículo', err));
	}

	// TODO hacer la función remove
	@action remove(identifier: string) {
	}
}