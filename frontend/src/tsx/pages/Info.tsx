import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { SideMenuStore } from '../stores/SideMenuStore';
import SideMenu from '../components/SideMenu';

import * as InfoStyle from '../../css/Info.css';

export interface InfoProps {
	sideMenuStore?: SideMenuStore;
}

@inject('sideMenuStore')
@observer
export default class Info extends React.Component<InfoProps, {}> {

	constructor(props: InfoProps) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.sideMenuStore.open && <SideMenu />}
				<div className={InfoStyle.container}>
					<h4>Aquí va la información util para el correcto uso de esta página</h4>
				</div>
			</div>
		);
	}
}