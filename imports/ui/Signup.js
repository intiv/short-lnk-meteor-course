import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';


export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    if(password.length < 3){
      return this.setState({error: 'Password must be at least 3 chars long'});
    }
    Accounts.createUser({email, password}, (err) => {
      if(err){
        this.setState({error: err.reason});
      }else{
        this.setState({error: ''});
      }
    });

    // this.setState({
    //   error: 'you aint a real nigga, get outta here'
    // });
  }

  render() {
    return (
      <div className="boxed-view" id="signup-root">
        <div className="boxed-view__box">
          <h1>Welcome to fight club</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="dawg@realniggas.com"/>
            <input type="password" ref="password" name="password" placeholder="niggalicious"/>
            <button>Join up nigguh</button>
          </form>
          <Link to="/">Already on NSA's most wanted list?</Link>
        </div>
      </div>
    );
  }
}
