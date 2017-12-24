/*Meteor/React imports*/
import { Meteor } from 'meteor/meteor';
import React from 'react';

/*NPM packages*/
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        Copied : false
      }
  }

  componentDidMount() {
      this.clip = new Clipboard(this.refs.copy);
      this.clip.on('success', () => {
        this.setState({
          Copied: true
        });
        setTimeout(() => this.setState({ Copied: false }), 1000);
      }).on('error', function() {
        this.setState({ Copied: false });
      });
  }

  componentWillUnmount() {
      this.clip.destroy();
  }

  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;
    if(typeof this.props.lastVisited === 'number'){
      visitedMessage = `(visited ${moment(this.props.lastVisited).fromNow()})`;
    }
    return (
      <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
    );
  }

  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Visit</a>
        <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.Copied ? 'Copied' : 'Copy'}
        </button>
        <button className="button button--pill" ref="hide" onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
        }}>
          {this.props.visible ? 'Hide' : 'Show' }
        </button>
      </div>
    );
  }

}

LinksListItem.propTypes = {
  shortUrl: React.PropTypes.string.isRequired,
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  visitedCount: React.PropTypes.number.isRequired,
  lastVisited: React.PropTypes.number //null throws warning if isRequired
}
