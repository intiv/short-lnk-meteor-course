/*Meteor/React imports*/
import React from 'react';
import { Meteor } from 'meteor/meteor';

/*React Components*/
import Modal from 'react-modal';

export default class AddLink extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        url: '',
        isOpen: false,
        error: ''
      }
  }

  onSubmit(evt){
    evt.preventDefault();
    const { url } = this.state;
    Meteor.call('links.insert', url, (err, res) =>{
      if(!err){
        this.handleModalClose();
      }else{
        this.setState({ error: err.reason });
      }
    });

  }

  onChange(evt) {
    this.setState({
      url: evt.target.value
    });
  }

  handleModalClose() {
    this.setState(
      {
      isOpen: false,
      url: '',
      error: ''
    });
  }

  render() {
      return (
        <div id="addlink-root">
          <button className="button" onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>
          <Modal
            isOpen={this.state.isOpen}
            contentLabel="Add Link"
            onAfterOpen={() => this.refs.url.focus()}
            onRequestClose={this.handleModalClose.bind(this)}
            className="boxed-view__box"
            overlayClassName="boxed-view boxed-view--modal">
            <h1>Add Link</h1>
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
              <input
                type="text"
                ref="url"
                placeholder="URL"
                value={this.state.url}
                onChange={this.onChange.bind(this)}
              />
              <button className="button">Add Link</button>
              <button type="button" className="button button--secondary" onClick={() => this.handleModalClose()}>Cancel</button>
            </form>
          </Modal>
        </div>
      );
  }



}
