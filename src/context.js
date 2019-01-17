import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'DELETE_CONTACT':
			return {
				...state,
				contacts: state.contacts.filter((contact) => contact.id !== action.payload)
			};
		case 'ADD_CONTACT':
			return {
				...state,
				contacts: [ action.payload, ...state.contacts ]
			};
		case 'UPDATE_CONTACT':
			return {
				...state,
				contacts: state.contacts.map(
					(contact) => (contact.id === action.payload.id ? (contact = action.payload) : contact)
				)
			};
		default:
			return state;
	}
};

export class Provider extends Component {
	state = {
		contacts: [
			// {
			// 	id: 1,
			// 	name: 'Prince',
			// 	email: 'prince@gmail.com',
			// 	phone: '555-555-5555'
			// },
			// {
			// 	id: 2,
			// 	name: 'Jane',
			// 	email: 'jane@gmail.com',
			// 	phone: '555-555-5555'
			// },
			// {
			// 	id: 3,
			// 	name: 'John',
			// 	email: 'john@gmail.com',
			// 	phone: '555-555-5555'
			// }
		],
		dispatch: (action) => this.setState((state) => reducer(state, action))
	};

	//Normal http calls
	// componentDidMount() {
	// 	axios.get('https://jsonplaceholder.typicode.com/users').then((res) =>
	// 		this.setState({
	// 			contacts: res.data
	// 		})
	// 	);
	// }

	//Http using async and await
	async componentDidMount() {
		const res = await axios.get('https://jsonplaceholder.typicode.com/users');

		this.setState({ contacts: res.data });
	}

	render() {
		return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
	}
}

export const Consumer = Context.Consumer;
