
import React, { Component } from 'react';
import './Response.css';

class Response extends Component {
	render(){
		return(
			<div className="test">
				{this.props.data.responseText}
			</div>
		)
	}
}

export default Response;