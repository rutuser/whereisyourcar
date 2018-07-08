import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import * as SideMenuStyle from '../../css/Sidemenu.css';
import * as FontAwesome from 'react-icons/lib/fa';
import { SideMenuStore } from '../stores/SideMenuStore';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

export interface SideMenuProps {
	sideMenuStore?: SideMenuStore;
	classes?: any;
}

@inject('sideMenuStore')
@observer
export default class SideMenu extends React.Component<SideMenuProps, {}> {
	constructor(props: SideMenuProps) {
		super(props);
		this.toggleDrawer = this.toggleDrawer.bind(this);
	}

	toggleDrawer() {
		this.props.sideMenuStore.toggleDrawer();
	}

	componentDidMount() {
		this.props.sideMenuStore.setName.bind(this);
	}

	render() {
		return (
			<div>
				<SwipeableDrawer open={this.props.sideMenuStore.open} onClose={this.toggleDrawer} onOpen={this.toggleDrawer}>
					<div className={SideMenuStyle.drawer} tabIndex={0} role='button' onClick={this.toggleDrawer} onKeyDown={this.toggleDrawer}>
						<div className={SideMenuStyle.userIcon}><FontAwesome.FaUser size={20} />{this.props.sideMenuStore.userName}</div>
						<Divider />
						<Link to='/'>
							<Button variant='contained' className={SideMenuStyle.button}>
								<FontAwesome.FaHome size={25} /> Home
							</Button>
						</Link>
						<Divider />
						<div className={SideMenuStyle.list}>
							<Link to='/Profile'><Button className={SideMenuStyle.button}>Perfil</Button></Link>
							<br />
							<Link to='/vehicles'><Button className={SideMenuStyle.button}>Vehículos</Button></Link>
						</div>
						<Divider />
						<div className={SideMenuStyle.info}>
							<Button className={SideMenuStyle.infoButton}>
								<a target='_blank' href='https://twitter.com/car_where'><FontAwesome.FaTwitter size={15} /></a>
							</Button>
							<Link to='/info'>
								<Button className={SideMenuStyle.infoButton} type='button'><FontAwesome.FaQuestion size={15} /></Button>
							</Link>
						</div>
					</div>
				</SwipeableDrawer>
			</div >
		);
	}
}

