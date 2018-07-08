import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { SideMenuStore } from '../stores/SideMenuStore';
import { ProfileStore } from '../stores/ProfileStore';
import SideMenu from '../components/SideMenu';

import * as ProfileStyle from '../../css/Profile.css';

export interface ProfileProps {
	profileStore?: ProfileStore;
	sideMenuStore?: SideMenuStore;
}

@inject('profileStore', 'sideMenuStore')
@observer
export default class Profile extends React.Component<ProfileProps, {}> {

	constructor(props: ProfileProps) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.sideMenuStore.open && <SideMenu />}
				<div className={ProfileStyle.container}>
					<h1>Tu Perfil</h1>
						<h4>Nombre: {this.props.sideMenuStore.userName}</h4>
				</div>
			</div>
		);
	}
}