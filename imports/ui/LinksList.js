/*Meteor/React imports*/
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

/*API/Config imports*/
import { Links } from '../api/links';

/*React components*/
import LinksListItem from './LinksListItem';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      links : []
    };
  }

  componentDidMount() {
      Meteor.subscribe('links');
      this.linksTracker = Tracker.autorun(() => {
        const links = Links.find({
          visible: Session.get('showVisible')
        }).fetch();
        this.setState({ links });
      });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderLinks(){
    if(this.state.links.length === 0){
      return (
        <div className="item">
          <p className="item__warning">No links here dawg. Go get some</p>
        </div>);
    }else{
      return this.state.links.map((link) => {
        const shortUrl = Meteor.absoluteUrl(link._id);//adds the id to the url
        return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
      });
    }
  }

  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinks()}
        </FlipMove>

      </div>
    );
  }
}
