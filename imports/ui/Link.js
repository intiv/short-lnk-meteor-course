/*Meteor/React imports*/
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Accounts } from 'meteor/accounts-base';

/*React components*/
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import Filters from './Filters';

/*Mongo collections*/
import { Links } from '../api/links';

export default () => {
  return (
    <div id="link-root">
      <PrivateHeader title="Your Links"/>
      <div className="page-content">
        <Filters/>
        <AddLink/>
        <LinksList/>
      </div>

    </div>
  );
}
