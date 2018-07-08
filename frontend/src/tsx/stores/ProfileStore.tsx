import { action, observable } from 'mobx';
import * as superagent from 'superagent';
import { USER_TOKEN } from './LoginStore';
import * as ENV from '../../../config/env';

export class ProfileStore {

	@observable profile = String;

	@action loadProfile() {
		const token = window.localStorage.getItem(USER_TOKEN);
		superagent
			.get(`${ENV.API}/user/profile`)
			.set('Authorization', `Bearer ${token}`)
			.then(response => {
				this.profile = response.name;
			})
			.catch(err => console.log('No se puede cargar el perfin', err));
	}
}
