
import React, { Component } from 'react';
import './Response.css';

class Response extends Component {

	responseFromAPI(){
		
	}

	/**
	The render-method of the class Response.
	@return -> It returns some HTML. The className of the div and the text depends on if the user inputed right values.
	*/
	render(){
		return(
			<div className={this.props.data.responseTitle}>
				{this.props.data.responseText}
			</div>
		)
	}
}

export default Response;