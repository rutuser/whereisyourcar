import * as React from 'react';
import Login from '../components/Login';
import SideMenu from '../components/SideMenu';
import MapContainer from '../components/MapContainer';
import { inject, observer } from 'mobx-react';
import { LoginStore } from '../stores/LoginStore';
import { SideMenuStore } from '../stores/SideMenuStore';

export interface HomeProps {
	loginStore?: LoginStore;
	sideMenuStore?: SideMenuStore;
}

@inject('loginStore', 'sideMenuStore')
@observer
export default class Home extends React.Component<HomeProps, {}> {
	render() {
		if (this.props.loginStore.modalVisible) {
			return  <Login />;
		} else {
			return <div>
			{this.props.sideMenuStore.open && <SideMenu />}
			<MapContainer />
		</div>;
		}
	}
}