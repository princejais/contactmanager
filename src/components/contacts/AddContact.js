import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';
import TextInputGroup from '../layout/TextInputGroup';
import uuid from 'uuid';

class AddContact extends Component {
	state = {
		name: '',
		email: '',
		phone: '',
		errors: {}
	};

	onChangeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmitHandler = async (dispatch, e) => {
		e.preventDefault();
		const { name, email, phone } = this.state;

		if (name === '') {
			this.setState({ errors: { name: 'Name is Required' } });
			return;
		}

		if (email === '') {
			this.setState({ errors: { email: 'Email is Required' } });
			return;
		}

		if (phone === '') {
			this.setState({ errors: { phone: 'Phone is Required' } });
			return;
		}

		const newContact = {
			id: uuid(),
			name,
			email,
			phone
		};

		const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
		dispatch({ type: 'ADD_CONTACT', payload: res.data });

		//Clear Input Values
		this.setState({
			name: '',
			email: '',
			phone: '',
			errors: {}
		});

		//Redirect to home page
		this.props.history.push('/');
	};
	render() {
		const { name, email, phone, errors } = this.state;

		return (
			<Consumer>
				{(value) => {
					const { dispatch } = value;
					return (
						<div className="card mb-3">
							<div className="card-header">Add Contact</div>
							<div className="card-body">
								<form onSubmit={this.onSubmitHandler.bind(this, dispatch)}>
									<TextInputGroup
										label="Name"
										name="name"
										placeholder="Enter Name.."
										value={name}
										onChange={this.onChangeHandler}
										error={errors.name}
									/>
									<TextInputGroup
										label="Email"
										name="email"
										placeholder="Enter Email.."
										value={email}
										onChange={this.onChangeHandler}
										error={errors.email}
									/>
									<TextInputGroup
										label="Phone"
										name="phone"
										placeholder="Enter Phone.."
										value={phone}
										onChange={this.onChangeHandler}
										error={errors.phone}
									/>

									<input
										type="submit"
										className="btn btn-info btn-block btn-lg"
										value="Add Contact"
									/>
								</form>
							</div>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

export default AddContact;
