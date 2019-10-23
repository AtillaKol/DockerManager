
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


class Header extends Component {

	/**
	The render-method of the class Header.
	@return -> It returns some HTML.
	*/
	render(){
		return(
			<div className="headerSection">
				<Link className="routingLink" to="/">All containers</Link>
				<Link className="routingLink" to="/runningContainers">Running Containers</Link>
				<Link className="routingLink" to="/configuration">Configuration</Link>
				<Link className="routingLink" to="/about">About</Link>
			</div>
		);
	}
}


export default Header;