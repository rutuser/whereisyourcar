import { LoginStore } from './LoginStore';
import { SideMenuStore } from './SideMenuStore';
import { VehicleStore } from './VehicleStore';
import { ProfileStore } from './ProfileStore';
import { MapStore } from './MapStore';

const stores = {
	loginStore: new LoginStore(),
	sideMenuStore: new SideMenuStore(),
	vehicleStore: new VehicleStore(),
	profileStore: new ProfileStore(),
	mapStore: new MapStore()
};

export default stores;