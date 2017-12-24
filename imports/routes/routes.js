/*Meteor/React imports*/
import { Meteor } from 'meteor/meteor';
import React from 'react';

/*Router/Accounts imports */
import { Router, Route, browserHistory } from 'react-router';

/*React Components*/
import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

/*Consts*/
const unauthedPages = ['/', '/signup'];
const authedPages = ['/links'];
const onEnterPublicPage = () => {
  if(Meteor.userId()){
    browserHistory.replace('/links');
  }
};

const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const path = browserHistory.getCurrentLocation().pathname;
  const isUnauthedPage = unauthedPages.includes(path);
  const isAuthedPage = authedPages.includes(path);

  //Redirection based on where the user is and if said user is authenticated
  if(isUnauthedPage && isAuthenticated){
    browserHistory.replace('/links');
  }else if(isAuthedPage && !isAuthenticated){
    browserHistory.replace('/');
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="/*" component={NotFound} onEnter={onEnterPrivatePage}/>
  </Router>
);//path="*" catches all paths not defined in other Route components


Tracker.autorun(() =>{
  //Info needed to check redirection cases
  const isAuthenticated = !!Meteor.userId();
  const path = browserHistory.getCurrentLocation().pathname;
  const isUnauthedPage = unauthedPages.includes(path);
  const isAuthedPage = authedPages.includes(path);

  //Redirection based on where the user is and if said user is authenticated
  if(isUnauthedPage && isAuthenticated){
    browserHistory.replace('/links');
  }else if(isAuthedPage && !isAuthenticated){
    browserHistory.replace('/');
  }
  console.log('Authed?',isAuthenticated);
});
