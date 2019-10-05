
import React, { Component } from 'react';

import './DetailView.css'

class DetailView extends Component {

	constructor(props) {
		super();
		this.state = {
			"containerId": "",
			"error": false
		}
	}

	componentDidMount() {
		if(this.props.location.data !== undefined) {
			this.setState({
				"containerId": this.props.location.data.containerId
			});
		} else {
			this.setState({
				"error": true
			});
		}
	}

	render() {
		return(
			<div className="container">
				<div className="siteTitles">
					<h1>DetailView</h1>
				</div>
				<p className="mainParagraph">
					Here you can get a detail view of the container you choose.
				</p>
				{this.state.error ? 
					<div className="errorMessage">
						No ID was choosen
					</div>
				: <div>
					{this.state.containerId}
				</div>}
			</div>
		);
	}
}

export default DetailView;