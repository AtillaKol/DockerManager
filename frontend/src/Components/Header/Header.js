
import React, { Component } from 'react';
import {  BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Header.css';


class Header extends Component {

	render(){
		return(
			<div className="headerSection">
				<Link className="routingLink" to="#">All containers</Link>
				<Link className="routingLink" to="#">About</Link>
			</div>
		);
	}
}


export default Header;