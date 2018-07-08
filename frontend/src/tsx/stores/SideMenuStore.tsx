import { action, observable } from 'mobx';
import * as superagent from 'superagent';
import * as ENV from '../../../config/env';

export class SideMenuStore {
	@observable open = false;
	@observable userName: string;

	constructor() {
		this.userName = 'Michal';
	}

	@action setName() {
		superagent
			.get(`${ENV.API}/user/profile`)
			.set()
			.then(response => {
				this.userName = response.name;
			})
			.catch(err => console.log('No se puede cargar el perfin', err));
	}

	@action toggleDrawer() {
		this.open = !this.open;
		console.log(this.open);
	}
}