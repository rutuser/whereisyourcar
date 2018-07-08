import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { VehicleStore } from '../stores/VehicleStore';

export interface NewVehicleProps {
	vehicleStore?: VehicleStore;
}

export interface NewVehicleState {
	identifier?: string;
}

@inject('vehicleStore')
@observer
export default class NewVehicle extends React.Component<NewVehicleProps, NewVehicleState> {
	constructor(props) {
		super(props);

		this.state = {
			identifier: ''
		};

		this.onChangeInput = this.onChangeInput.bind(this);
	}

	onChangeInput(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	addNewVehicle(event) {
		event.preventDefault();
		this.props.vehicleStore.newVehicle(this.state.identifier);
		this.props.vehicleStore.openNewVehicle();
	}

	render() {
		return (
			<div>
				<div>
					<h3>Añadir nuevo vehículo</h3>
					<form>
						<p>
							<label>Nombre vehículo: </label>
							<input name='identifier' value={this.state.identifier} onChange={this.onChangeInput} />
						</p>
						<button type='submit' onClick={this.addNewVehicle}>Enviar</button>
					</form>
				</div>
			</div>
		);
	}
}