import React from 'react';

const PrivateHeader = (props) => {
  return (
    <div className="header" id="privateheader-root">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button--logout" onClick={() => Accounts.logout()}>Logout</button>
      </div>
    </div>
  );
}

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default PrivateHeader;
