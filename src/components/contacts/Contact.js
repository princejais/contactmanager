import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Contact extends Component {
	state = {
		showContactInfo: false
	};

	onShowClick = (e) => {
		// console.log(e.target.parentElement.textContent);
		this.setState({
			showContactInfo: !this.state.showContactInfo
		});
		e.preventDefault();
	};

	// onDeleteClick = (id, dispatch) => {
	// 	axios
	// 		.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
	// 		.then((res) => dispatch({ type: 'DELETE_CONTACT', payload: id }));
	// };

	//Async and await
	onDeleteClick = async (id, dispatch) => {
		await axios
			.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
			.then((res) => dispatch({ type: 'DELETE_CONTACT', payload: id }));
	};

	render() {
		const { id, name, email, phone } = this.props.contact;
		const { showContactInfo } = this.state;
		return (
			<Consumer>
				{(value) => {
					const { dispatch } = value;
					return (
						<div className="card card-body mb-3">
							<h4 style={{ padding: '10px' }}>
								{name}
								<i
									className="fas fa-sort-down"
									onClick={this.onShowClick}
									style={{ cursor: 'pointer' }}
								/>
								<i
									className="fas fa-times"
									onClick={this.onDeleteClick.bind(this, id, dispatch)}
									style={{ float: 'right', color: 'red', cursor: 'pointer' }}
								/>

								<Link to={`contact/edit/${id}`}>
									<i
										className="fas fa-pencil-alt"
										style={{
											float: 'right',
											color: 'black',
											cursor: 'pointer',
											marginRight: '1rem'
										}}
									/>
								</Link>
							</h4>
							{showContactInfo ? (
								<ul className="list-group">
									<li className="list-group-item">Email: {email}</li>
									<li className="list-group-item">Phone: {phone}</li>
								</ul>
							) : null}
						</div>
					);
				}}
			</Consumer>
		);
	}
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired
};

export default Contact;
