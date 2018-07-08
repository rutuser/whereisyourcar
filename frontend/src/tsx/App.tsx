import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './containers/Header';
import Home from './pages/Home';
import Vehicle from './pages/Vehicles';
import stores from './stores';
import { Provider } from 'mobx-react';
import Profile from './pages/Profile';
import Info from './pages/Info';

export default class App extends React.Component {
	render() {
		return <Provider {...stores}>
			<Router>
				<div>
					<Header />
					<Route exact path='/' component={Home} />
					<Route path='/vehicles' component={Vehicle} />
					<Route path='/profile' component={Profile} />
					<Route path='/info' component={Info} />
				</div>
			</Router>
		</Provider>;
	}
}