import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(event){
      event.preventDefault();

      let email = this.refs.email.value.trim();
      let password = this.refs.password.value.trim();
      Meteor.loginWithPassword({email}, password, (err) => {
        if(err){
          this.setState({error: 'Unable to login. Check email and password'});
        }else{
          this.setState({error: ''});
        }
      });
  }

  render(){
    return (
      <div className="boxed-view" id="login-root">
        <div className="boxed-view__box">
          <h1>Short Lnk</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="dawg@realniggas.com"/>
            <input type="password" ref="password" name="password" placeholder="niggalicious"/>
            <button className="button">Get in the car bruh</button>
          </form>
          <Link to="/signup">Not on NSA's most wanted list yet?</Link>

        </div>
      </div>
    );
  }
}
