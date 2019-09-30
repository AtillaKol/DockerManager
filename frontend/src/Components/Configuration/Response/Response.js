
import React, { Component } from 'react';
import './Response.css';

class Response extends Component {
	render(){
		return(
			<div className="test">
				{this.props.data.port}
			</div>
		)
	}
}

export default Response;