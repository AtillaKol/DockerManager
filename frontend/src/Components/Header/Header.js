
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


class Header extends Component {

	render(){
		return(
			<div className="headerSection">
				<Link className="routingLink" to="/">All containers</Link>
				<Link className="routingLink" to="/runningContainers">Running Containers</Link>
				<Link className="routingLink" to="/about">About</Link>
			</div>
		);
	}
}


export default Header;