import React, { Component } from 'react';

class UncontrolledComponents extends Component {
    constructor(props) {
        super(props);

        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
    }

    static defaultProps = {
        name: 'Prince Jaiswal',
        email: 'prince@gmail.com',
        phone: '555-666-7777'
    }

    onChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmitHandler = (e) => {
        const contact = {
            name: this.nameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value
        }
        e.preventDefault();
        console.log(contact);
    };
  render() {
    const { name, email, phone } = this.props;
    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
            <form onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
                        placeholder="Enter name.."
                        defaultValue={name}
                        ref={this.nameInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Email</label>
                    <input 
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Enter email.."
                        defaultValue={email}
                        ref={this.emailInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Phone</label>
                    <input 
                        type="text"
                        name="phone"
                        className="form-control form-control-lg"
                        placeholder="Enter Phone.."
                        defaultValue={phone}
                        ref={this.phoneInput}
                    />
                </div>
                <input type="submit" className="btn btn-info btn-block btn-lg" value="Add Contact"/>
            </form>
        </div>
      </div>
    )
  }
}

export default UncontrolledComponents;
